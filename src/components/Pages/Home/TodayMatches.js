import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./SearchBar/SearchBar.css";

function TodayMatches() {
  const [teamName, setTeamName] = useState("");

  const handleChange = (e) => {
    setTeamName(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="r18-container">
        <div className="r18-items">
          <div className="r18-time">
            <div className="r18-hour">11:00</div>
            <div className="r18-text">
              <span>Mièrcoles</span>
              <span>11 julio</span>
            </div>
            <div className="r18-text">
              <span>2</span>
              <span>Semifinal</span>
            </div>
          </div>

          <div className="r18-separator"></div>

          <div className="r18-columns">
            <div className="r18-team-l" data-score="1">
              <span className="r18-name">Croacia</span>
              <span className="flag-icon flag-icon-hr"></span>
              <span className="r18-score">2</span>
            </div>
            <div className="r18-team-r" data-score="2">
              <span className="r18-score">1</span>
              <span className="flag-icon flag-icon-gb"></span>
              <span className="r18-name">Inglaterra</span>
            </div>
          </div>
        </div>

        <div className="r18-items">
          <div className="r18-time">
            <div className="r18-hour">11:00</div>
            <div className="r18-text">
              <span>Sabado</span>
              <span>14 julio</span>
            </div>
            <div className="r18-text">
              <span>3º y 4º</span>
              <span>Lugar</span>
            </div>
          </div>

          <div className="r18-separator"></div>

          <div className="r18-columns">
            <div className="r18-team-l" data-score="1">
              <span className="r18-name">Bèlgica</span>
              <span className="flag-icon flag-icon-be"></span>
              <span className="r18-score">2</span>
            </div>
            <div className="r18-team-r" data-score="2">
              <span className="r18-score">0</span>
              <span className="flag-icon flag-icon-gb"></span>
              <span className="r18-name">Inglaterra</span>
            </div>
          </div>
        </div>

        <div className="r18-items">
          <div className="r18-time">
            <div className="r18-hour">11:00</div>
            <div className="r18-text">
              <span>Domingo</span>
              <span>15 julio</span>
            </div>
            <div className="r18-text">
              <span>Gran</span>
              <span>Final</span>
            </div>
          </div>

          <div className="r18-separator"></div>

          <div className="r18-columns">
            <div className="r18-team-l" data-score="1">
              <span className="r18-name">Francia</span>
              <span className="flag-icon flag-icon-fr"></span>
              <span className="r18-score">4</span>
            </div>
            <div className="r18-team-r" data-score="2">
              <span className="r18-score">2</span>
              <span className="flag-icon flag-icon-hr"></span>
              <span className="r18-name">Croacia</span>
            </div>
          </div>
        </div>
      </div>
    w</>
  );
}

export default TodayMatches;
