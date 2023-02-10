import APIHandler from "../../../services/api.service";
import { useParams } from "react-router";
import { useState, useEffect, Suspense } from "react";
import { formatDate } from "../../../utils/index";
import { Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import BuyerMatchCard from "../Matches/BuyerMatchCard";
import "../Matches/BuyerMatchCard.css";
import "./Standing.css";
import "./Positions/Positions.css";

const footballAPI = new APIHandler();

function Standings(props) {
  const [matchList, setMatchList] = useState([]);
  const [leagueList, setLeagueList] = useState([]);
  const [nextMatchList, setNextMatchList] = useState([]);
  const [nextMatch, setNextMatch] = useState([]);

  const { country } = useParams();

  let currentDate = new Date().toJSON().slice(5, 7);

  var number;

  if ((country === "argentina") & (currentDate <= 8)) {
    number = 1;
  } else {
    number = 0;
  }

  var qualification;
  if (country === "argentina") {
    qualification = "noquali";
  } else {
    qualification = "qualification";
  }

  // const teamId = leagueList.standings[0];
  const teamId = leagueList.standings?.[0][0].team.id;

  //Positions
  useEffect(() => {
    footballAPI
      .getPositions(country)
      .then((res) => {
        setMatchList(res.data[0].league.standings[number]);
      })
      .catch((err) => console.log(err));
  }, [country]);

  //Nombre de la liga
  useEffect(() => {
    footballAPI
      .getPositions(country)
      .then((res) => {
        setLeagueList(res.data[0].league);
      })
      .catch((err) => console.log(err));
  }, [country]);

  //NextMatches
  useEffect(() => {
    footballAPI
      .getNextMatches(country)
      .then((res) => {
        setNextMatchList(res.data);
        // console.log(res.data, "hola soy res.dalistta");
      })
      .catch((err) => console.log(err));
  }, [country]);

  //MatchCard
  useEffect(() => {
    footballAPI
      .getNextMatch(teamId)
      .then((res) => {
        setNextMatch(res.data);
        // console.log(res.data, "hola soy res.dalistta de teamId");
      })
      .catch((err) => console.log(err));
  }, [teamId]);

  return nextMatchList.length === 0 || leagueList.length === 0 ? (
    <Spinner animation="border" role="status" id="pluswrap">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <div className="standings-container">
        <div className="positions">
          <h2 className="leaguelist-title">
            <img
              src={
                leagueList.name === "Liga Profesional Argentina"
                  ? "https://www.ligaprofesional.ar/wp-content/uploads/2022/04/logo-LPF.png"
                  : leagueList.logo
              }
              alt="Logo"
              className="title-img"
            />
            {leagueList.name === "Liga Profesional Argentina"
              ? "LPF Argentina"
              : leagueList.name}
          </h2>
          <br></br>
          <Table className="tabla-posiciones" bordered hover="sm">
            <thead>
              <tr>
                <th></th>
                <th>Equipo</th>
                <th>PTS</th>
                <th className="positions-results">G</th>
                <th className="positions-results">E</th>
                <th className="positions-results">P</th>
                <th>DG</th>
                <th>PJ</th>
              </tr>
            </thead>
            <tbody>
              {matchList.map((match) => {
                let color = match.description;

                if (color == null) {
                } else if (color.includes("Champions League")) {
                  color = "#007d01ad";
                } else if (color.includes("Europa League")) {
                  color = "#fdff007a";
                } else if (color.includes("Relegation")) {
                  color = "#ff02008f";
                } else if (color.includes("Europa Conference")) {
                  color = "#fea50070";
                }

                return (
                  <tr>
                    <td className="rank" style={{ backgroundColor: color }}>
                      {match.rank}
                    </td>
                    <td>
                      <Link to={`/matches/team/${match.team.name}`}>
                        <span id="team-name-positions">
                          {match.team.name}
                          <img
                            src={match.team.logo}
                            alt={match.team.name}
                            title="LaLiga"
                            style={{ width: "20px", margin: "2px" }}
                          />
                        </span>
                      </Link>
                    </td>
                    <td>{match.points}</td>
                    <td className="positions-results">{match.all.win}</td>
                    <td className="positions-results">{match.all.draw}</td>
                    <td className="positions-results">{match.all.lose}</td>
                    <td>{match.goalsDiff}</td>
                    <td>{match.all.played}</td>
                  </tr>
                );
              })}

              <tr className={qualification}>
                <td style={{ backgroundColor: "#007d01ad" }}></td>
                <td colSpan={7}>Champions League</td>
              </tr>
              <tr className={qualification}>
                <td style={{ backgroundColor: "#fdff007a" }}></td>
                <td colSpan={7}>Europa League</td>
              </tr>
              <tr className={qualification}>
                <td style={{ backgroundColor: "#fea50070" }}></td>
                <td colSpan={7}>Europa Conference</td>
              </tr>
              <tr className={qualification}>
                <td style={{ backgroundColor: "#ff02008f" }}></td>
                <td colSpan={7}>Descenso</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="next-matches">
          <Table bordered>
            <thead>
              <tr>
                <th colSpan={5}>
                  Proximos partidos {nextMatchList[0].league.name}
                </th>
              </tr>
            </thead>

            <tbody>
              {nextMatchList.map((match) => {
                return (
                  <tr>
                    <td>{formatDate(new Date(match?.fixture.date))}</td>
                    <td colSpan={1}>{match.teams.home.name}</td>
                    <td colSpan={1}>{match.teams.away.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div>
            <h4 style={{ marginTop: "40px" }}>
              Partido destacado de la semana
            </h4>
            {nextMatch.map((match) => {
              return <BuyerMatchCard match={match} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Standings;
