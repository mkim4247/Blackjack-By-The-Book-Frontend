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
    .then( res => res.json() )
    .then( data => {
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
      console.log('Valid Token')
      dispatch(setUser(data.user))
    })
  }
}

/* FETCHING API AND ASSIGNING DECK ACTIONS */
const fetchedDeck = deckId => {
  return { type: "SET_DECK", deckId }
}

export const fetchingDeck = () => {
  return dispatch => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(res => res.json())
    .then(deck => {
      console.log(`Deck fetched; ID: ${deck.deck_id}`)
      dispatch(fetchedDeck(deck.deck_id))
    })
  }
}

/* DEALING RELATED ACTIONS */
const dealDealerCards = cards => {
  return { type: "DEAL_DEALER_CARDS", cards }
}

const dealPlayerCards = cards => {
  return { type: "DEAL_PLAYER_CARDS", cards }
}

export const dealingCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
    .then(res => res.json())
    .then(deck => {
        console.log("Dealing cards...")

        /* split up cards returned from fetch to API */
        let dealerCards = [deck.cards[0], deck.cards[1]]
        let playerCards = [deck.cards[2], deck.cards[3]]
        /* give cards to dealer and player  */
        dispatch(dealDealerCards(dealerCards))
        dispatch(dealPlayerCards(playerCards))
        /* check cards and add to count*/
        dispatch(subtractBetFromPot())
        dispatch(countingCards(deck.cards))
        /* check player and dealer for blackjack */
        dispatch(checkPlayerBlackJack())
        dispatch(checkDealerFaceDown())
        dispatch(checkDealerFaceUp())

        if(deck.remaining < 150){
          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
          .then(res => res.json())
          .then(deck => {
            console.log('Deck shuffled')
          })
        }

    })
  }
}

/* HITTING RELATED ACTIONS */
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

      /* passing all cards (old hand plus new card) */
      let index = getStore().currentHandIndex
      let cards = getStore().playerHand[index].cards.slice()
      cards.push(deck.cards[0])
      /* give player new card */
      dispatch(hitPlayerCards(cards, index))
      /* check if player busted */
      dispatch(checkPlayerBust())
      /* add card to count */
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
    /* dealer only hits if losing to player and not at 17 */
    if(dealerScore <= playerScore && dealerScore < 17){
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(deck => {
        let cards = getStore().dealerHand.cards.slice()
        cards.push(deck.cards[0])
        /* give dealer new card */
        dispatch(hitDealerCards(cards))
        /* add card to count */
        dispatch(countingCards(deck.cards))
      })
    }
  }
}

const checkPlayerBust = () => {
  return (dispatch, getStore) => {
    /* check current hand */
    let index = getStore().currentHandIndex
    let playerScore = getStore().playerHand[index].score

    if(playerScore > 21){
      dispatch({ type: "BUST" })
    }
  }
}

/* CHECK PLAYER FOR BLACKJACK; WIN UNLESS DEALER ALSO HAS BLACKJACK */
const checkPlayerBlackJack = () => {
  return (dispatch, getStore) => {
    /* check current hand */
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand[index].cards
    let playerScore = getStore().playerHand[index].score

    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score

    if(playerHand.find( card => card.value === "ACE") && playerScore === 21){
      if(dealerHand.find( card => card.value === "ACE") && dealerScore === 21){
        dispatch({ type: "DEALER_MOVE" })
        dispatch({ type: "PUSH" })
      } else {
        dispatch({ type: "BLACKJACK" })
      }
    }
  }
}

const checkDealerFaceDown = () => {
  return (dispatch, getStore) => {
    /* auto ends if dealer has facedown blackjack */
    let dealerHand = getStore().dealerHand.cards
    let dealerScore = getStore().dealerHand.score
    let playerHand = getStore().playerHand[0].cards
    if(dealerHand[1].value === "ACE" && dealerScore === 21){
      if(playerHand.find( card => card.value === "ACE" ) && playerHand.score === 21){
        dispatch({ type: "PUSH" })
      }
      else {
        dispatch({ type: "DEALER_MOVE" })
        dispatch({ type: "DEALER_WINS" })
      }
    }
  }
}

const checkDealerFaceUp = () => {
  return (dispatch, getStore) => {
    let dealerHand = getStore().dealerHand.cards
    /* offer insurance if dealer faceup is ace */
    if(dealerHand[0].value === "ACE"){
      dispatch(askForInsurance())
    }
  }
}
/* renders insurance button */
export const askForInsurance = () => {
  return { type: "ASK_PLAYER" }
}

/* player options for insurance */
export const takeInsurance = () => {
  return dispatch => {
    dispatch({ type: "TAKE_INSURANCE" })
    dispatch(resolveDealerAce())
  }
}

///INSURANCE IS HALF OF ORIGINAL BET ///////

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

    /* check if dealer has blackjack and if player took insurance to resolve */
    if(dealerHand[0].value === "ACE" && dealerScore === 21){
      if(insurance === 'take'){
        dispatch({ type: "INSURANCE_WIN" })
        dispatch({ type: "DEALER_WINS" })
      }
      else {
        dispatch({ type: "INSURANCE_LOST" })
        dispatch({ type: "DEALER_WINS" })
      }
    }
    else {
      dispatch({ type: "INSURANCE_LOST" })
    }
  }
}

/* ADD AN INSURANCE LOST AND WON ACTION HERE */

export const playerStay = () => {
  return (dispatch, getStore) => {
    let hand = getStore().playerHand
    let index = getStore().currentHandIndex
    /* check next index in cards array; if nothing there, then dealer turn, o/w still player turn */
    if(index < hand.length - 1 ){
      dispatch({ type: "STAY" })
    }
    else {
      dispatch(showDealer())
      dispatch(dealerMove())
    }
  }
}

/* reveals dealer facedown and score */
const showDealer = () => {
  return { type: "DEALER_MOVE" }
}

/////////* NEED TO CHECK DEALER HAND AGAINST EACH PLAYER HAND */////////
export const dealerMove = () => {
  return (dispatch, getStore) => {
    let dealerScore = getStore().dealerHand.score
    let index = getStore().currentHandIndex
    let playerHand = getStore().playerHand
    let playerScore = getStore().playerHand[0].score

    /* dealer only hits if losing to player and not at 17 */
    if(playerHand.find( hand => hand.score >= dealerScore && hand.score <= 21) && dealerScore < 17){
      setTimeout( () => {
        dispatch(hittingDealerCards())
        dispatch(dealerMove())
      }, 1000)
    }
    else {
      playerHand.forEach( hand => {
        if(hand.score === dealerScore){
          dispatch({ type: "PUSH" })
        }
        else if(dealerScore > 21){
          dispatch({ type: "PLAYER_WINS" })
          dispatch(playerWins())
        }
        else if(hand.score > 21){
          dispatch({ type: "DEALER_WINS" })
        }
        else if(hand.score > dealerScore && hand.score <= 21){
          dispatch({ type: "PLAYER_WINS" })
          dispatch(playerWins())
        }
        else if(hand.score < dealerScore){
          dispatch({ type: "DEALER_WINS" })
        }
      })
    }
  }
}

export const doublingPlayer = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(deck => {
      console.log('Player hits...')

      /* passing all cards (old hand plus new card) */
      let index = getStore().currentHandIndex
      let cards = getStore().playerHand[index].cards.slice()
      cards.push(deck.cards[0])
      /* give player new card and then end turn */
      dispatch(hitPlayerCards(cards, index))
      dispatch(subtractBetFromPot())
      dispatch({ type: "DOUBLE" })
      dispatch(checkPlayerBust())
      dispatch(countingCards(deck.cards))
      dispatch(playerStay())
    })
  }
}

const splitPlayerCards = (cards, index) => {
  return { type: "SPLIT_PLAYER_CARDS", cards, index }
}

export const splittingPlayerCards = () => {
  return (dispatch, getStore) => {
    fetch(`https://deckofcardsapi.com/api/deck/${getStore().deckId}/draw/?count=2`)
    .then( res => res.json() )
    .then( deck => {
      console.log('Player splits...')
      /* copy cards at current index in array */
      let index = getStore().currentHandIndex
      let hand = getStore().playerHand.slice()
      let oldHand = hand[index].cards
      /* split up current hand into two and add cards */
      let splitHand1 = [oldHand[0], deck.cards[0]]
      let splitHand2 = [oldHand[1], deck.cards[1]]
      let cards = [splitHand1, splitHand2]
      dispatch(splitPlayerCards( cards, index ))
      dispatch(subtractBetFromPot())
      dispatch(countingCards(deck.cards))
    })
  }
}
/* uses convenience method to find count of cards */
export const countingCards = cards => {
  return (dispatch, getStore) => {
    let count = getCountFromHand(cards)
    dispatch(countCards(count))
  }
}
/* assigns new count total */
export const countCards = count => {
  return { type: "COUNT", count }
}

/* assigns bet amount */
export const placeBet = bet => {
  return { type: "BET", bet }
}



/* saves player's losings */
export const subtractBetFromPot = () => {
  return (dispatch, getStore) => {
    let bet = getStore().bet
    let user = getStore().user
    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot - bet })
    })
    .then( res => res.json() )
    .then( user => {
      dispatch(setUser(user))
    })
  }
}


/* saves player's winnings */
export const playerWins = () => {
  return (dispatch, getStore) => {
    let winnings = (getStore().bet * 2)
    let user = getStore().user
    fetch(`http://localhost:4247/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ pot: user.pot + winnings })
    })
    .then( res => res.json() )
    .then( user => {
      dispatch(setUser(user))
    })
  }
}

/* Convenience method to count cards in hand; takes in an array of cards */
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
