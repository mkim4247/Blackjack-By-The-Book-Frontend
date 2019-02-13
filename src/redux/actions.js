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
        console.log('Login Successful', data.user_info)
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
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(deck => {
      console.log(`Deck fetched, ID: ${deck.deck_id}`)
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

      dispatch(dealDealerCards(dealerCards))
      dispatch(dealPlayerCards(playerCards))
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

      dispatch(hitPlayerCards(cards, index))
      dispatch(checkPlayerBust())
    })
  }
}

const checkPlayerBust = () => {
  return (dispatch, getStore) => {
    let index = getStore().currentHandIndex
    let hand = getStore().playerHand
    let playerScore = getStore().playerHand[index].score

    if(playerScore > 21){
      dispatch({ type: "BUST" })
    }
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
    if(dealerScore <= playerScore && dealerScore < 17){
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(res => res.json())
      .then(deck => {
        let cards = getStore().dealerHand.cards.slice()
        cards.push(deck.cards[0])
        dispatch(hitDealerCards(cards))
      })
    }
  }
}

export const playerStay = () => {
  return (dispatch, getStore) => {
    let hand = getStore().playerHand
    let index = getStore().currentHandIndex

    if(index < hand.length - 1 ){
      dispatch({ type: "STAY" })
    }
    else {
      dispatch(dealerMove())
    }
  }
}

export const dealerMove = () => {
  return (dispatch, getStore) => {
    let dealerScore = getStore().dealerHand.score
    let index = getStore().currentHandIndex
    let playerScore = getStore().playerHand[0].score
    if(dealerScore <= playerScore && dealerScore < 17){
      setTimeout( () => {
        dispatch(hittingDealerCards())
        dispatch(dealerMove())
      }, 1000)
    } else if(dealerScore === playerScore){
        dispatch({ type: "PUSH" })
    } else if(playerScore > dealerScore || dealerScore > 21){
        dispatch({ type: "PLAYER_WINS" })
    } else if(dealerScore > playerScore || playerScore > 21){
        dispatch({ type: "DEALER_WINS" })
    }
  }
}

export const doublingPlayer = () => {
  return (dispatch, getStore) => {
    dispatch(hittingPlayerCards())
    dispatch({ type: "DOUBLE" })
    dispatch(dealerMove())
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
      let index = getStore().currentHandIndex
      let hand = getStore().playerHand.slice()
      let oldHand = hand[index].cards
      let splitHand1 = [oldHand[0], deck.cards[0]]
      let splitHand2 = [oldHand[1], deck.cards[1]]
      let cards = [splitHand1, splitHand2]
      dispatch(splitPlayerCards( cards, index ))
    })
  }
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
