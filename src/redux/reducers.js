import { combineReducers } from "redux";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    default:
      return state;
  }
};

const deckReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_DECK":
      return action.deckId;
    default:
      return state;
  }
};

const dealerHandReducer = (state = { cards: [], score: null }, action) => {
  switch (action.type) {
    case "DEAL_DEALER_CARDS":
      return {
        cards: action.cards,
        score: action.score,
      };
    case "HIT_DEALER_CARDS":
      return {
        cards: action.cards,
        score: action.score,
      };
    case "RESET_COUNT":
      let newState = {
        cards: [],
        score: null,
      };
      return newState;
    default:
      return state;
  }
};

const playerHandReducer = (
  state = [{ cards: [], score: null, bet: null, result: null }],
  action
) => {
  let handCopy;
  switch (action.type) {
    case "DEAL_PLAYER_CARDS":
      return [
        {
          cards: action.cards,
          score: action.score,
          bet: action.bet,
          result: null,
        },
      ];
    case "HIT_PLAYER_CARDS":
      handCopy = [...state];
      handCopy[action.index] = {
        ...state[action.index],
        cards: action.cards,
        score: action.score,
      };
      return handCopy;
    case "DOUBLE_PLAYER":
      handCopy = [...state];
      handCopy[action.index] = {
        ...state[action.index],
        cards: action.cards,
        score: action.score,
        bet: action.bet,
      };
      return handCopy;
    case "SPLIT_PLAYER_CARDS":
      let firstHalf = state.slice(0, action.index);
      let secondHalf = state.slice(action.index + 1);
      let split = [
        {
          cards: action.cards[0],
          score: action.score[0],
          bet: action.bet,
          result: null,
        },
        {
          cards: action.cards[1],
          score: action.score[1],
          bet: action.bet,
          result: null,
        },
      ];
      return firstHalf.concat(split).concat(secondHalf);
    case "SET_RESULT":
      handCopy = state.map((hand) => {
        if (hand === action.hand) {
          hand.result = action.result;
          return hand;
        } else {
          return hand;
        }
      });
      return handCopy;
    case "RESET_COUNT":
      let newState = [
        {
          cards: [],
          score: null,
          bet: null,
          result: null,
        },
      ];
      return newState;
    default:
      return state;
  }
};

const currentHandReducer = (state = 0, action) => {
  switch (action.type) {
    case "DEAL_PLAYER_CARDS":
      return 0;
    case "ADVANCE_INDEX":
      let next = ++state;
      return next;
    default:
      return state;
  }
};

const roundResultReducer = (state = "End", action) => {
  switch (action.type) {
    case "DEAL_PLAYER_CARDS":
      return "Deal";
    case "END_ROUND":
      return "End";
    case "RESET_COUNT":
      return "End";
    default:
      return state;
  }
};

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case "COUNT":
      let newCount = state + action.count;
      return newCount;
    case "RESET_COUNT":
      return 0;
    default:
      return state;
  }
};

const betReducer = (state = 0, action) => {
  switch (action.type) {
    case "PLACE_BET":
      let newBet = state + action.bet;
      return newBet;
    case "RESET_BET":
      return 0;
    case "RESET_COUNT":
      return 0;
    default:
      return state;
  }
};

const showDealerReducer = (state = false, action) => {
  switch (action.type) {
    case "DEAL_PLAYER_CARDS":
      return false;
    case "DEALER_MOVE":
      return true;
    default:
      return state;
  }
};

const insuranceReducer = (state = null, action) => {
  switch (action.type) {
    case "ASK_PLAYER":
      return "ask";
    case "TAKE_INSURANCE":
      return "take";
    case "PASS_INSURANCE":
      return "pass";
    case "DEAL_PLAYER_CARDS":
      return null;
    case "RESET_COUNT":
      return null;
    default:
      return state;
  }
};

const gameReducer = (state = false, action) => {
  switch (action.type) {
    case "GAME_OVER":
      return true;
    case "NEW_GAME":
      return false;
    case "RESET_COUNT":
      return false;
    default:
      return state;
  }
};

const strategyReducer = (state = true, action) => {
  switch (action.type) {
    case "TOGGLE_STRATEGY":
      return !state;
    default:
      return state;
  }
};

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
  insurance: insuranceReducer,
  gameOver: gameReducer,
  showStrategy: strategyReducer,
});

export default rootReducer;
