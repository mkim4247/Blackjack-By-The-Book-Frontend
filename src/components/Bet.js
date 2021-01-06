import React from "react";
import { connect } from "react-redux";
import { placingBet } from "../redux/actions";
import PropTypes from "prop-types";

const Bet = (props) => {
  const increaseBet = (event) => {
    let amount = parseInt(event.currentTarget.value);
    if (props.user.pot >= amount) {
      props.placingBet(amount);
    } else {
      return <div id="extra-box">Insufficient Funds</div>;
    }
  };

  return (
    <div id="bet-box">
      {props.roundResult !== "Deal" ? (
        <div>
          <div>
            {props.user.pot >= 1 ? (
              <input
                className="betting-chips"
                type="image"
                src={require("../images/greenchip.svg")}
                onClick={increaseBet}
                value="1"
                alt="Green Chip/1"
              />
            ) : null}
            {props.user.pot >= 5 ? (
              <input
                className="betting-chips"
                type="image"
                src={require("../images/redchip.svg")}
                onClick={increaseBet}
                value="5"
                alt="Red Chip/5"
              />
            ) : null}
          </div>
          <div>
            {props.user.pot >= 25 ? (
              <input
                className="betting-chips"
                type="image"
                src={require("../images/lightbluechip.svg")}
                onClick={increaseBet}
                value="25"
                alt="Light Blue Chip/25"
              />
            ) : null}
            {props.user.pot >= 100 ? (
              <input
                className="betting-chips"
                type="image"
                src={require("../images/blackchip.svg")}
                onClick={increaseBet}
                value="100"
                alt="Black Chip/100"
              />
            ) : null}
          </div>
          {props.user.pot > 1 ? (
            <input
              className="betting-chips"
              type="image"
              src={require("../images/whitechip.svg")}
              onClick={increaseBet}
              value={props.user.pot}
              alt="White Chip/All in"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    roundResult: state.roundResult,
  };
};

export default connect(
  mapStateToProps,
  { placingBet }
)(Bet);

Bet.defaultProps = {
  reservations: [{ start: "", end: "", title: "" }],
};

Bet.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func,
};
