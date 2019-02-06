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

const rootReducer = combineReducers({
  user: userReducer,
  deckId: deckReducer
})

export default rootReducer
