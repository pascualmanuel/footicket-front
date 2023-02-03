import {Card, ListGroup, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import APIHandler from "../../../services/api.service";
import "./BuyerMatchCard.css";
import {formatDate} from "../../../utils/index";

function BuyerMatchCard(props) {
  const match = props.match;
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  const matchService = new APIHandler();

  useEffect(() => {
    matchService
      .checkMatch(match.fixture.id)
      .then((res) => {
        setCapacity(res.data[0].capacity);
        setPrice(res.data[0].price);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(match, "soy console.logde matchs");

  return match === 0 ? (
    <>
      <Spinner animation="border" role="status" id="pluswrap">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  ) : (
    <>
      {
        <Card style={{width: "18rem", margin: "20px"}}>
          <Card.Body>
            <Card.Title>
              <p className="vs">
                <Link to={`/matches/team/${match?.teams.home.name}`}>
                  <img
                    src={match?.teams.home.logo}
                    alt="hola"
                    className="team-logo"
                  />
                  {match?.teams.home.name}
                </Link>
              </p>
              <p className="vs">
                <Link to={`/matches/team/${match?.teams.away.name}`}>
                  <img
                    src={match?.teams.away.logo}
                    alt="hola"
                    className="team-logo"
                  />
                  {match?.teams.away.name}
                </Link>
              </p>
              <p className="more-info">
                {formatDate(new Date(match?.fixture.date))}
              </p>
              <p className="more-info">{match?.league.name}</p>
              <p className="more-info">{match?.fixture.venue.name}</p>
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush"></ListGroup>
          <Card.Body>
            {capacity !== 0 ? (
              <Card.Text>
                <p className="precio"> Precio €{price}</p>
                <br></br>
                <Card.Link>
                  <Link
                    className="button-details"
                    to={{
                      pathname: "/match/details",
                      state: {
                        match: match,
                      },
                    }}
                  >
                    Entradas
                  </Link>
                </Card.Link>
              </Card.Text>
            ) : (
              <>
                <br></br>
                <br></br>
                <p className="button-avisame">No hay entradas disponibles</p>
              </>
            )}
          </Card.Body>
        </Card>
      }
    </>
  );
}

export default BuyerMatchCard;
