import React from "react";
import { connect } from "react-redux";
import {
  dealingCards,
  surrenderingPlayer,
  restartGame,
} from "../redux/actions";
import PropTypes from "prop-types";

const RoundControls = (props) => {
  /* can only surrender on initial deal (not after splitting) */
  const showSurrender = () => {
    if (
      props.playerHand.length < 2 &&
      props.playerHand[props.index] &&
      props.playerHand[props.index].cards.length === 2 &&
      !props.showDealer &&
      props.roundResult !== "End"
    ) {
      return (
        <button className="control-btns" onClick={props.surrenderingPlayer}>
          Surrender
        </button>
      );
    }
  };

  return (
    <div id="extra-box">
      {props.bet > 0 && props.roundResult !== "Deal" && props.deckId ? (
        <button className="control-btns" onClick={props.dealingCards}>
          Deal
        </button>
      ) : null}
      {props.insurance !== "ask" ? showSurrender() : null}
      {props.gameOver ? (
        <button className="control-btns" onClick={props.restartGame}>
          New Game
        </button>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    insurance: state.insurance,
    roundResult: state.roundResult,
    bet: state.bet,
    playerHand: state.playerHand,
    index: state.currentHandIndex,
    showDealer: state.showDealer,
    gameOver: state.gameOver,
    deckId: state.deckId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dealingCards: () => dispatch(dealingCards()),
    surrenderingPlayer: () => dispatch(surrenderingPlayer()),
    restartGame: () => dispatch(restartGame()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundControls);

RoundControls.defaultProps = {
  reservations: [{ start: "", end: "", title: "" }],
};

RoundControls.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func,
};
