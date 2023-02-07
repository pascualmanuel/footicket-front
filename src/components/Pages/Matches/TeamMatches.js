import { useState, useEffect } from "react";
import { useParams } from "react-router";
import APIHandler from "../../../services/api.service";
import BuyerMatchCard from "./BuyerMatchCard";
import { Spinner } from "react-bootstrap";
import "../../Styles/styles.css";
import { useHistory } from "react-router-dom";
import Home from "../Home/Home";
import SearchBar from "../Home/SearchBar/SearchBar";
const teamHandler = new APIHandler();

function TeamMatches() {
  const { teamName } = useParams();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    teamHandler
      .getTeamId(teamName)

      .then((res) => {
        return teamHandler.getTeamMatches(res.data);
      })
      .then((res) => {
        setMatches(res.data.response);
      })
      .catch((err) => console.log(err));
  }, [teamName]);

  const [teams, setTeamInfo] = useState([]);

  useEffect(() => {
    teamHandler
      .getTeamInfo(teamName)

      .then((res) => {
        setTeamInfo(res.data.response[0]);
      })
      .catch((err) => console.log(err));
  }, [teamName]);

  const history = useHistory();

  if (teams === undefined) {
    return (
      <>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="box-no-matches">
            <p className="p-no-matches">
              No se han encontrado partidos para: {teamName}
            </p>
          </div>
        </div> */}
        {/* <SearchBar mandando={`No se han encontrado partidos para: ${teamName}`}/> */}
        hola
      </>
    );
  }

  return matches.length === 0 || teams.length === 0 ? (
    <>
      <Spinner animation="border" role="status" id="pluswrap">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  ) : (
    <>
      <br></br>
      <div className="logo-contenedor">
        <div className="logo-radius">
          <img src={teams?.team.logo} alt="Logo" className="title-img" />
        </div>
        <h2 style={{ marginLeft: "15px" }}>{teamName}</h2>
      </div>
      <br></br>

      <div className="container">
        {matches.map((match) => {
          return <BuyerMatchCard match={match} />;
        })}
      </div>
    </>
  );
}

export default TeamMatches;
