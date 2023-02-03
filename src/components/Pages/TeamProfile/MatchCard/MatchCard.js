import {useState, useEffect} from "react";
import {formatDate} from "../../../../utils";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import APIHandler from "../../../../services/api.service";
import {useHistory} from "react-router-dom";

function TeamProfile(props) {
  const teamProfileService = new APIHandler();

  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (props.match.dbInfo) {
      if (props.match.dbInfo?.length !== 0) {
        setCapacity(props.match.dbInfo[0].capacity);
        setPrice(props.match.dbInfo[0].price);
      }
    }
  }, [props.match]);

  const handleClick = (e, operation) => {
    if (operation === "add") {
      setCapacity(Number(capacity) + 1);
    } else {
      capacity === 0 ? setCapacity(0) : setCapacity(Number(capacity) - 1);
    }
    console.log(props.match.fixture.id);
  };

  const history = useHistory();

  const handleInputChange = (e) => {
    setCapacity(e.currentTarget.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    teamProfileService
      .checkMatch(props.match.fixture.id)
      .then((response) => {
        if (response.data.length === 0) {
          teamProfileService
            .createMatch({capacity, price, matchId: props.match.fixture.id})
            .then((match) => console.log(match.data))
            .catch((err) => console.log(err));
          history.push("/");
        } else {
          teamProfileService
            .updateMatch({
              id: response.data[0]._id,
              price,
              capacity,
            })
            .then((res) => {
              setCapacity(res.data.capacity);
              setPrice(res.data.price);
              history.push("/");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {
        <Card style={{width: "21rem"}}>
          <Card.Body>
            <Card.Title>
              <p>
                <img
                  src={props.match?.teams.home.logo}
                  alt="Equipo Local"
                  style={{width: "20px", margin: "10px"}}
                />
                {props.match?.teams.home.name}
              </p>
              <p style={{marginTop: "5px"}}>
                <img
                  src={props.match?.teams.away.logo}
                  alt="Equipo Visitante"
                  style={{width: "20px", margin: "10px"}}
                />
                {props.match?.teams.away.name}
              </p>
            </Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              {formatDate(new Date(props.match?.fixture.date))}
            </ListGroupItem>
            <ListGroupItem>{props.match?.league.round}</ListGroupItem>
            <ListGroupItem>{props.match?.fixture.venue.name}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Form onSubmit={handleSubmit} className="form-center">
              <div className="contador">
                <InputGroup className="mb-3">
                  <Button
                    onClick={(e) => handleClick(e, "remove")}
                    variant="outline-secondary"
                    id="button-addon1"
                  >
                    -
                  </Button>
                  <FormControl
                    aria-label="capacity"
                    aria-describedby="capacity"
                    onChange={handleInputChange}
                    value={Number(capacity)}
                    id="button-addon1"
                  />
                  <Button
                    onClick={(e) => handleClick(e, "add")}
                    variant="outline-secondary"
                    id="button-addon1"
                  >
                    +
                  </Button>
                </InputGroup>
              </div>

              <InputGroup className="mb-3" id="ticketprice">
                <InputGroup.Text>€</InputGroup.Text>
                <FormControl
                  aria-label="price"
                  value={Number(price)}
                  onChange={handlePriceChange}
                />
              </InputGroup>
              <Button
                as="input"
                id="pay"
                type="submit"
                value="Enviar!"
                className="button-details"
              />
            </Form>
          </Card.Body>
        </Card>
      }
    </>
  );
}
export default TeamProfile;




// GET /api/team-profile/check-match/855736 200 255.355 ms - 2
// GET /api/team-profile/check-match/855735 200 377.137 ms - 2
// GET /api/team-profile/check-match/855734 200 387.989 ms - 2
// GET /api/team-profile/check-match/855739 200 1856.945 ms - 2
// GET /api/team-profile/check-match/855738 200 2198.253 ms - 2
// GET /api/team-profile/check-match/866681 200 2212.531 ms - 2
// GET /api/team-profile/check-match/855737 200 2217.209 ms - 207
// GET /api/team-profile/check-match/855740 200 2988.452 ms - 2
// GET /api/team-profile/check-match/855742 200 1148.464 ms - 2
// GET /api/team-profile/check-match/871851 200 1233.481 ms - 2
// GET /api/team-profile/check-match/855741 200 3053.790 ms - 2
// GET /api/team-profile/check-match/871850 304 1344.257 ms - -
// GET /api/team-profile/check-match/855743 200 2382.167 ms - 2
// GET /api/team-profile/check-match/855745 200 1335.454 ms - 2
// GET /api/team-profile/check-match/855744 200 1347.409 ms - 2
// GET /api/team-profile/check-match/855746 304 1272.780 ms - -
