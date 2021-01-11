import React from "react";
import DealerContainer from "./DealerContainer";
import PlayerContainer from "./PlayerContainer";
import TurnControls from "./TurnControls";
import Info from "./Info";
import Bet from "./Bet";
import Pot from "./Pot";
import RoundControls from "./RoundControls";
import Footer from "./Footer";

const TableContainer = () => {
  return (
    <div id="table">
      <DealerContainer />
      <Info />
      <TurnControls />
      <PlayerContainer />
      <Bet />
      <Pot />
      <RoundControls />
      <Footer />
    </div>
  );
};

export default TableContainer;
