import React from 'react'
import { connect } from 'react-redux'

class Strategy extends React.Component {
  /* local state for showing advice and count */
  state = {
    showInfo: true
  }

  toggleInfo = event => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  renderInfo = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <div>
          <br/>
          <div>
            <div>
              {this.props.showDealer ?
                <span>
                  Dealer has {this.props.dealerHand.score}.
                </span>
                :
                <span>
                  Dealer showing {this.props.dealerHand.cards[0].value}.
              </span>
              }
            </div>

            <div>
              You have {this.props.playerHand[this.props.index].score}.
              <br/>
              {this.props.playerHand[this.props.index].score < 21 && !this.props.showDealer ?
              <span> You should {this.checkTable()}. </span>
              : null
            }
            </div>

          </div>

          <hr/>
          <br/>

          {this.props.roundResult === "End" ?
            <div>
              Count: {this.props.count}
              <div>
                {this.checkCount()}
              </div>
            </div>
            : null
          }


        </div>
      )
    }
  }

  checkCount = () => {
    if(this.props.count > 0){
      return(
        <div>
          The count is positive.
          <br/>
          Bet HIGH.
        </div>
      )
    }
    else if(this.props.count < 0){
      return(
        <div>
          The count is negative.
          <br/>
          Bet LOW.
        </div>
      )
    }
    else if(this.props.count === 0){
      return(
        <div>
          The count is zero.
        </div>
      )
    }
  }

  checkTable = () => {
    let hardTotal = {
        '2': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "STAY",
          15: "STAY",
          14: "STAY",
          13: "STAY",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '3': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "STAY",
          15: "STAY",
          14: "STAY",
          13: "STAY",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "DOUBLE if able to OR HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '4': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "STAY",
          15: "STAY",
          14: "STAY",
          13: "STAY",
          12: "STAY",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "DOUBLE if able to OR HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '5': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "STAY",
          15: "STAY",
          14: "STAY",
          13: "STAY",
          12: "STAY",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "DOUBLE if able to OR HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '6': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "STAY",
          15: "STAY",
          14: "STAY",
          13: "STAY",
          12: "STAY",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "DOUBLE if able to OR HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '7': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "HIT",
          15: "HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '8': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "HIT",
          15: "HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '9': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "SURRENDER if able to OR HIT",
          15: "HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "DOUBLE if able to OR HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        '10': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "SURRENDER if able to OR HIT",
          15: "SURRENDER if able to OR HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        'JACK': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "SURRENDER if able to OR HIT",
          15: "SURRENDER if able to OR HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        'QUEEN': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "SURRENDER if able to OR HIT",
          15: "SURRENDER if able to OR HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        'KING': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "SURRENDER if able to OR HIT",
          15: "SURRENDER if able to OR HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        },
        'ACE': {
          20: "STAY",
          19: "STAY",
          18: "STAY",
          17: "STAY",
          16: "SURRENDER if able to OR HIT",
          15: "HIT",
          14: "HIT",
          13: "HIT",
          12: "HIT",
          11: "DOUBLE if able to OR HIT",
          10: "HIT",
          9: "HIT",
          8: "HIT",
          7: "HIT",
          6: "HIT",
          5: "HIT"
        }
      }
    let softTotal = {
      '2': {
        '9': "STAY",
        '8': "STAY",
        '7': "DOUBLE if able to OR STAY",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      '3': {
        '9': "STAY",
        '8': "STAY",
        '7': "DOUBLE if able to OR STAY",
        '6': "DOUBLE if able to OR HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      '4': {
        '9': "STAY",
        '8': "STAY",
        '7': "DOUBLE if able to OR STAY",
        '6': "DOUBLE if able to OR HIT",
        '5': "DOUBLE if able to OR HIT",
        '4': "DOUBLE if able to OR HIT",
        '3': "HIT",
        '2': "HIT"
      },
      '5': {
        '9': "STAY",
        '8': "STAY",
        '7': "DOUBLE if able to OR STAY",
        '6': "DOUBLE if able to OR HIT",
        '5': "DOUBLE if able to OR HIT",
        '4': "DOUBLE if able to OR HIT",
        '3': "DOUBLE if able to OR HIT",
        '2': "DOUBLE if able to OR HIT"
      },
      '6': {
        '9': "STAY",
        '8': "DOUBLE if able to OR STAY",
        '7': "DOUBLE if able to OR STAY",
        '6': "DOUBLE if able to OR HIT",
        '5': "DOUBLE if able to OR HIT",
        '4': "DOUBLE if able to OR HIT",
        '3': "DOUBLE if able to OR HIT",
        '2': "DOUBLE if able to OR HIT"
      },
      '7': {
        '9': "STAY",
        '8': "STAY",
        '7': "STAY",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      '8': {
        '9': "STAY",
        '8': "STAY",
        '7': "STAY",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      '9': {
        '9': "STAY",
        '8': "STAY",
        '7': "HIT",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      '10': {
        '9': "STAY",
        '8': "STAY",
        '7': "HIT",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      'JACK': {
        '9': "STAY",
        '8': "STAY",
        '7': "HIT",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      'QUEEN': {
        '9': "STAY",
        '8': "STAY",
        '7': "HIT",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      'KING': {
        '9': "STAY",
        '8': "STAY",
        '7': "HIT",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      },
      'ACE': {
        '9': "STAY",
        '8': "STAY",
        '7': "HIT",
        '6': "HIT",
        '5': "HIT",
        '4': "HIT",
        '3': "HIT",
        '2': "HIT"
      }
    }
    let pairs = {
      '2': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'HIT',
        '3': 'Split',
        '2': 'Split'
      },
      '3': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'HIT',
        '3': 'Split',
        '2': 'Split'
      },
      '4': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'HIT',
        '3': 'Split',
        '2': 'Split'
      },
      '5': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'Split',
        '3': 'Split',
        '2': 'Split'
      },
      '6': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'Split',
        '3': 'Split',
        '2': 'Split'
      },
      '7': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'STAY',
        '8': 'Split',
        '7': 'Split',
        '6': 'HIT',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'HIT',
        '3': 'Split',
        '2': 'Split'
      },
      '8': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      },
      '9': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'Split',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'DOUBLE if able to OR HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      },
      '10': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'STAY',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      },
      'JACK': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'STAY',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      },
      'QUEEN': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'STAY',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      },
      'KING': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'STAY',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      },
      'ACE': {
        'ACE': "Split",
        'KING': 'STAY',
        'QUEEN': 'STAY',
        'JACK': 'STAY',
        '10': 'STAY',
        '9': 'STAY',
        '8': 'Split',
        '7': 'HIT',
        '6': 'HIT',
        '5': 'HIT',
        '4': 'HIT',
        '3': 'HIT',
        '2': 'HIT'
      }
    }

    let currentHand = this.props.playerHand[this.props.index]
    let dealerCard = this.props.dealerHand.cards[0]

    if(currentHand.cards[0].value === currentHand.cards[1].value){
      return pairs[dealerCard.value][currentHand.cards[0].value]
    }
    else if(currentHand.cards[0].value === "ACE" || currentHand.cards[1].value === "ACE"){
      let otherCard = currentHand.cards.find( card => card.value !== "ACE")

      return softTotal[dealerCard.value][otherCard.value]
    }
    else {
      return hardTotal[dealerCard.value][currentHand.score]
    }

  }

  render(){
    return(
      <div id='strategy-box'>
        <button onClick={this.toggleInfo}>
          {this.state.showInfo ?
            "Hide Info" : "Show Info"
          }
        </button>

        {this.state.showInfo ?
          this.renderInfo() : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    index: state.currentHandIndex,
    playerHand: state.playerHand,
    dealerHand: state.dealerHand,
    count: state.count,
    showDealer: state.showDealer,
    roundResult: state.roundResult
  }
}

export default connect(mapStateToProps)(Strategy)
