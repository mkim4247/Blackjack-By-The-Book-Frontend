import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import { connect } from 'react-redux'
import Strategy from './Strategy'
import Bet from './Bet'
import Pot from './Pot'
import { Grid } from 'semantic-ui-react'

class TableContainer extends React.Component {

  render(){
    return(
      <div id='table'>
      Table Container
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={4}>
            <div>
                Placeholder 
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <DealerContainer />
            <Pot />
            <Controls />
            <PlayerContainer />
            <Bet />
            <div>
              {this.props.roundResult !== "start" ?
                <div>
                  {this.props.roundResult}
                </div>
                : null
              }
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <Strategy/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    roundResult: state.roundResult
  }
}

export default connect(mapStateToProps)(TableContainer)
