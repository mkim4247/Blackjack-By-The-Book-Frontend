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

        dispatch(checkPlayerPot())
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
      dispatch(checkPlayerPot())
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
      console.log(`Deck Set`)
      dispatch(fetchedDeck(deck.deck_id))
    })
  }
}

/* DEALING RELATED ACTIONS */
const dealDealerCards = (cards, score) => {
  return { type: "DEAL_DEALER_CARDS", cards, score }
}

/* PASSING BET HERE TO ASSIGN TO HAND IN REDUCER */
const dealPlayerCards = (cards, score, bet) => {
  return { type: "DEAL_PLAYER_CARDS", cards, score, bet }
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
            /* RESET COUNT ON SHUFFLE */
            dispatch(resetCount())
            dispatch(dealingActions(deck))
          })
        })
      }
      else {
        /* SAME AS ABOVE BUT DECK NOT SHUFFLED BEFORE DEALING */
        dispatch(dealingActions(deck))
      }
    })
  }
}

const resetCount = () => {
  return { type: "RESET_COUNT" }
}

const dealingActions = deck => {
  return (dispatch, getStore) => {
    let bet = getStore().bet

    /* SPLIT UP FETCHED CARDS BTWN PLAYER AND DEALER */
    deck.cards[0].value = "10"
    deck.cards[1].value = "10"
    deck.cards[2].value = "ACE"
    deck.cards[3].value = "ACE"


    let cards = [deck.cards[0], deck.cards[1]]
    let playerScore = assignHandValue(cards).score

    let dealerCards = [deck.cards[2], deck.cards[3]]
    let dealerScore = assignHandValue(dealerCards).score

    dispatch(dealDealerCards(dealerCards, dealerScore))
    dispatch(dealPlayerCards(cards, playerScore, bet))

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
    let addedGame = user.games_played + 1

    /* COMPARE CURRENT STREAK WITH LONGEST, UPDATE USER RECORD AS FIT */
    if(newStreak > user.longest_streak){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          games_played: addedGame,
          current_streak: newStreak,
          longest_streak: newStreak })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
      })
    }
    else if(newStreak <= user.longest_streak){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          games_played: addedGame,
          current_streak: newStreak
        })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
      })
    }
  }
}

/* HITTING RELATED ACTIONS */
/* PASS INDEX THROUGH SO KNOW WHICH HAND IS HIT */
const hitPlayerCards = (cards, score, index) => {
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
      let score = assignHandValue(cards).score

      /* PASS ENTIRE NEW HAND THROUGH */
      dispatch(hitPlayerCards(cards, score, index))
      /* CHECK IF PLAYER BUSTED */
      dispatch(checkPlayerBust())
      /* ADD CARD TO CURRENT COUNT */
      dispatch(countingCards(deck.cards))
    })
  }
}



const hitDealerCards = (cards, score) => {
  return { type: "HIT_DEALER_CARDS", cards, score }
}

export const hittingDealerCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId
    let dealerScore = getStore().dealerHand.score
    let dealerHand = getStore().dealerHand.cards
    /* DEALER HITS IF LESS THAN 17 */
    // if(dealerScore < 17 && !dealerHand.find( card => card.value === "ACE" )){
    if(dealerScore <= 17 && assignHandValue(dealerHand).soft){
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(deck => {
        console.log("Dealer Hits")
        /* COPY CURRENT HAND AND ADD NEW CARD TO IT */
        let cards = getStore().dealerHand.cards.slice()
        cards.push(deck.cards[0])
        let score = assignHandValue(cards).score
        /* PASS ENTIRE NEW HAND THROUGH */
        dispatch(hitDealerCards(cards, score))
        /* ADD CARD TO CURRENT COUNT */
        dispatch(countingCards(deck.cards))
      })
    }
    // else if(dealerScore <= 17 && dealerHand.find( card => card.value === "ACE")){
    else if(dealerScore < 17){
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(deck => {
        console.log("Dealer Hits")
        /* COPY CURRENT HAND AND ADD NEW CARD TO IT */
        let cards = getStore().dealerHand.cards.slice()
        cards.push(deck.cards[0])
        let score = assignHandValue(cards).score
        /* PASS ENTIRE NEW HAND THROUGH */
        dispatch(hitDealerCards(cards, score))
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
    let playerHand = getStore().playerHand
    let playerScore = playerHand[index].score
    let hand = playerHand[index]
    let result = "BUST"

    if(playerScore > 21){
      dispatch(setResult(hand, result))

      if(index < playerHand.length - 1){
        dispatch(advanceIndex())
        // dispatch(checkPlayerBlackJack())
      }
      else if(index > 0 && index === playerHand.length - 1){
        if(playerHand.find( hand => !hand.result )){
          dispatch(showDealer())
          dispatch(dealerMove())
        }
        else {
          dispatch(showDealer())
          dispatch(endRound())
          dispatch(resetBet())
          dispatch(checkPlayerPot())
        }
      }
      else {
        dispatch(showDealer())
        dispatch(endRound())
        dispatch(resetBet())
        dispatch(checkPlayerPot())
      }

    }
  }
}

const setResult = (hand, result) => {
  return { type: "SET_RESULT", hand, result }
}

const advanceIndex = () => {
  return { type: "ADVANCE_INDEX" }
}
//
// WORKING OUT CHECKING BJ ON BOTH HANDS AFTER A SPLIT RIGHT AWAY AND RESOLVING
//

/* CHECK PLAYER FOR BLACKJACK; WIN UNLESS DEALER ALSO HAS BLACKJACK */
const checkPlayerBlackJack = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let hand = getStore().playerHand[index]

    let playerHand = hand.cards
    let playerScore = hand.score

    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score


    /* CHECK IF PLAYER HAS BLACKJACK AND IF DEALER HAS BLACKJACK */
    if(playerHand.find( card => card.value === "ACE" ) && playerScore === 21){
      if(dealerHand.find( card => card.value === "ACE" ) && dealerScore === 21){
        /* TIE IF BOTH HAVE BLACKJACK */
        dispatch(showDealer())
        dispatch(playerPush(hand))
      } else {
        dispatch(winningBlackJack())
      }
    }
  }
}

const endRound = () => {
  return { type: "END_ROUND" }
}

/* HANDLES PLAYER WINNING WITH BLACKJACK */
const winningBlackJack = () => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand
    let bet = getStore().playerHand[index].bet
    let winnings = bet * 1.5
    let hand = playerHand[index]
    let result = "BLACKJACK"
    let newPot = user.pot + bet + winnings
    let addedWin = user.wins + 1

    if(newPot > user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          wins: addedWin,
          pot: newPot,
          largest_pot: newPot })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
        dispatch(setResult(hand, result))
        dispatch(resetBet())
        /* commented out code was for handling blackjack after splitting */
        // dispatch(advanceIndex())
        //
        // if(index < playerHand.length - 1){
        //   dispatch(checkPlayerBlackJack())
        // }
        // else {
          dispatch(showDealer())
          // dispatch(dealerMove())
          dispatch(endRound())
        // }
      })
    }
    else if(newPot <= user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          wins: addedWin,
          pot: newPot
        })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
        dispatch(setResult(hand, result))
        dispatch(resetBet())
        /* commented out code was for handling blackjack after splitting */
        // dispatch(advanceIndex())
        //
        // if(index < playerHand.length - 1){
        //   dispatch(checkPlayerBlackJack())
        // }
        // else {
          dispatch(showDealer())
          // dispatch(dealerMove())
          dispatch(endRound())
        // }
      })
    }
  }
}

const checkDealerFaceDown = () => {
  return (dispatch, getStore) => {
    /* AUTO ENDS IF DEALER HAS BLACKJACK */
    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score
    let index = getStore().currentHandIndex
    let hand = getStore().playerHand[index]
    let playerHand = hand.cards
    let result = "LOSE"

    /* TIE IF BOTH DEALER AND PLAYER HAVE BLACKJACK */
    if(dealerHand[1].value === "ACE" && dealerScore === 21){
      if(playerHand.find( card => card.value === "ACE" ) && playerHand.score === 21){
        dispatch(playerPush(hand))
      }
      else {
        /* DEALER WINS IF PLAYER DOESN'T HAVE BLACKJACK */
        dispatch(showDealer())
        dispatch(setResult(hand, result))
        dispatch(endRound())
        dispatch(resetBet())
        dispatch(checkPlayerPot())
      }
    }
  }
}

const checkDealerFaceUp = () => {
  return (dispatch, getStore) => {
    let dealerHand = getStore().dealerHand.cards
    let index = getStore().currentHandIndex
    let hand = getStore().playerHand[index]
    let playerHand = hand.cards
    /* shouldnt ask for insurance if player has winning BJ */

    /* OFFER INSURANCE IF DEALER SHOWING ACE */
    if(dealerHand[0].value === "ACE" && !playerHand.find( card => card.value === "ACE" && playerHand.score !== 21)){
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
    let insurance = Math.ceil(playerHand.bet/2)
    let user = getStore().user

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot - insurance })
    })
    .then(res => res.json())
    .then(userObj => {
      dispatch(setUser(userObj))
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
    let index = getStore().currentHandIndex
    let hand = getStore().playerHand[index]
    let result = "LOSE"

    /* CHECK IF DEALER HAS BLACKJACK, RESOLVE WITH INSURANCE */
    if(dealerHand[0].value === "ACE" && dealerScore === 21){
      if(insurance === 'take'){
        dispatch(insuranceWon())
        dispatch(showDealer())
        dispatch(setResult(hand, result))
        dispatch(endRound())
        dispatch(resetBet())
      }
      else {
        dispatch({ type: "INSURANCE_LOST" })
        dispatch(showDealer())
        dispatch(setResult(hand, result))
        dispatch(endRound())
        dispatch(resetBet())
        dispatch(checkPlayerPot())
      }
    }
    else {
      if(insurance === 'take') {
        dispatch({ type: "INSURANCE_LOST" })
      }
      else {
        dispatch({ type: "PASS_CORRECT" })
      }
    }
  }
}

const insuranceWon = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand[index]
    let winnings = playerHand.bet
    let user = getStore().user
    let newPot = user.pot + winnings

    if(newPot > user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          pot: newPot,
          largest_pot: newPot
         })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
        dispatch({ type: "INSURANCE_WON" })
      })
    }
    else if(newPot <= user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          pot: newPot
         })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
        dispatch({ type: "INSURANCE_WON" })
      })
    }
  }
}

/* SURRENDER RELATED ACTIONS */
/* GIVES PLAYER BACK 50% OF INITIAL BET */
export const surrenderingPlayer = () => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand
    let amount = (playerHand[index].bet/2)
    let hand = playerHand[index]
    let result = "SURRENDER"

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + amount })
    })
    .then(res => res.json())
    .then(userObj => {
      dispatch(setUser(userObj))
      dispatch(setResult(hand, result))
      dispatch(surrenderedPlayer())
      dispatch(endRound())
      dispatch(resetBet())
      dispatch(checkPlayerPot())
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
      dispatch(advanceIndex())
      // dispatch(checkPlayerBlackJack())
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
    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score
    let playerHand = getStore().playerHand
    /* DEALER HITS IF LESS THAN 17 */

    // if(dealerScore < 17 && !dealerHand.find( card => card.value === "ACE" )){
    if(dealerScore <= 17 && assignHandValue(dealerHand).soft){
        if(playerHand.find( hand => hand.result === null )){
       setTimeout( () => {
         dispatch(hittingDealerCards())
         dispatch(dealerMove())
       }, 1750)
     }
    }
    // else if(dealerScore <= 17 && dealerHand.find( card => card.value === "ACE")){
    else if(dealerScore < 17){
      if(playerHand.find( hand => hand.result === null )){
        setTimeout( () => {
           dispatch(hittingDealerCards())
           dispatch(dealerMove())
         }, 1750)
      }
    }
    else {
      /* COMPARE EACH OF PLAYER'S HANDS TO DEALER AND DETERMINE OUTCOME */
      dispatch(comparePlayerToDealer())
    }
  }
}

const comparePlayerToDealer = () => {
  return (dispatch, getStore) => {
    let playerHand = getStore().playerHand
    let dealerScore = getStore().dealerHand.score
    let result = "LOSE"

    playerHand.forEach( hand => {
      if(hand.result === null){
        if(hand.score === dealerScore){
          dispatch(playerPush(hand))
        }
        else if(dealerScore > 21 && hand.score <= 21){
          dispatch(playerWins(hand))
        }
        else if(hand.score > 21){
          dispatch(setResult(hand, result))
          dispatch(endRound())
          dispatch(resetBet())
          dispatch(checkPlayerPot())
        }
        else if(hand.score > dealerScore && hand.score <= 21){
          dispatch(playerWins(hand))
        }
        else if(hand.score < dealerScore){
          dispatch(setResult(hand, result))
          dispatch(endRound())
          dispatch(resetBet())
          dispatch(checkPlayerPot())
        }
      }
    })
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
      let score = assignHandValue(cards).score
      /* GET CURRENT BET AND DOUBLE IT */
      let currentBet = playerHand.bet
      let bet = (currentBet * 2)

      /* SUBTRACT DOUBLE DOWN BET FROM POT, PASS THROUGH NEW DOUBLED BET THROUGH TO REDUCER TO ASSIGN TO HAND */
      dispatch(placingBet(currentBet))
      dispatch(doublePlayer(cards, score, index, bet))
      /* CHECK FOR BUST AND ADD TO COUNT */
      dispatch(checkPlayerBust())
      dispatch(countingCards(deck.cards))
      /* PLAYER ONLY GETS ONE CARD WHEN DOUBLING, SO MAKE STAY AFTER */
      if(!playerHand.result){
        dispatch(playerStay())
      }
    })
  }
}

export const doublePlayer = (cards, score, index, bet) => {
  return { type: "DOUBLE_PLAYER", cards, score, index, bet }
}

const splitPlayerCards = (cards, score, index, bet) => {
  return { type: "SPLIT_PLAYER_CARDS", cards, score, index, bet }
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
      let score = [assignHandValue(splitHand1).score, assignHandValue(splitHand2).score]
      let cards = [splitHand1, splitHand2]


      dispatch(placingBet(bet))
      dispatch(splitPlayerCards( cards, score, index, bet ))
      dispatch(countingCards(deck.cards))
      // dispatch(checkPlayerBlackJack())

      /* IF SPLIT ACES, NOT ALLOWED FURTHER ACTIONS */
      if(oldHand[0].value === "ACE"){
        setTimeout( () => {
          dispatch(showDealer())
          dispatch(dealerMove())
        }, 1000)
      }
    })
  }
}

/* COUNTING CARD RELATED ACTIONS */
export const countingCards = cards => {
  return dispatch => {
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
    .then(userObj => {
      dispatch(setUser(userObj))
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
export const playerPush = playerHand => {
  return (dispatch, getStore) => {
    let bet = playerHand.bet
    let user = getStore().user
    let result = "PUSH"

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + bet })
    })
    .then(res => res.json())
    .then(userObj => {
      dispatch(setUser(userObj))
      dispatch(setResult(playerHand, result))
      dispatch(endRound())
      dispatch(resetBet())
    })
  }
}

/* HANDLE PLAYER WINNING; SINCE POT DECREASED AT DEAL, NEED TO GET 2X BET BACK */
  /* V1 ISSUE =>
    WHEN SPLITTING, NOT GETTING PAID WHEN BOTH HANDS WIN; SINCE USING currentHandIndex, IT GETS TICKED TO LAST HAND INDEX, SO ONLY GETTING THAT WINNING, NOT ACTUALLY CHECKING EACH HAND
      => V2: WILL REFACTOR TO PASS IN HAND OBJECT SINCE USING THIS FUNCTION IN A MAP
  */


export const playerWins = playerHand => {
  return (dispatch, getStore) => {
    let user = getStore().user
    let winnings = (playerHand.bet * 2)
    let newPot = user.pot + winnings
    let addedWin = user.wins + 1
    let result = "WIN"

    if(newPot > user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          wins: addedWin,
          pot: newPot,
          largest_pot: newPot })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
        dispatch(setResult(playerHand, result))
        dispatch(endRound())
        dispatch(resetBet())
      })
    }
    else if(newPot <= user.largest_pot){
      fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          wins: addedWin,
          pot: newPot })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
        dispatch(setResult(playerHand, result))
        dispatch(endRound())
        dispatch(resetBet())
      })
    }
  }
}

const checkPlayerPot = () => {
  return (dispatch, getStore) => {
    let user = getStore().user

    if(user.pot < 1){
      dispatch(endGame())
    }
  }
}

const endGame = () => {
  return { type: "GAME_OVER" }
}

const shuffleDeck = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    .then(res => res.json())
    .then(deck => {
      console.log('Deck shuffled')
      /* RESET COUNT ON SHUFFLE */
      dispatch(resetCount())
    })
  }
}

export const restartGame = () => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: 100, current_streak: 0 })
    })
    .then(res => res.json())
    .then(userObj => {
      dispatch(setUser(userObj))
      dispatch(shuffleDeck())
      dispatch(startNewGame())
    })
  }
}

const startNewGame = () => {
  return { type: "NEW_GAME" }
}

export const toggleStrategy = () => {
  return { type: "TOGGLE_STRATEGY" }
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

/* CONVENIENCE METHOD FOR ASSIGNING HAND VALUE */
const assignHandValue = cards => {
  let aceCount = 0
  let handValue = 0
  let soft = false

  cards.forEach( card => {
    switch(card.value){
      case "KING":
        handValue += 10
        break
      case "QUEEN":
        handValue += 10
        break
      case "JACK":
        handValue += 10
        break
      case "ACE":
        handValue += 11
        aceCount++
        soft = true
        break
      default:
        handValue += parseInt(card.value)
        break
      }
  })

  while(handValue > 21 && aceCount > 0){
    handValue -= 10
    aceCount--
  }

  if(aceCount === 0){
    soft = false
  }

  return {score: handValue, soft}
}

/*
   IF GAME RESTARTS, NEED TO RESET USER's POT to 100 and STREAK to 0, RESHUFFLE DECK
*/


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
