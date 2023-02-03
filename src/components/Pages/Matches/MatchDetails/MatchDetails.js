import {useLocation, useHistory} from "react-router-dom";
import {formatDate} from "../../../../utils/index";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import Payment from "../../Payment/Payment";
import {useState, useEffect} from "react";
import APIHandler from "../../../../services/api.service";
import Visa from "../../../../assets/visa.png";
import Amex from "../../../../assets/amex.png";
import Master from "../../../../assets/mastercard.png";

function MatchesDetails(props) {
  const location = useLocation();
  const {match} = location.state;

  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [matchId, setMatchId] = useState("");
  const [quantity, setQuantity] = useState(0);

  const matchService = new APIHandler();

  useEffect(() => {
    matchService
      .checkMatch(match.fixture.id)
      .then((res) => {
        setCapacity(res.data[0].capacity);
        setPrice(res.data[0].price);
        setMatchId(res.data[0].matchId);
      })
      .catch((err) => console.log(err));
  }, []);

  const total = price * quantity;

  // console.log(match, "hey im match!!");
  // const handleClick = (e, operation) => {
  //   if (operation === "add") {
  //     setTotal(price * (quantity + 1));
  //     setQuantity(quantity + 1);
  //   } else {
  //     quantity === 0 ? setQuantity(0) : setQuantity(Number(quantity) - 1);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   setQuantity(e.currentTarget.value);
  // };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailPurchaser, setemailPurchaser] = useState("");

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log("firstName 👉️", firstName);
    console.log("lastName 👉️", lastName);
    console.log("lastName 👉️", emailPurchaser);

    // 👇️ clear all input values in the form
    setFirstName("");
    setLastName("");
    setemailPurchaser("");
  };
  // console.log("firstName 👉️", firstName);
  // console.log("lastName 👉️", lastName);
  // console.log("lastName 👉️", emailPurchaser);

  const teamHome = match?.teams.home.name;

  const teamAway = match?.teams.away.name;

  const purchaserInfo = emailPurchaser;

  console.log(purchaserInfo, "purch info");

  return (
    <>
      <div className="top-section">
        <div>
          <h2 className="teamnamedetails">
            <img
              src={match?.teams.home.logo}
              alt="Home Logo"
              className="imgteam"
            />
            {match?.teams.home.name}
          </h2>
        </div>

        <div>
          <h2 className="teamnamedetails">
            <img
              src={match?.league.logo}
              style={{width: "55px"}}
              alt="League Logo"
              // className="imgteam"
            />
            {match?.league.name}
          </h2>
        </div>
        <div>
          <h2 className="teamnamedetails">
            <img
              src={match?.teams.away.logo}
              alt="Away Logo"
              className="imgteam"
            />
            {match?.teams.away.name}
          </h2>
        </div>
      </div>

      <div className="fullcontainer">
        <div className="formulario2">
          <div className="border-container">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                className="form-info"
                type="text"
                placeholder="Nombre"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />

              <Form.Control
                className="form-info"
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />

              <Form.Control
                className="form-info"
                type="text"
                placeholder="Email"
                value={emailPurchaser}
                onChange={(event) => setemailPurchaser(event.target.value)}
              />

              <Form.Control
                className="form-info"
                type="text"
                placeholder="Telefono"
                style={{margin: "0px"}}
              />
            </Form.Group>

            <div className="contenedordos">
              {/* <InputGroup className="mb-3">
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
                  value={Number(quantity)}
                  id="button-addon1"
                  type="text"
                />
                <Button
                  onClick={(e) => handleClick(e, "add")}
                  variant="outline-secondary"
                  id="button-addon1"
                >
                  +
                </Button>
              </InputGroup> */}
              Seleccione la cantidad de entradas
              <br></br>
              <Form.Group controlId="formBasicSelect">
                <Form.Control
                  as="select"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  <option value="0">Cantidad de entradas</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>
              <br></br>
              <h3 className="price"> Total: €{total} </h3>
              <div className="credit-card-logos">
                <img
                  src={Visa}
                  alt="Visa"
                  style={{width: "35px", marginRight: "30px"}}
                />
                <img
                  src={Amex}
                  alt="Amex"
                  style={{width: "35px", marginRight: "30px"}}
                />
                <img src={Master} alt="Master" style={{width: "35px"}} />
              </div>
              <Payment
                price={total}
                matchId={matchId}
                number={quantity}
                match={match}
                info={purchaserInfo}
                teamHome={teamHome}
                teamAway={teamAway}
              />
              <p style={{fontSize: "12px", textAlign: "center"}}>
                *Para simular una venta insertar tarjeta de prueba 4242 4242
                4242 4242
              </p>
            </div>
          </div>

          <div className="second-box">
            <Card style={{width: "18rem"}}>
              <ListGroup variant="flush">
                <Card.Header>Fecha</Card.Header>
                <ListGroup.Item>
                  {formatDate(new Date(match?.fixture.date))}
                </ListGroup.Item>
                <Card.Header>Estadio</Card.Header>

                <ListGroup.Item>{match?.fixture.venue.name}</ListGroup.Item>
                <Card.Header>Precio</Card.Header>

                <ListGroup.Item>€ {price}</ListGroup.Item>
              </ListGroup>
            </Card>
            {/* <div>
                <h2 className="teamnamedetails2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    style={{margin: "10px"}}
                  >
                    <path d="M5.556 0v1.111h8.889v-1.111h1.111v1.111h1.667c0 0 0 0 0 0 1.47 0 2.673 1.142 2.771 2.587l0 0.009 0.006 0.182v13.333c0 1.534-1.244 2.778-2.778 2.778v0h-14.444c-1.534 0-2.778-1.244-2.778-2.778v0-13.333c0-1.534 1.244-2.778 2.778-2.778v0h1.667v-1.111h1.111zM4.444 2.222h-1.667c-0.919 0-1.667 0.748-1.667 1.667v13.333c0 0.919 0.748 1.667 1.667 1.667h14.444c0.919 0 1.667-0.748 1.667-1.667v-13.333c0-0.919-0.748-1.667-1.667-1.667h-1.667v1.111h-1.111v-1.111h-8.889v1.111h-1.111v-1.111zM17.222 16.667h-14.444v-11.111h14.444v11.111zM6.111 13.333h-2.222v2.222h2.222v-2.222zM9.444 13.333h-2.222v2.222h2.222v-2.222zM12.778 13.333h-2.222v2.222h2.222v-2.222zM16.111 13.333h-2.222v2.222h2.222v-2.222zM6.111 10h-2.222v2.222h2.222v-2.222zM9.444 10h-2.222v2.222h2.222v-2.222zM12.778 10h-2.222v2.222h2.222v-2.222zM16.111 10h-2.222v2.222h2.222v-2.222zM6.111 6.667h-2.222v2.222h2.222v-2.222zM9.444 6.667h-2.222v2.222h2.222v-2.222zM12.778 6.667h-2.222v2.222h2.222v-2.222zM16.111 6.667h-2.222v2.222h2.222v-2.222z" />
                  </svg>
                  {formatDate(new Date(match?.fixture.date))}
                </h2>
              </div>
              <div>
                <h2 className="teamnamedetails2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    // style="enable-background:new 0 0 512 512"
                    width="25"
                    height="25"
                    fill="black"
                  >
                    <path d="M22.591 6.706a8.15 8.15 0 0 0-5.794-2.409H8.203c-2.183 0-4.24.856-5.794 2.409S0 10.317 0 12.5s.856 4.24 2.409 5.794 3.612 2.409 5.794 2.409h8.594c2.183 0 4.24-.856 5.794-2.409S25 14.683 25 12.5s-.856-4.24-2.409-5.794zm-.552 11.035a7.368 7.368 0 0 1-5.242 2.181H8.203c-1.974 0-3.835-.774-5.241-2.181S.781 14.474.781 12.5s.774-3.835 2.181-5.241 3.267-2.181 5.241-2.181h8.594c1.974 0 3.835.774 5.241 2.181s2.181 3.267 2.181 5.241-.774 3.835-2.181 5.241z" />
                    <path d="M5.859 7.422c-.646 0-1.172.526-1.172 1.172v7.813c0 .646.526 1.172 1.172 1.172H19.14c.646 0 1.172-.526 1.172-1.172V8.594c0-.646-.526-1.172-1.172-1.172H5.859zm6.25 6.992c-.89-.181-1.563-.971-1.563-1.914s.672-1.732 1.563-1.914v3.828zm.781-3.828c.89.181 1.563.971 1.563 1.914s-.672 1.732-1.563 1.914v-3.828zm-7.421-.039h1.563v3.906H5.469v-3.906zm0 5.859v-1.172h1.953a.391.391 0 0 0 .391-.391v-4.688a.391.391 0 0 0-.391-.391H5.469V8.592c0-.215.175-.391.391-.391h6.25v1.591c-1.323.19-2.344 1.331-2.344 2.706s1.02 2.516 2.344 2.706v1.593H5.859a.392.392 0 0 1-.391-.391zm14.063-1.953h-1.563v-3.906h1.563v3.906zm0-5.859v1.172h-1.953a.391.391 0 0 0-.391.391v4.688a.391.391 0 0 0 .391.391h1.953v1.172a.392.392 0 0 1-.391.391h-6.25v-1.591c1.323-.19 2.344-1.331 2.344-2.706s-1.02-2.516-2.344-2.706V8.203h6.25c.215 0 .391.175.391.391zm.941-1.146a6.33 6.33 0 0 1 .746.639.389.389 0 0 0 .276.115.391.391 0 0 0 .276-.667 7.115 7.115 0 0 0-.838-.718.391.391 0 0 0-.46.631z" />
                    <path d="M22.761 8.779a.391.391 0 0 0-.662.415c.62.99.948 2.134.948 3.306a6.257 6.257 0 0 1-6.25 6.25H8.203c-3.446 0-6.25-2.804-6.25-6.25s2.804-6.25 6.25-6.25h8.594c.843 0 1.661.166 2.432.493l.072.031a.391.391 0 0 0 .314-.715 6.646 6.646 0 0 0-.081-.035 6.957 6.957 0 0 0-2.737-.555H8.203c-3.877 0-7.031 3.154-7.031 7.031s3.154 7.031 7.031 7.031h8.594a7.039 7.039 0 0 0 7.031-7.031 7.005 7.005 0 0 0-1.067-3.721z" />
                  </svg>
                  {match?.fixture.venue.name}
                </h2>
              </div>
              <div>
                <h2 className="teamnamedetails2">
                  <svg
                    width="20px"
                    height="20px"
                    fill="black"
                    viewBox="0 -64 640 640"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z" />
                  </svg>
                  € {price}
                </h2>
              </div> */}
          </div>
        </div>
      </div>

      {/* MOBILE!! */}

      <div className="contenedor-mobile">
        {
          <Card style={{width: "18rem"}}>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                {formatDate(new Date(match?.fixture.date))}
              </ListGroupItem>
              <ListGroupItem>{match?.league.round}</ListGroupItem>
              <ListGroupItem>{match?.fixture.venue.name}</ListGroupItem>
              <ListGroupItem>Precio: {price}</ListGroupItem>
              <ListGroupItem>
                Últimas {capacity} entradas disponibles
              </ListGroupItem>
            </ListGroup>
            <br></br>

            <div className="contador">
              <Form.Group controlId="formBasicSelect">
                <Form.Control
                  as="select"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  <option value="0">Cantidad de entradas</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <br></br>
              </Form.Group>
            </div>
            <h3 className="price"> Total: €{total} </h3>
            <div className="credit-card-logos">
              <img
                src={Visa}
                alt="Visa"
                style={{width: "35px", marginRight: "30px"}}
              />
              <img
                src={Amex}
                alt="Amex"
                style={{width: "35px", marginRight: "30px"}}
              />
              <img src={Master} alt="Master" style={{width: "35px"}} />
            </div>
            <Form.Control
              type="text"
              placeholder="Nombre del titular de la tarjeta"
              style={{marginRight: "10px;"}}
            />
            <Form.Control
              type="text"
              placeholder="Email"
              value={emailPurchaser}
              onChange={(event) => setemailPurchaser(event.target.value)}
            />
            <Form.Control
              type="text"
              placeholder="Numero de telefono"
              style={{marginBottom: "10px;"}}
            />
            <Payment
              price={total}
              matchId={matchId}
              number={quantity}
              info={purchaserInfo}
              teamHome={teamHome}
              teamAway={teamAway}
            />
          </Card>
        }
      </div>
    </>
  );
}

export default MatchesDetails;
