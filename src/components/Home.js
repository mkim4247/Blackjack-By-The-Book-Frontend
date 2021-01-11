import React from "react";
import Nav from "./Nav";
import TableContainer from "./TableContainer";
import { connect } from "react-redux";
import { fetchingDeck } from "../redux/actions";
import PropTypes from "prop-types";

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchingDeck();
  }

  render() {
    return (
      <div id="home">
        <Nav />
        <TableContainer />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchingDeck }
)(Home);

Home.defaultProps = {
  reservations: [{ start: "", end: "", title: "" }],
};

Home.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func,
};
