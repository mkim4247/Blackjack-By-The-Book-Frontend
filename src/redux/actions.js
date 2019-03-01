/* USER RELATED ACTIONS*/
export const setUser = user => {
  return { type: "SET_USER", user }
}

export const settingUser = user => {
  return dispatch => {
    fetch('http://localhost:4247/api/v1/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Incorrect username and/or password')
      }
      else{
        console.log('Login Successful')
        dispatch(setUser(data.user_info))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

export const creatingNewUser = user => {
  return dispatch => {
    fetch(`http://localhost:4247/api/v1/users`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert(data.error)
      }
      else {
        console.log('New User Created')
        dispatch(setUser(data.user))
        localStorage.setItem('token', data.token)
      }
    })
  }
}

export const checkingToken = token => {
    return dispatch => {
    fetch(`http://localhost:4247/api/v1/profile`, {
    method: "GET",
    headers: {
      "Authentication": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(`Welcome Back, ${data.user.username}`)
      dispatch(setUser(data.user))
    })
  }
}

/* FETCHING API AND ASSIGNING DECK ACTIONS */
const fetchedDeck = deckId => {
  return { type: "SET_DECK", deckId }
}

/* DEFAULT FOR GAME IS 6 DECKS */
export const fetchingDeck = () => {
  return dispatch => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(res => res.json())
    .then(deck => {
      console.log(`Deck ID: ${deck.deck_id}`)
      dispatch(fetchedDeck(deck.deck_id))
    })
  }
}

/* DEALING RELATED ACTIONS */
const dealDealerCards = cards => {
  return { type: "DEAL_DEALER_CARDS", cards }
}

/* PASSING BET HERE TO ASSIGN TO HAND IN REDUCER */
const dealPlayerCards = (cards, bet) => {
  return { type: "DEAL_PLAYER_CARDS", cards, bet }
}

export const dealingCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
    .then(res => res.json())
    .then(deck => {
      /* AUTO SHUFFLE DECK IF ~HALFWAY THROUGH BEFORE DEALING CARDS*/
      if(deck.remaining < 150){
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(res => res.json())
        .then(deck => {
          console.log('Deck shuffled')
          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
          .then(res => res.json())
          .then(deck => {
            dispatch(dealingActions(deck))
          })
        })
      }
      else {
        /* SAME AS ABOVE BUT API DECK NOT SHUFFLED BEFORE DEALING */
        dispatch(dealingActions(deck))
      }
    })
  }
}

const dealingActions = deck => {
  return (dispatch, getStore) => {
    let bet = getStore().bet

    /* SPLIT UP FETCHED CARDS BTWN PLAYER AND DEALER */
    let cards = [deck.cards[0], deck.cards[1]]
    let dealerCards = [deck.cards[2], deck.cards[3]]
    dispatch(dealDealerCards(dealerCards))
    dispatch(dealPlayerCards(cards, bet))

    /* ADD TO NUMBER OF GAMES PLAYED STREAK STAT */
    dispatch(addToStreak())

    /* ADD PLAYER'S AND DEALER'S FACEUP CARDS TO CURRENT COUNT, BUT NOT DEALER'S FACEDOWN */
    dispatch(countingCards(deck.cards.slice(0, 3)))

    /* CHECK DEALER AND PLAYER FOR BLACKJACK */
    dispatch(checkPlayerBlackJack())
    dispatch(checkDealerFaceDown())
    dispatch(checkDealerFaceUp())
  }
}

export const addToStreak = () => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let newStreak = user.current_streak + 1

    /* COMPARE CURRENT STREAK WITH LONGEST, UPDATE USER RECORD AS FIT */
    if(newStreak > user.longest_streak){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          current_streak: newStreak,
          longest_streak: newStreak })
      })
      .then(res => res.json())
      .then(user => {
        dispatch(setUser(user))
      })
    }
    else if(newStreak <= user.longest_streak){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          current_streak: newStreak
        })
      })
      .then(res => res.json())
      .then(user => {
        dispatch(setUser(user))
      })
    }
  }
}

/* HITTING RELATED ACTIONS */
/* PASS INDEX THROUGH SO KNOW WHICH HAND IS HIT */
const hitPlayerCards = (cards, index) => {
  return { type: "HIT_PLAYER_CARDS", cards, index }
}

export const hittingPlayerCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(deck => {
      console.log('Player hits...')
      /* COPY CURRENT HAND AND ADD NEW CARD TO IT */
      let index = getStore().currentHandIndex
      let cards = getStore().playerHand[index].cards.slice()
      cards.push(deck.cards[0])
      /* PASS ENTIRE NEW HAND THROUGH */
      dispatch(hitPlayerCards(cards, index))
      /* CHECK IF PLAYER BUSTED */
      dispatch(checkPlayerBust())
      /* ADD CARD TO CURRENT COUNT */
      dispatch(countingCards(deck.cards))
    })
  }
}

const hitDealerCards = cards => {
  return { type: "HIT_DEALER_CARDS", cards }
}

export const hittingDealerCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId
    let dealerScore = getStore().dealerHand.score
    let playerScore = getStore().playerHand[0].score
    /* DEALER HITS OF LOSING TO PLAYER AND AT LESS THAN 17 */
    // if(dealerScore <= playerScore && dealerScore < 17){
    
    /* DEALER HITS IF LESS THAN 17 */
    if(dealerScore < 17){
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(deck => {
        console.log("Dealer Hits")
        /* COPY CURRENT HAND AND ADD NEW CARD TO IT */
        let cards = getStore().dealerHand.cards.slice()
        cards.push(deck.cards[0])
        /* PASS ENTIRE NEW HAND THROUGH */
        dispatch(hitDealerCards(cards))
        /* ADD CARD TO CURRENT COUNT */
        dispatch(countingCards(deck.cards))
      })
    }
  }
}

const checkPlayerBust = () => {
  return (dispatch, getStore) => {
    /* CHECK IF PLAYER OVER 21 */
    let index = getStore().currentHandIndex
    let playerScore = getStore().playerHand[index].score

    if(playerScore > 21){
      dispatch({ type: "BUST" })


      dispatch({ type: "PLAYER_BUST", result: "Bust" })



      dispatch(resetBet())
    }
  }
}

//
// WORKING OUT CHECKING BJ ON BOTH HANDS AFTER A SPLIT RIGHT AWAY AND RESOLVING
//



/* CHECK PLAYER FOR BLACKJACK; WIN UNLESS DEALER ALSO HAS BLACKJACK */
const checkPlayerBlackJack = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand[index].cards
    let playerScore = getStore().playerHand[index].score

    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score

    /* CHECK IF PLAYER HAS BLACKJACK AND IF DEALER HAS BLACKJACK */
    if(playerHand.find( card => card.value === "ACE" ) && playerScore === 21){
      if(dealerHand.find( card => card.value === "ACE" ) && dealerScore === 21){
        /* TIE IF BOTH HAVE BLACKJACK */
        dispatch(showDealer())
        dispatch(playerPush())
      } else {
        /* PLAYER WINS IF DEALER DOESN'T HAVE BLACKJACK */
        dispatch(winningBlackJack())
        dispatch(showDealer())
      }
    }
  }
}

/* HANDLES PLAYER WINNING WITH BLACKJACK */
const winningBlackJack = () => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let index = getStore().currentHandIndex
    let bet = getStore().playerHand[index].bet
    let winnings = bet * 1.5

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + winnings })
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
      dispatch(resetBet())
      dispatch({ type: "BLACKJACK" })
    })
  }
}

const checkDealerFaceDown = () => {
  return (dispatch, getStore) => {
    /* AUTO ENDS IF DEALER HAS BLACKJACK */
    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score
    let playerHand = getStore().playerHand[0].cards
    /* TIE IF BOTH DEALER AND PLAYER HAVE BLACKJACK */
    if(dealerHand[1].value === "ACE" && dealerScore === 21){
      if(playerHand.find( card => card.value === "ACE" ) && playerHand.score === 21){
        dispatch(playerPush())
      }
      else {
        /* DEALER WINS IF PLAYER DOESN'T HAVE BLACKJACK */
        dispatch(showDealer())
        dispatch({ type: "DEALER_WINS" })
      }
    }
  }
}

const checkDealerFaceUp = () => {
  return (dispatch, getStore) => {
    let dealerHand = getStore().dealerHand.cards
    /* OFFER INSURANCE IF DEALER SHOWING ACE */
    if(dealerHand[0].value === "ACE"){
      dispatch(askForInsurance())
    }
  }
}
/* TURNS ON INSURANCE BUTTON */
export const askForInsurance = () => {
  return { type: "ASK_PLAYER" }
}

/* PLAYER OPTIONS FOR INSURANCE */
/* INSURANCE COSTS 50% of INITIAL BET */
export const takeInsurance = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand[index]
    let insurance = (playerHand.bet/2)
    let user = getStore().user

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot - insurance })
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
      dispatch({ type: "TAKE_INSURANCE" })
      dispatch(resolveDealerAce())
    })
  }
}

export const passInsurance = () => {
  return dispatch => {
    dispatch({ type: "PASS_INSURANCE" })
    dispatch(resolveDealerAce())
  }
}

export const resolveDealerAce = () => {
  return (dispatch, getStore) => {
    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score
    let insurance = getStore().insurance

    /* CHECK IF DEALER DOES HAVE BLACKJACK, RESOLVE WITH INSURANCE */
    if(dealerHand[0].value === "ACE" && dealerScore === 21){
      if(insurance === 'take'){
        dispatch(insuranceWon())
        dispatch(showDealer())
        dispatch({ type: "DEALER_WINS" })
      }
      else {
        dispatch({ type: "INSURANCE_LOST" })
        dispatch(showDealer())
        dispatch({ type: "DEALER_WINS" })
      }
    }
    else {
      dispatch({ type: "INSURANCE_LOST" })
    }
  }
}

const insuranceWon = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand[index]
    let winnings = playerHand.bet
    let user = getStore().user

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + winnings })
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
      dispatch({ type: "INSURANCE_WON" })
    })
  }
}

/* SURRENDER RELATED ACTIONS */
/* GIVES PLAYER BACK 50% OF INITIAL BET */
export const surrenderingPlayer = () => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand[index]
    let amount = (playerHand.bet/2)

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + amount })
    })
    .then( res => res.json() )
    .then( user => {
      dispatch(setUser(user))
      dispatch(surrenderedPlayer())
      dispatch(resetBet())
    })
  }
}

export const surrenderedPlayer = () => {
  return { type: "SURRENDER" }
}

/* ACTION FOR STAYING/ENDING TURN */
export const playerStay = () => {
  return (dispatch, getStore) => {
    let hand = getStore().playerHand
    let index = getStore().currentHandIndex
    /* CHECK HAND ARRAY; IF NOTHING AT NEXT INDEX, THEN DEALER's TURN, O/W PLAY NEXT HAND */
    if(index < hand.length - 1){
      dispatch({ type: "STAY" })
    }
    else {
      dispatch(showDealer())
      dispatch(dealerMove())
    }
  }
}

/* REVEALS DEALER'S FACEDOWN AND SCORE */
const showDealer = () => {
  return (dispatch, getStore) => {
    let dealerHand = getStore().dealerHand.cards
    /* ADD FACEDOWN CARD TO CURRENT COUNT */
    let uncountedCard = [dealerHand[1]]
    dispatch(countingCards(uncountedCard))
    dispatch({ type: "DEALER_MOVE" })
  }
}

/* HANDLE DEALER DECISION TREE; HIT OR STAY, COMPARE TO EACH OF PLAYER'S HANDS */
export const dealerMove = () => {
  return (dispatch, getStore) => {
    let dealerScore = getStore().dealerHand.score
    let playerHand = getStore().playerHand

    /* DEALER HITS IF LOSING TO PLAYER AND AT LESS THAN 17 */
    // if(playerHand.find( hand => hand.score >= dealerScore && hand.score <= 21) && dealerScore < 17){

    /* DEALER HITS IF LESS THAN 17 */
    if(dealerScore < 17){
      setTimeout( () => {
        dispatch(hittingDealerCards())
        dispatch(dealerMove())
      }, 1000)
    }
    else {
      /* COMPARE EACH OF PLAYER'S HANDS TO DEALER AND DETERMINE OUTCOME */
      playerHand.forEach( hand => {
        if(hand.score === dealerScore){
          dispatch(playerPush())
        }
        else if(dealerScore > 21){
          dispatch(playerWins(hand))
        }
        else if(hand.score > 21){
          dispatch({ type: "DEALER_WINS" })
          dispatch(resetBet())
        }
        else if(hand.score > dealerScore && hand.score <= 21){
          dispatch(playerWins(hand))
        }
        else if(hand.score < dealerScore){
          dispatch({ type: "DEALER_WINS" })
          dispatch(resetBet())
        }
      })
    }
  }
}

/* DOUBLE DOWN RELATED ACTIONS */
export const doublingPlayer = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(deck => {
      console.log('Player hits...')

      /* SIMILAR TO HIT ACTION; COPY CURRENT HAND AND ADD NEW CARD, THEN PASS NEW HAND THROUGH */
      let index = getStore().currentHandIndex
      let playerHand = getStore().playerHand[index]
      let cards = playerHand.cards.slice()
      cards.push(deck.cards[0])

      /* GET CURRENT BET AND DOUBLE IT */
      let currentBet = playerHand.bet
      let bet = (currentBet * 2)

      /* SUBTRACT DOUBLE DOWN BET FROM POT, PASS THROUGH NEW DOUBLED BET THROUGH TO REDUCER TO ASSIGN TO HAND */
      dispatch(placingBet(currentBet))
      dispatch(doublePlayer(cards, index, bet))
      /* CHECK FOR BUST AND ADD TO COUNT */
      dispatch(checkPlayerBust())
      dispatch(countingCards(deck.cards))
      /* PLAYER ONLY GETS ONE CARD WHEN DOUBLING, SO MAKE STAY AFTER */
      dispatch(playerStay())
    })
  }
}

export const doublePlayer = (cards, index, bet) => {
  return { type: "DOUBLE_PLAYER", cards, index, bet }
}

const splitPlayerCards = (cards, index, bet) => {
  return { type: "SPLIT_PLAYER_CARDS", cards, index, bet }
}


/* ON INITIAL SPLIT NEED TO CHECK BOTH HANDS TO SEE IF EITHER RESULTED IN BLACKJACK */

export const splittingPlayerCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then( res => res.json() )
    .then( deck => {
      console.log('Player splits...')
      /* copy cards at current index in array */
      let index = getStore().currentHandIndex
      let bet = getStore().playerHand[index].bet
      let hand = getStore().playerHand.slice()
      let oldHand = hand[index].cards
      /* split up current hand into two and add cards */
      let splitHand1 = [oldHand[0], deck.cards[0]]
      let splitHand2 = [oldHand[1], deck.cards[1]]
      let cards = [splitHand1, splitHand2]
      dispatch(placingBet(bet))
      dispatch(splitPlayerCards( cards, index, bet ))

      dispatch(countingCards(deck.cards))
    })
  }
}

/* COUNTING CARD RELATED ACTIONS */
export const countingCards = cards => {
  return (dispatch, getStore) => {
    /* USE CONVENIENCE METHOD TO COUNT CARDS */
    let count = getCountFromHand(cards)
    dispatch(countCards(count))
  }
}

/* PASSES THROUGH COUNT OF CARDS LOOKING AT NOW TO ADD TO STATE */
export const countCards = count => {
  return { type: "COUNT", count }
}

/* PLACES INITIAL BET AMOUNT, THEN GETS ASSIGNED TO EACH HAND */
export const placingBet = bet => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let newPot = user.pot - bet

    /* PASSES THROUGH TO INITIAL BET STATE */
    dispatch(placeBet(bet))
    /* UPDATE USER'S POT */
    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: newPot })
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
    })
  }
}

export const placeBet = bet => {
  return { type: "PLACE_BET", bet }
}

/* RESET INITIAL BET TO 0 AT END OF EACH ROUND */
const resetBet = () => {
  return { type: "RESET_BET" }
}

/* HANDLE TIES, GIVE PLAYER BACK INITIAL BET */
export const playerPush = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let bet = getStore().playerHand[index].bet
    let user = getStore().user

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + bet })
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setUser(user))
      dispatch({ type: "PUSH" })
      dispatch(resetBet())
    })
  }
}

/* HANDLE PLAYER WINNING; SINCE POT DECREASED AT DEAL, NEED TO GET 2X BET BACK */
  /* V1 ISSUE =>
    WHEN SPLITTING, NOT GETTING PAID WHEN BOTH HANDS WIN; SINCE USING currentHandIndex, IT GETS TICKED TO LAST HAND INDEX, SO ONLY GETTING THAT WINNING, NOT ACTUALLY CHECKING EACH HAND
      => V2: WILL REFACTOR TO PASS IN HAND OBJECT SINCE USING THIS FUNCTION IN A MAP
  */


export const playerWins = hand => {
  return (dispatch, getStore) => {
    let user = getStore().user
    // let index = getStore().currentHandIndex
    // let hand = getStore().playerHand[index]
    let winnings = (hand.bet * 2)
    let newPot = user.pot + winnings
    console.log('winnings:', winnings)
    console.log('newpot:', newPot)
    if(newPot > user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ pot: newPot, largest_pot: newPot })
      })
      .then(res => res.json())
      .then(user => {
        dispatch(setUser(user))
        dispatch({ type: "PLAYER_WINS" })
        dispatch(resetBet())
      })
    }
    else if(newPot <= user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ pot: newPot })
      })
      .then(res => res.json())
      .then(user => {
        dispatch(setUser(user))
        dispatch({ type: "PLAYER_WINS" })
        dispatch(resetBet())
      })
    }
  }
}

/* CONVENIENCE METHOD FOR COUNTING CARDS, TAKES IN AN ARRAY */
const getCountFromHand = cards => {
  let count = 0
  cards.forEach( card => {
    switch(card.value){
      case "KING":
        count--
        break
      case "QUEEN":
        count--
        break
      case "JACK":
        count--
        break
      case "ACE":
        count--
        break
      case "10":
        count--
        break
      case "6":
        count++
        break
      case "5":
        count++
        break
      case "4":
        count++
        break
      case "3":
        count++
        break
      case "2":
        count++
        break
      default:
        break
    }
  })
  return count
}

/*
GAME LOGIC:

DEAL =>
DEALER: ONE CARD & SCORE HIDDEN
USER: CALCULATE SCORE, CHECK FOR SPLIT, HIT, STAY, or DOUBLE

HIT =>
USER: RECALC SCORE, CHECK FOR BUST, HIT OR STAY, LOOP UNTIL STAY

DOUBLE =>
USER: RECALC SCORE, CHECK FOR BUST, STAY

SPLIT =>
USER: GIVE TWO MORE CARDS/MAKE TWO HANDS, CHECK FOR SPLIT, FIRST HAND, HIT STAY OR DOUBLE; SECOND HAND, HIT STAY OR DOUBLE, LOOP UNTIL STAY

STAY =>
USER: REVEAL DEALER CARDS & SCORE, CHECK PLAYER SCORE AGAINST DEALER, IF PLAYER SCORE > DEALER SCORE && DEALER SCORE < 17, HIT DEALER then RECHECK DEALER
*/
