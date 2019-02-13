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

const dealerHandReducer = (state={ cards: [], score: null }, action) => {
  switch(action.type){
    case "DEAL_DEALER_CARDS":
      return { cards: action.cards, score: assignHandValue(action.cards) }
    case "HIT_DEALER_CARDS":
      return { cards: action.cards, score: assignHandValue(action.cards) }
    default:
      return state
  }
}

const playerHandReducer = (state=[{ cards: [], score: null }], action) => {
  switch(action.type){
    case "DEAL_PLAYER_CARDS":
      return [{cards: action.cards, score: assignHandValue(action.cards)}]
    case "HIT_PLAYER_CARDS":
      let copy = [...state]
      copy[action.index] = {cards: action.cards, score: assignHandValue(action.cards)}
      return copy
    case "SPLIT_PLAYER_CARDS":
      let firstHalf = state.slice(0, action.index)
      let secondHalf = state.slice( action.index + 1)
      let split = [{ cards: action.cards[0], score: assignHandValue(action.cards[0])}, { cards: action.cards[1], score: assignHandValue(action.cards[1])}]
      return firstHalf.concat(split).concat(secondHalf)
    default:
      return state
  }
}

const playerActionReducer = (state=null, action) => {
  switch(action.type){
    case "DEAL_PLAYER_CARDS":
      return "deal"
    case "STAY":
      return "stay"
    case "DOUBLE":
      return "double"
    case "SPLIT":
      return "split"
    default:
      return state
  }
}

const currentHandReducer = (state=0, action) => {
  let next;
  switch(action.type){
    case "DEAL_PLAYER_CARDS":
      return 0
    case "STAY":
      next = ++state
      return next
    case "BUST":
      next = ++state
      return next
    default:
      return state
  }
}

const roundResultReducer = (state=null, action) => {
  switch(action.type){
    case "DEALER_WINS":
      return "Dealer Wins"
    case "PLAYER_WINS":
      return "Player Wins"
    case "PUSH":
      return "Push"
    case "DEAL_PLAYER_CARDS":
      return null
    case "BUST":
      return "Bust"
    default:
      return state
  }
}

const countReducer = (state=0, action) => {
  switch(action.type){
    case "COUNT":
      return action.count
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  deckId: deckReducer,
  dealerHand: dealerHandReducer,
  playerHand: playerHandReducer,
  currentHandIndex: currentHandReducer,
  playerAction: playerActionReducer,
  roundResult: roundResultReducer,
  count: countReducer
})

export default rootReducer


/* CONVENIENCE METHOD FOR ASSIGNING HAND VALUE */
const assignHandValue = cards => {
  let aceCount = 0
  let handValue = 0

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
  return handValue
}
