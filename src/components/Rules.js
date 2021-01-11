import React from "react";
import Nav from "./Nav";

const Rules = () => {
  return (
    <div>
      <Nav />
      <div className="rules">
        <h1 style={{ color: "#FEDD47" }}>How to Play:</h1>
        <div className="inner-rules">
          In Blackjack, players take turns comparing their cards against the
          dealer, but not against other players. The goal is to beat the dealer
          in one of the following ways:
          <ul>
            <li>
              Get a Blackjack (21 points) with your first two cards (an Ace and
              either a 10 or Facecard). If the dealer also has a Blackjack, it's
              a tie.
            </li>
            <li>
              End with a final score higher than the dealer, without going over
              21 points (busting).
            </li>
            <li>
              Let the dealer bust by drawing additional cards and going over 21
              points.
            </li>
          </ul>
          <hr />
          <div>
            At the start of the round, players and the dealer are each dealt two
            cards. Cards from 2 through 10 are worth their numerical value;
            Facecards (Jack, Queen, and King) are worth 10; and Aces can be
            worth either 1 or 11. The value of a player's hand is the sum of
            their cards values.
            <br />
            <br />
            After the initial cards have been dealt, players have several
            options:
            <ul>
              <li>Hit: Draw another card to increase your hand's value.</li>
              <li>
                Stand/Stay: Choose to not take any more cards and end your turn.
              </li>
              <li>
                Double Down: In exchange for increasing your initial bet by up
                to 100%, you must stay after receiving only one more card.
              </li>
              <li>
                Split: If the first two cards in your hand have the same value,
                you may split them into two separate hands. You receive an
                additional card for each new hand, but must place a second bet
                equal to the initial bet on your second hand. You then play out
                the two hands in turn, independently: you win or lose their
                wager separately.
                <br />
                There may be some restrictions when splitting:
                <ul>
                  <li>Doubling and further splitting may not be allowed.</li>
                  <li>
                    An Ace and 10 value card is not considered a "natural"
                    Blackjack. It is counted as a regular 21. Additionally,
                    hitting after splitting aces is usually not allowed.
                  </li>
                </ul>
              </li>
              <li>
                Surrender: Most casinos will allow this option. It is only
                available as your first action after the initial deal. When you
                surrender, the house takes half of your bet and returns the
                other half. This ends your stake in the hand.
              </li>
            </ul>
          </div>
          <br />
          <div>
            Once all the players have gone, the dealer takes their turn,
            revealing their facedown card and resolving their hand. The dealer
            must hit until their cards total 17 or more points, unless all the
            players have either busted or received Blackjacks.
            <ul>
              <li>
                At most tables the dealer also hits on "soft" 17, or a hand
                containing an Ace and one or more other cards totaling six. In
                general, a hand with an Ace valued as 11 is called "soft,"
                meaning that it will not bust by taking another card because the
                value of the Ace will become 1 to prevent the hand from
                exceeding 21. Otherwise, the hand is called "hard."
              </li>
            </ul>
            <br />
            Once the dealer has finished their turn according to the game's
            rules, any remaining player hands are settled. Bets on losing hands
            are forfeited, bets on ties are left on the table, and winners are
            paid out.
          </div>
          <br />
          <div>
            Players win by not busting and having a total higher than the
            dealer, by not busting and letting the dealer bust, or by getting a
            Blackjack without the dealer getting a Blackjack. If the player and
            dealer have the same total, this is called a "push", and the player
            typically does not win or lose money on that hand. Otherwise, the
            dealer wins.
          </div>
          <br />
          <hr />
          <div>
            Insurance:
            <br />
            <div>
              If the dealer's face up card is an Ace, players are offered the
              option of taking "insurance" before the dealer checks the facedown
              card. Insurance is a side bet that the dealer has Blackjack, and
              is treated independently of the main wager. It pays 2:1, and
              players may bet up to half of their initial bet on insurance.
            </div>
          </div>
          <br />
          <hr />
          <div>
            Counting Cards:
            <br />
            <div>
              While it does not guarantee the player will win, counting cards
              can provide a mathematical advantage over the dealer. The basic
              idea is that low cards are generally favorable for the dealer,
              while high cards favor the player. A few reasons for this are:
              <ul>
                <li>
                  Players are paid 1.5 times their bet for a Blackjack, whereas
                  the dealer only receives the player's bet when they have a
                  Blackjack.
                </li>
                <li>
                  Dealers are required to continue drawing cards until they
                  reach a total of 17. Because of this, small cards are less
                  likely to cause the dealer to bust, while big cards cause the
                  dealer to bust more often.
                </li>
                <li>
                  Doubling becomes more beneficial when there are more 10 value
                  cards and Aces left in the deck.
                </li>
              </ul>
              <div>
                Instead of trying to remember every card that's been dealt,
                counting cards usually utilizes a ratio system that offsets
                cards that are favorable for the player against cards that are
                not.
              </div>
              <div>
                The most commonly used system is the HiLo Count, which places
                values on cards:
                <ul>
                  <li>High cards, (10, J, Q, K, A): -1</li>
                  <li>Medium cards, (7, 8, 9): 0</li>
                  <li>Low cards, (2, 3, 4, 5, 6): +1</li>
                </ul>
              </div>
              <div>
                The player starts counting at 0, and adds one whenever a low
                card is dealt or subtracts one whenever a high card is dealt.
                This is called the "Running Count." When the Running Count is
                positive, the player knows that there are more favorable cards
                remaining.
              </div>
              <br />
              <div>
                Multiple decks will make a difference in how much impact a
                positive Running Count has to the player advantage. In this
                scenario, players will need to calculate the "True Count" by
                dividing the Running Count by the number of decks remaining to
                be dealt.
              </div>
              <br />
              <div>
                The player can use the count to vary their bet and playing
                strategy. Deviating from basic strategy is far less important
                than placing big bets when the count is high and low bets when
                the count is low/negative.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
