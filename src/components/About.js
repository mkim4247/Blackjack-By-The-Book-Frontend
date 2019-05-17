import React from 'react'
import Nav from './Nav'

class About extends React.Component {
  render(){
    return(
      <div>
      <Nav/>
      <div className='rules'>
        <h1 style={{color: '#FEDD47'}}>
          About:
        </h1>

        <div className='inner-rules'>
          Blackjack By the Book was created to let users learn and/or practice basic strategy.
          <br/>
          <br/>
          This game uses 6 decks of cards and has the dealer hit on Soft 17, like most casinos. The recommended advice is based on both of these conditions. The game also calculates a running count using the HiLo method. Users may choose to hide or show the count and advice whenever they choose. Once around half the deck has been played, it will automatically reshuffle and the count resets.
          <br/>
          <br/>
          Please reach out if you find any bugs or issues with the game, or if you have any recommendations for ways to improve it!
          <br/>
          <hr/>
          Resources:
          <br/>
          Thanks to "Deck of Cards API"
            <ul>
              <li>
                <a href='https://deckofcardsapi.com/'>
                  Deck of Cards
                </a>
              </li>
            </ul>
          Game rules and strategy reviewed from "wikipedia" and "pagat"
            <ul>
              <li>
                <a href='https://en.wikipedia.org/wiki/Blackjack'>
                  Wikipedia
                </a>
              </li>
              <li>
                <a href='https://www.pagat.com/banking/blackjack.html'>
                  Pagat
                </a>
              </li>
            </ul>
          Credits for Artwork from "freepik" and "koralheim" on "OpenGameArt."
            <ul>
              <li>
                <a href="https://www.freepik.com/free-photos-vectors/background">
                  freepik
                </a>
              </li>
              <li>
                <a href="https://www.opengameart.org/users/koralheim">
                  OpenGameArt - koralheim
                </a>
              </li>
              <li>
                Ace Card Icon made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default About
