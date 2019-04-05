const RAILS_API = 'http://localhost:4247/api/v1/'
const DOC_API = 'https://deckofcardsapi.com/api/deck/'
const HEADERS = { "Content-type": "application/json" }

/* USER RELATED ACTIONS*/
export const setUser = user => {
  return { type: "SET_USER", user }
}

export const settingUser = user => {
  return dispatch => {
    fetch(RAILS_API + 'login', {
      method: "POST",
      headers: HEADERS,
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

        /* render NEW GAME button if pot = 0 */
        dispatch(checkPlayerPot())
      }
    })
  }
}

export const creatingNewUser = user => {
  return dispatch => {
    fetch(RAILS_API + 'users', {
      method:"POST",
      headers: HEADERS,
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
    fetch(RAILS_API + 'profile', {
    method: "GET",
    headers: {
      "Authentication": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        alert('Invalid Token')
        localStorage.clear()
      }
      else {
        console.log(`Welcome Back, ${data.user.username}`)
        dispatch(setUser(data.user))
        dispatch(checkPlayerPot())
      }
    })
  }
}

/* fetching to guest route, will always start at 100 pot */
export const guestLogin = () => {
  return dispatch => {
    fetch(RAILS_API + 'guest', {
      method: "POST",
      headers: HEADERS
    })
    .then(res => res.json())
    .then(data => {
      console.log('Logged in as Guest')
      localStorage.setItem('token', data.token)
      dispatch(setUser(data.user_info))
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
    fetch(DOC_API + 'new/shuffle/?deck_count=6')
    .then(res => res.json())
    .then(deck => {
      console.log(`Deck Set`)
      dispatch(fetchedDeck(deck.deck_id))
      dispatch(resetCount())
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

    fetch(DOC_API + `${deckId}/draw/?count=4`)
    .then(res => res.json())
    .then(deck => {
      /* AUTO SHUFFLE DECK IF ~HALFWAY THROUGH BEFORE DEALING CARDS*/
      console.log(deck.remaining)
      if(deck.remaining < 160){
        alert('Shuffling Deck')
        fetch(DOC_API + `${deckId}/shuffle/`)
        .then(res => res.json())
        .then(deck => {
          console.log('Deck shuffled')
          setTimeout(() => {
            fetch(DOC_API + `${deckId}/draw/?count=4`)
            .then(res => res.json())
            .then(deck => {
              /* RESET COUNT ON SHUFFLE */
              dispatch(resetCount())
              alert('Dealing Cards')
              dispatch(dealingActions(deck))
            })
          }, 1500 )
        })
      }
      else {
        /* SAME AS ABOVE BUT DECK NOT SHUFFLED BEFORE DEALING */
        dispatch(dealingActions(deck))
      }
    })
  }
}

export const resetCount = () => {
  return { type: "RESET_COUNT" }
}

const dealingActions = deck => {
  return (dispatch, getStore) => {
    let bet = getStore().bet

    /* SPLIT UP FETCHED CARDS BTWN PLAYER AND DEALER */
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
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
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
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
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
  return { type: "HIT_PLAYER_CARDS", cards, score, index }
}

export const hittingPlayerCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(DOC_API + `${deckId}/draw/?count=1`)
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
      fetch(DOC_API + `${deckId}/draw/?count=1`)
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
      fetch(DOC_API + `${deckId}/draw/?count=1`)
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
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
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
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
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
    let insurance = Math.ceil(hand.bet/2)
    let user = getStore().user

    /* shouldnt ask for insurance if player has winning BJ OR if player doesnt have enough money */

    /* OFFER INSURANCE IF DEALER SHOWING ACE */
    if(dealerHand[0].value === "ACE" && hand.score < 21){
      if(user.pot >= insurance){
        dispatch(askForInsurance())
      }
      else {
        dispatch(resolveDealerAce())
      }
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

    fetch(RAILS_API + `users/${user.id}`, {
      method: "PATCH",
      headers: HEADERS,
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
        dispatch(showDealer())
        dispatch(setResult(hand, result))
        dispatch(endRound())
        dispatch(resetBet())
        dispatch(checkPlayerPot())
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
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({
          pot: newPot,
          largest_pot: newPot
         })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
      })
    }
    else if(newPot <= user.largest_pot){
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({
          pot: newPot
         })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
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

    fetch(RAILS_API + `users/${user.id}`, {
      method: "PATCH",
      headers: HEADERS,
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
    setTimeout( () => dispatch({ type: "DEALER_MOVE" }), 500 )
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
       }, 1000)
     }
    }
    // else if(dealerScore <= 17 && dealerHand.find( card => card.value === "ACE")){
    else if(dealerScore < 17){
      if(playerHand.find( hand => hand.result === null )){
        setTimeout( () => {
           dispatch(hittingDealerCards())
           dispatch(dealerMove())
        }, 1000)
      }
    }
    else {
      /* COMPARE EACH OF PLAYER'S HANDS TO DEALER AND DETERMINE OUTCOME */
      setTimeout( () => {
        dispatch(comparePlayerToDealer())
      }, 1000)
    }
  }
}

const comparePlayerToDealer = () => {
  return (dispatch, getStore) => {
    let playerHand = getStore().playerHand
    let dealerScore = getStore().dealerHand.score
    let result
    let winnings = 0;
    let wins = 0;

    playerHand.forEach( hand => {
      if(hand.result === null){
        if(hand.score === dealerScore){
          dispatch(playerPush(hand))
        }
        else if(dealerScore > 21 && hand.score <= 21){
          result = "WIN"
          dispatch(setResult(hand, result))
          dispatch(endRound())
          dispatch(resetBet())

          winnings += (hand.bet * 2)
          wins++
        }
        else if(hand.score > dealerScore && hand.score <= 21){
          result = "WIN"
          dispatch(setResult(hand, result))
          dispatch(endRound())
          dispatch(resetBet())

          winnings += (hand.bet * 2)
          wins++
        }
        else if(hand.score > 21){
          result = "LOSE"
          dispatch(setResult(hand, result))
          dispatch(endRound())
          dispatch(resetBet())
          dispatch(checkPlayerPot())
        }
        else if(hand.score < dealerScore){
          result = "LOSE"
          dispatch(setResult(hand, result))
          dispatch(endRound())
          dispatch(resetBet())
          dispatch(checkPlayerPot())
        }
      }
    })
    if(wins > 0){
      dispatch(playerWins(winnings, wins))
    }
  }
}

/* DOUBLE DOWN RELATED ACTIONS */
export const doublingPlayer = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(DOC_API + `${deckId}/draw/?count=1`)
    .then(res => res.json())
    .then(deck => {
      console.log('Player hits...')

      /* SIMILAR TO HIT ACTION; COPY CURRENT HAND AND ADD NEW CARD, THEN PASS NEW HAND THROUGH */
      let index = getStore().currentHandIndex
      let hand = getStore().playerHand
      let playerHand = hand[index]
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
      dispatch(countingCards(deck.cards))
      if(score <= 21){
        if(index < hand.length - 1){
          dispatch(advanceIndex())
        }
        else {
          dispatch({ type: "DEALER_MOVE" })
          dispatch(showDealer())
          dispatch(dealerMove())
        }
      }
      else {
        dispatch(checkPlayerBust())
      }
      /* PLAYER ONLY GETS ONE CARD WHEN DOUBLING, SO MAKE STAY AFTER */
    })
  }
}

export const doublePlayer = (cards, score, index, bet) => {
  return { type: "DOUBLE_PLAYER", cards, score, index, bet }
}

const splitPlayerCards = (cards, score, index, bet) => {
  return { type: "SPLIT_PLAYER_CARDS", cards, score, index, bet }
}

export const splittingPlayerCards = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(DOC_API + `${deckId}/draw/?count=2`)
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
      dispatch(addToStreak())
      // dispatch(checkPlayerBlackJack())

      /* IF SPLIT ACES, NOT ALLOWED FURTHER ACTIONS */
      if(oldHand[0].value === "ACE"){
        dispatch(showDealer())
        dispatch(dealerMove())
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
    fetch(RAILS_API + `users/${user.id}`, {
      method: "PATCH",
      headers: HEADERS,
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

    fetch(RAILS_API + `users/${user.id}`, {
      method: "PATCH",
      headers: HEADERS,
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

export const playerWins = (winnings, wins) => {
  return (dispatch, getStore) => {
    let user = getStore().user
    // let winnings = (playerHand.bet * 2)
    // let newPot = user.pot + winnings
    // let addedWin = user.wins + 1
    let newPot = user.pot + winnings

    if(newPot > user.largest_pot){
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({
          wins: user.wins + wins,
          pot: newPot,
          largest_pot: newPot })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
      })
    }
    else if(newPot <= user.largest_pot){
      fetch(RAILS_API + `users/${user.id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({
          wins: user.wins + wins,
          pot: newPot })
      })
      .then(res => res.json())
      .then(userObj => {
        dispatch(setUser(userObj))
      })
    }
  }
}

/* IF POT = 0, THEN RENDER NEW GAME BUTTON */
const checkPlayerPot = () => {
  return (dispatch, getStore) => {
    let user = getStore().user

    if(user.pot < 1){
      dispatch(endGame())
    }
  }
}

const shuffleDeck = () => {
  return (dispatch, getStore) => {
    let deckId = getStore().deckId

    fetch(DOC_API + `${deckId}/shuffle/`)
    .then(res => res.json())
    .then(deck => {
      console.log('Deck shuffled')
      /* RESET COUNT ON SHUFFLE */
      dispatch(resetCount())
    })
  }
}

/* RESET USER POT TO 100 AND STREAK TO 0 */
export const restartGame = () => {
  return (dispatch, getStore) => {
    let user = getStore().user

    fetch(RAILS_API + `users/${user.id}`, {
      method: "PATCH",
      headers: HEADERS,
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

const endGame = () => {
  return { type: "GAME_OVER" }
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
