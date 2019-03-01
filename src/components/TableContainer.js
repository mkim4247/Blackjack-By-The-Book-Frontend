import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import { connect } from 'react-redux'
import Strategy from './Strategy'
import Bet from './Bet'
import Pot from './Pot'
import Stats from './Stats'
import { Grid } from 'semantic-ui-react'

class TableContainer extends React.Component {

  render(){
    return(
      <div id='table'>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={4}>
              <Stats />
            </Grid.Column>
            <Grid.Column width={8}>
              <DealerContainer />
            </Grid.Column>
            <Grid.Column width={4}>
              <Strategy/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <Controls />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <PlayerContainer />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column width={4}>

              <div>
                {this.props.insurance === 'LOST' || this.props.insurance === 'WON' ?
                  <div>
                    Insurance {this.props.insurance}
                  </div>
                  : null
                }
                <Bet />
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div></div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Pot />
              <div>
                {this.props.roundResult !== "Start" && this.props.roundResult !== "Deal" ?
                  <div>
                    {this.props.roundResult}
                  </div>
                  : null
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    roundResult: state.roundResult,
    insurance: state.insurance
  }
}

export default connect(mapStateToProps)(TableContainer)
