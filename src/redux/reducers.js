import { combineReducers } from 'redux'

const userReducer = (state=null, action) => {
  switch(action.type){
    case "SET_USER":
      return action.user
    default:
      return state
  }
}

const deckReducer = (state=null, action) => {
  switch(action.type){
    case "SET_DECK":
      return action.deckId
    default:
      return state
  }
}

const dealerHandReducer = (state=[], action) => {
  switch(action.type){
    case "DEAL_DEALER_CARDS":
      return action.cards
    case "HIT_DEALER_CARDS":
      return [...state, action.cards]
    default:
      return state
  }
}

const playerHandReducer = (state=[], action) => {
  switch(action.type){
    case "DEAL_PLAYER_CARDS":
      return action.cards
    case "HIT_PLAYER_CARDS":
      return [...state, action.cards]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  deckId: deckReducer,
  dealerHand: dealerHandReducer,
  playerHand: playerHandReducer
})

export default rootReducer
