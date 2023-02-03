import React, { Component } from "react";
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
import TicketCard from "./TicketCards";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      tickets: [],
      saved: false,
      teams: {},
    };
    this.profileService = new ProfileService();
  }

  componentDidMount() {
    this.profileService
      .getProfile(this.props.loggedUser._id)
      .then((response) => this.setState({ user: response.data.user }))
      .catch((err) => console.log(err));

    this.profileService
      .getTicketProfile()
      .then((response) => {
        console.log(response.data);
        this.setState({ tickets: response.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return this.props.loggedUser ? (
      <Container className="conteiner-profile">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Tu perfil</Card.Title>
            <Card.Text>
              Nombre de usuario: {this.state.user?.username}
              <hr />
              Email: {this.state.user?.email}
              <hr />
              <Card.Title>Tus compras: </Card.Title>
              {this.state.tickets.map((ticket) => {
                return <TicketCard ticket={ticket} />;
              })}
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
