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

export const dealCards = cards => {
  return { type: "DEAL_CARDS", cards }
}

export const dealingCards = deckId, number => {
  return dispatch => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${number}`)
    .then(res => res.json())
    .then(deck => {
      dispatch(dealCards(deck.cards))
    })
  }
}
