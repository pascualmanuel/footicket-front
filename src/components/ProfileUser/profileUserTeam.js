import React, {Component} from "react";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Table,
  Card,
  Spinner,
} from "react-bootstrap";
import ProfileService from "../../services/profile.service";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      tickets: [],
      saved: false,
    };
    this.profileService = new ProfileService();
  }

  componentWillMount() {
    this.profileService
      .getProfile(this.props.loggedUser._id)
      .then((response) => this.setState({user: response.data.user}))
      .catch((err) => console.log(err));

    this.profileService
      .getTicketProfile()
      .then((response) => {
        console.log(response.data);
        this.setState({tickets: response.data});
      })
      .catch((err) => console.log(err));
  }

  render() {
    return this.props.loggedUser ? (
      <Container className="conteiner-profile">
        <Card style={{width: "18rem"}}>
          <Card.Body>
            <Card.Text>
              <h4> {this.state.user?.username}</h4>
              <hr />

              {this.state.tickets.length !== 0 ? (
                this.state.tickets.map((ticket) => {
                  console.log("holaaa", ticket.numberOfTickets);
                  let total = ticket.numberOfTickets * ticket.totalPrice;

                  return (
                    <>
                      Tus ventas: <h4>{ticket.numberOfTickets} </h4>
                      <p>Precio total de entradas vendidas:</p>
                      <h4>€{total}</h4>
                    </>
                  );
                })
              ) : (
                <p>No hay ventas</p>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    ) : (
      <Spinner animation="border" role="status" id="pluswrap">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
}

export default Profile;
