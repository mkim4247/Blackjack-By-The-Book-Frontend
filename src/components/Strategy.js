import React from 'react'
import { connect } from 'react-redux'

class Strategy extends React.Component {
  /* local state for showing advice and count */
  state = {
    showStrategy: false,
    showCount: false
  }

  toggleStrategy = event => {
    this.setState({ showStrategy: !this.state.showStrategy })
  }

  toggleCount = event => {
    this.setState({ showCount: !this.state.showCount })
  }

  checkTable = () => {
    let hardTotal = {
        '2': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Stay",
          15: "Stay",
          14: "Stay",
          13: "Stay",
          12: "Hit",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '3': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Stay",
          15: "Stay",
          14: "Stay",
          13: "Stay",
          12: "Hit",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Double/Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '4': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Stay",
          15: "Stay",
          14: "Stay",
          13: "Stay",
          12: "Stay",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Double/Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '5': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Stay",
          15: "Stay",
          14: "Stay",
          13: "Stay",
          12: "Stay",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Double/Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '6': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Stay",
          15: "Stay",
          14: "Stay",
          13: "Stay",
          12: "Stay",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Double/Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '7': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Hit",
          15: "Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '8': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Hit",
          15: "Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '9': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Surrender/Hit",
          15: "Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Double/Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        '10': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Surrender/Hit",
          15: "Surrender/Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        'JACK': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Surrender/Hit",
          15: "Surrender/Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        'QUEEN': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Surrender/Hit",
          15: "Surrender/Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        'KING': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Surrender/Hit",
          15: "Surrender/Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        },
        'ACE': {
          20: "Stay",
          19: "Stay",
          18: "Stay",
          17: "Stay",
          16: "Surrender/Hit",
          15: "Hit",
          14: "Hit",
          13: "Hit",
          12: "Hit",
          11: "Double/Hit",
          10: "Hit",
          9: "Hit",
          8: "Hit",
          7: "Hit",
          6: "Hit",
          5: "Hit"
        }
      }
    let softTotal = {
      '2': {
        '9': "Stay",
        '8': "Stay",
        '7': "Double/Stay",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      '3': {
        '9': "Stay",
        '8': "Stay",
        '7': "Double/Stay",
        '6': "Double/Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      '4': {
        '9': "Stay",
        '8': "Stay",
        '7': "Double/Stay",
        '6': "Double/Hit",
        '5': "Double/Hit",
        '4': "Double/Hit",
        '3': "Hit",
        '2': "Hit"
      },
      '5': {
        '9': "Stay",
        '8': "Stay",
        '7': "Double/Stay",
        '6': "Double/Hit",
        '5': "Double/Hit",
        '4': "Double/Hit",
        '3': "Double/Hit",
        '2': "Double/Hit"
      },
      '6': {
        '9': "Stay",
        '8': "Double/Stay",
        '7': "Double/Stay",
        '6': "Double/Hit",
        '5': "Double/Hit",
        '4': "Double/Hit",
        '3': "Double/Hit",
        '2': "Double/Hit"
      },
      '7': {
        '9': "Stay",
        '8': "Stay",
        '7': "Stay",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      '8': {
        '9': "Stay",
        '8': "Stay",
        '7': "Stay",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      '9': {
        '9': "Stay",
        '8': "Stay",
        '7': "Hit",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      '10': {
        '9': "Stay",
        '8': "Stay",
        '7': "Hit",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      'JACK': {
        '9': "Stay",
        '8': "Stay",
        '7': "Hit",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      'QUEEN': {
        '9': "Stay",
        '8': "Stay",
        '7': "Hit",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      'KING': {
        '9': "Stay",
        '8': "Stay",
        '7': "Hit",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      },
      'ACE': {
        '9': "Stay",
        '8': "Stay",
        '7': "Hit",
        '6': "Hit",
        '5': "Hit",
        '4': "Hit",
        '3': "Hit",
        '2': "Hit"
      }
    }
    let pairs = {
      '2': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'Double/Hit',
        '4': 'Hit',
        '3': 'Split',
        '2': 'Split'
      },
      '3': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'Double/Hit',
        '4': 'Hit',
        '3': 'Split',
        '2': 'Split'
      },
      '4': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'Double/Hit',
        '4': 'Hit',
        '3': 'Split',
        '2': 'Split'
      },
      '5': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'Double/Hit',
        '4': 'Split',
        '3': 'Split',
        '2': 'Split'
      },
      '6': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Split',
        '6': 'Split',
        '5': 'Double/Hit',
        '4': 'Split',
        '3': 'Split',
        '2': 'Split'
      },
      '7': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Stay',
        '8': 'Split',
        '7': 'Split',
        '6': 'Hit',
        '5': 'Double/Hit',
        '4': 'Hit',
        '3': 'Split',
        '2': 'Split'
      },
      '8': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Double/Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
      },
      '9': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Split',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Double/Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
      },
      '10': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Stay',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
      },
      'JACK': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Stay',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
      },
      'QUEEN': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Stay',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
      },
      'KING': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Stay',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
      },
      'ACE': {
        'ACE': "Split",
        'KING': 'Stay',
        'QUEEN': 'Stay',
        'JACK': 'Stay',
        '10': 'Stay',
        '9': 'Stay',
        '8': 'Split',
        '7': 'Hit',
        '6': 'Hit',
        '5': 'Hit',
        '4': 'Hit',
        '3': 'Hit',
        '2': 'Hit'
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
      <div>
        <button onClick={this.toggleStrategy}> Advice </button>
        {this.state.showStrategy ?
          <div>
            {
              this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0 ?
                this.checkTable() : null
            }
          </div>
          : null
        }
        <button onClick={this.toggleCount}> Count </button>
        <div>
          {this.state.showCount ?
            <div> Count: {this.props.count} </div>
            : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    index: state.currentHandIndex,
    playerHand: state.playerHand,
    dealerHand: state.dealerHand,
    count: state.count
  }
}

export default connect(mapStateToProps)(Strategy)
