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

export const fetchedDeck = deckId => {
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

////FIGURE OUT HOW TO REFACTOR LATER

export const dealDealerCards = cards => {
  return { type: "DEAL_DEALER_CARDS", cards }
}

export const hitDealerCards = card => {
  return { type: "HIT_DEALER_CARDS", card }
}

export const dealPlayerCards = cards => {
  return { type: "DEAL_PLAYER_CARDS", cards }
}

export const hitPlayerCards = cards => {
  return { type: "HIT_PLAYER_CARDS", cards }
}

export const dealingCards = () => {
  return (dispatch, getStore) => {
    fetch(`https://deckofcardsapi.com/api/deck/${getStore().deckId}/draw/?count=4`)
    .then(res => res.json())
    .then(deck => {
      console.log(deck.cards)
      let dealers = [deck.cards[0], deck.cards[1]]
      console.log(dealers)
      let players = [deck.cards[2], deck.cards[3]]
      console.log(players)
      dispatch(dealDealerCards(dealers))
      dispatch(dealPlayerCards(players))
    })
  }
}

export const hittingDealerCards = () => {
  return (dispatch, getStore) => {
    fetch(`https://deckofcardsapi.com/api/deck/${getStore().deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(deck => {
      console.log(deck)
      dispatch(hitDealerCards(deck.cards))
    })
  }
}

export const hittingPlayerCards = () => {
  return (dispatch, getStore) => {
    fetch(`https://deckofcardsapi.com/api/deck/${getStore().deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(deck => {
      console.log(deck)
      dispatch(hitPlayerCards(deck.cards[0]))
    })
  }
}
