import React from 'react'
import Nav from './Nav'

class Rules extends React.Component {
  render(){
    return(
      <div>
      <Nav />
      <div id='rules'>
      <h2>
        How to Play:
      </h2>
      <div>
        Blackjack is a card game played between players and a dealer. Each player goes in turn, comparing their cards against the dealer, but not against other players. The goal of Blackjack is to beat the dealer; this can be done in a number of ways:
      </div>

      <ul>
        <li>
          Getting a Blackjack (21 points) with your first two cards (an Ace and either a 10 or Facecard). If the dealer also has a Blackjack, it's a tie.
        </li>
        <li>
          Ending with a final score higher than the dealer, without going over 21 points (busting).
        </li>
        <li>
          Letting the dealer draw additional cards and going over 21 points.
        </li>
      </ul>

      <div>
        Gameplay:
      </div>
      <div>
          At the beginning of each round, players are each dealt two cards. The dealer is also dealt two cards, normally with only one shown face up, and the other hidden face down.
        <br/>
          The value of each card from 2 through 10 is their numerical value. Facecards (Jack, Queen, and King) are each worth 10, while Aces can be worth either 1 or 11. The value of a player's hand is the sum of these card values.
        <br/>
           After the initial cards have been dealt, players have several options:
        <br/>
        <ul>
          <li>
            Hit: Draw another card to improve your hand.
            <br/>
            Usually signaled by tapping the table with your finger or waving your hand toward your body.
          </li>
          <li>
            Stand/Stay: Choose not to take any additional cards. End your turn.
            <br/>
            Usually signaled by waving your hand horizontally
          </li>
          <li>
            Double down: In exchange for committing to stay after receiving only one more card, you may increase your initial bet by up to 100%. Some games do not permit increasing the bet by amounts other than 100%.
            <br/>
            Usually signaled by placing additional chips beside the original bet and pointing with one finger.
          </li>
          <li>
            Split: If the first two cards in a hand have the same value, you may split them into two separate hands by placing a second bet equal to the first. The dealer will draw an additional card for each new hand, placing one bet with each hand. You then play out the two hands in turn, with each treated independently: you win or lose their wager separately.
            <br/>
            There may be some restrictions when splitting:
            <ul>
              <li>
                Doubling and further splitting may not be allowed.
              </li>
              <li>
                An Ace and 10 value card is not considered a "natural" Blackjack. It is counted as a regular 21. Additionally, hitting after splitting aces is usually not allowed.
              </li>
            </ul>
            <br/>
            Usually signaled by placing additional chips next to the original bet and pointing with two fingers spread into a V formation.
          </li>

          <li>
            Surrender: Most casinos will allow this option. It is only available as the first decision of a hand. When you surrender, the house takes half of your bet and returns the other half. This ends your stake in the hand.
            <br/>
            The request to surrender is made verbally, there is no standard hand signal.
          </li>
        </ul>
        <br/>
        After a player's turn has ended, play proceeds to the next player, clockwise around the table. When the last hand has finished being played, the dealer reveals their "hole" card, and stands or draws additional cards according to the rules of the game for the dealer. Once the outcome of the dealer's hand is established, any hands with bets remaining on the table are resolved. Bets on losing hands are forfeited, bets on a push are left on the table, and winners are paid out.
      </div>


      Insurance
      If the dealer's upcard is an ace, the player is offered the option of taking "insurance" before the dealer checks the hole card.

      Insurance is a side bet that the dealer has blackjack and is treated independently of the main wager. It pays 2:1 (meaning that the player receives two dollars for every dollar bet) and is available when the dealer's exposed card is an ace. The idea is that the dealer's second card has a fairly high probability (nearly one-third) to be ten-valued, giving the dealer blackjack and disappointment for the player. It is attractive (although not necessarily wise) for the player to insure against the possibility of a dealer blackjack by making a maximum "insurance" bet, in which case the "insurance proceeds" will make up for the concomitant loss on the original bet. The player may add up to half the value of their original bet to the insurance and these extra chips are placed on a portion of the table usually marked "Insurance pays 2 to 1".

      Players with a blackjack may also take insurance, and in taking maximum insurance they commit themselves to winning an amount exactly equal to their main wager, regardless of the dealer's outcome. Fully insuring a blackjack against blackjack is thus referred to as "taking even money", and paid out immediately, before the dealer's hand is resolved; the players do not need to place more chips for the insurance wager.

      Insurance bets are expected to lose money in the long run, because the dealer is likely to have blackjack less than one-third of the time. However the insurance outcome is strongly anti-correlated with that of the main wager, and if the player's priority is to reduce variation, they might choose to pay for this.

      Furthermore, the insurance bet is susceptible to advantage play. It is advantageous to make an insurance bet whenever the hole card has more than a chance of one in three of being a ten. Advantage play techniques can sometimes identify such situations. In a multi-hand, face-up, single deck game, it is possible to establish whether insurance is a good bet simply by observing the other cards on the table after the deal; even if there are just 2 player hands exposed, and neither of their two initial cards is a ten, then 16 in 47 of the remaining cards are tens, which is larger than 1 in 3, so insurance is a profitable bet. This is an elementary example of the family of advantage play techniques known as card counting.

      Bets to insure against blackjack are slightly less likely to be advantageous than insurance bets in general, since the ten in the player's blackjack makes it less likely that the dealer has blackjack too.[6]


A hand with an ace valued as 11 is called "soft", meaning that the hand will not bust by taking an additional card; the value of the ace will become one to prevent the hand from exceeding 21. Otherwise, the hand is "hard"

Once all the players have completed their hands, it is the dealer’s turn. The dealer hand will not be completed if all players have either busted or received blackjacks. The dealer then reveals the hidden card and must hit until the cards total 17 or more points. (At most tables the dealer also hits on a "soft" 17, i.e. a hand containing an ace and one or more other cards totaling six.) Players win by not busting and having a total higher than the dealer, or not busting and having the dealer bust, or getting a blackjack without the dealer getting a blackjack. If the player and dealer have the same total (not counting blackjacks), this is called a "push", and the player typically does not win or lose money on that hand. Otherwise, the dealer wins.
        Blackjack is usually played with one or more decks of 52 cards.
      </div>

      </div>
    )
  }

}

export default Rules
