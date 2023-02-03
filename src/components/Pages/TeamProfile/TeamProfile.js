import APIHandler from "../../../services/api.service";
import {useState, useEffect} from "react";
import MatchCard from "../TeamProfile/MatchCard/MatchCard";
import {Spinner} from "react-bootstrap";

const teamHandler = new APIHandler();

function TeamProfile(props) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    teamHandler
      .getTeamMatches(props.loggedUser.team_id)
      .then((res) => {
        const updatedMatches = res.data.response;
        updatedMatches.forEach((match) => {
          teamHandler
            .checkMatch(match.fixture.id)
            .then((response) => {
              match.dbInfo = response.data;
            })
            .catch((err) => console.log(err));
        });
        return setMatches(updatedMatches);
      })
      .catch((err) => console.log(err));
  }, [props.loggedUser.team_id]);

  return matches.length === 0 ? (
    <Spinner animation="border" role="status" id="pluswrap">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <h2 className="title" style={{marginTop: "50px"}}>
        {props.loggedUser.username}
      </h2>
      <div className="contenedor">
        {matches.map((match) => (
          <>{<MatchCard match={match} key={match.fixture.id}></MatchCard>}</>
        ))}
      </div>
    </>
  );
}

export default TeamProfile;
