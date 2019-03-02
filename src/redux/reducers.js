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
      return {
        cards: action.cards,
        score: assignHandValue(action.cards)
      }
    case "HIT_DEALER_CARDS":
      return {
        cards: action.cards,
        score: assignHandValue(action.cards)
      }
    default:
      return state
  }
}

const playerHandReducer = (state=[{ cards: [], score: null, bet: null, result: null }], action) => {

  let handCopy;
  switch(action.type){
    case "DEAL_PLAYER_CARDS":
      return [{
        cards: action.cards,
        score: assignHandValue(action.cards),
        bet: action.bet,
        result: null
      }]
    case "HIT_PLAYER_CARDS":
      handCopy = [...state]
      handCopy[action.index] = {
        ...state[action.index],
        cards: action.cards,
        score: assignHandValue(action.cards)
      }
      return handCopy
    case "DOUBLE_PLAYER":
      handCopy = [...state]
      handCopy[action.index] = { ...state[action.index],
        cards: action.cards,
        score: assignHandValue(action.cards),
        bet: action.bet
      }
      return handCopy
    case "SPLIT_PLAYER_CARDS":
      let firstHalf = state.slice(0, action.index)
      let secondHalf = state.slice( action.index + 1)
      let split = [{
          cards: action.cards[0],
          score: assignHandValue(action.cards[0]),
          bet: action.bet,
          result: null
        },
        {cards: action.cards[1],
          score: assignHandValue(action.cards[1]),
          bet: action.bet,
          result: null
        }]
      return firstHalf.concat(split).concat(secondHalf)

    case "SET_RESULT":
      handCopy = [...state]
      handCopy[action.index] = {
        ...state[action.index],
        result: action.result
      }
      return handCopy
      
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
    case "PLAYER_BUST":
      next = ++state
      return next
    case "BLACKJACK":
      next = ++state
      return next
    case "SURRENDER":
      next = ++state
      return next
    default:
      return state
  }
}

const roundResultReducer = (state="Start", action) => {
  switch(action.type){
    case "DEALER_WINS":
      return "Dealer Wins"
    case "PLAYER_WINS":
      return "Player Wins"
    case "PUSH":
      return "Push"
    case "BLACKJACK":
      return "Blackjack"
    case "DEAL_PLAYER_CARDS":
      return "Deal"
    case "PLAYER_BUST":
      return "Bust"
    case "SURRENDER":
      return "Surrender"
    default:
      return state
  }
}

const countReducer = (state=0, action) => {
  switch(action.type){
    case "COUNT":
      let newCount = state + action.count
      return newCount
    default:
      return state
  }
}

const betReducer = (state=0, action) => {
  switch(action.type){
    case "PLACE_BET":
      let newBet = state + action.bet
      return newBet
    case "RESET_BET":
      return 0
    default:
      return state
  }
}

const showDealerReducer = (state=false, action) => {
  switch(action.type){
    case "DEAL_PLAYER_CARDS":
      return false
    case "DEALER_MOVE":
      return true
    default:
      return state
  }
}

const insuranceReducer = (state=null, action) => {
  switch(action.type){
    case "ASK_PLAYER":
      return 'ask'
    case "TAKE_INSURANCE":
      return 'take'
    case "PASS_INSURANCE":
      return 'pass'
    case "DEAL_PLAYER_CARDS":
      return null
    case "INSURANCE_LOST":
      return 'LOST'
    case "INSURANCE_WON":
      return 'WON'
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
  roundResult: roundResultReducer,
  count: countReducer,
  bet: betReducer,
  showDealer: showDealerReducer,
  insurance: insuranceReducer
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
