import APIHandler from "../../../../services/api.service";
import {useParams} from "react-router";
import {useState, useEffect} from "react";
import {Spinner, Table} from "react-bootstrap";
import "./Positions.css";
import {Link} from "react-router-dom";
// import NextMatches from "../NextMatches/NextMatches";
// import Example from "../../Offcanvas/Example";

const footballAPI = new APIHandler();
function Positions() {
  const [matchList, setMatchList] = useState([]);
  const [leagueList, setLeagueList] = useState([]);

  const {country} = useParams();

  useEffect(() => {
    footballAPI
      .getPositions(country)
      .then((res) => {
        setMatchList(res.data[0].league.standings[0]);
      })
      .catch((err) => console.log(err));
  }, [country]);

  useEffect(() => {
    footballAPI
      .getPositions(country)
      .then((res) => {
        setLeagueList(res.data[0].league);
      })
      .catch((err) => console.log(err));
  }, [country]);

  console.log(leagueList.name, "leagueList.name");

  // console.log(matchList, "prueba");

  return matchList.length === 0 ? (
    <Spinner animation="border" role="status" id="pluswrap">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <h2>
        <img
          src={
            leagueList.name === "Liga Profesional Argentina"
              ? "https://www.ligaprofesional.ar/wp-content/uploads/2022/04/logo-LPF.png"
              : leagueList.logo
          }
          alt="Logo"
          className="title-img"
        />
        {leagueList.name}
      </h2>
      <br></br>
      <Table className="tabla-posiciones" bordered hover="sm">
        <thead>
          <tr>
            <th></th>
            <th>Equipo</th>
            <th>PTS</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
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
                <td className="rank" style={{backgroundColor: color}}>
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
                        style={{width: "20px", margin: "2px"}}
                      />
                    </span>
                  </Link>
                </td>
                <td>{match.points}</td>
                <td>{match.all.win}</td>
                <td>{match.all.draw}</td>
                <td>{match.all.lose}</td>
                <td>{match.goalsDiff}</td>
                <td>{match.all.played}</td>
              </tr>
            );
          })}

          <tr className="qualification">
            <td style={{backgroundColor: "#007d01ad"}}></td>
            <td colSpan={7}>Champions League</td>
          </tr>
          <tr className="qualification">
            <td style={{backgroundColor: "#fdff007a"}}></td>
            <td colSpan={7}>Europa League</td>
          </tr>
          <tr className="qualification">
            <td style={{backgroundColor: "#fea50070"}}></td>
            <td colSpan={7}>Europa Conference</td>
          </tr>
          <tr className="qualification">
            <td style={{backgroundColor: "#ff02008f"}}></td>
            <td colSpan={7}>Descenso</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
export default Positions;
