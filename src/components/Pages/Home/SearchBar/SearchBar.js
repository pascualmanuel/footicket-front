import React, {useState} from "react";
import {Link} from "react-router-dom";
import TodayMatches from "../TodayMatches";
import "./SearchBar.css";

function SearchBar() {
  const [teamName, setTeamName] = useState("");

  const handleChange = (e) => {
    setTeamName(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="s006">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <strong>Buscá tu entrada por Equipo o Selección Nacional </strong>
            </legend>
            <div className="inner-form">
              <div className="input-field">
                <Link to={`/matches/team/${teamName}`}>
                  <button
                    className="btn-search"
                    id="myBtn"
                    onSubmit={handleSubmit}
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                  </button>
                </Link>
                <input
                  id="search"
                  type="text"
                  placeholder="Real Madrid / Argentina"
                  name="teamName"
                  value={teamName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>
          <br></br>

          {/* <TodayMatches /> */}

          <Link to={`/league/wc`}>
            <div className="button-50" role="button">
              2022 Fifa World Cup
            </div>
          </Link>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
