import React, {Component} from "react";
import {Form, Button, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../../Styles/styles.css";
import AuthService from "../../../services/auth.service";

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      team_id: "",
    };

    this.authService = new AuthService();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.authService
      .signup(
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.team_id
      )
      .then((response) => {
        this.props.storeUser(response.data);
        this.props.history.push("/");
      })
      .catch((err) => console.log(err.response.data.message));
  };

  handleInputChange = (e) => {
    const {name, value} = e.currentTarget;

    this.setState({[name]: value});
  };

  render() {
    return (
      <>
        <br></br>
        <br></br>
        <br></br>
        <div className="auth-cont">
          <div className="auth-cont-2">
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <h2 style={{textAlign: "center"}}> Registrarse</h2>
                <hr></hr>
                <br></br>
                <br></br>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    value={this.state.username}
                    name="username"
                    type="text"
                    placeholder="Elige un nombre de usuario"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo electronico</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    name="email"
                    type="text"
                    placeholder="ejemplo@gmail.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                  />
                </Form.Group>
                {/* 
              <Form.Group className="mb-3" controlId="team_id">
                <Form.Label>IdTeam</Form.Label>
                <Form.Control
                  onChange={this.handleInputChange}
                  value={this.state.team_id}
                  name="team_id"
                  type="number"
                  placeholder="prueba"
                />
              </Form.Group> */}

                <Button id="login-button" type="submit">
                  Registrarse
                </Button>
                <p>
                  <br></br> ¿Ya no eres parte de la comunidad de FootTicket?
                  <br></br>
                </p>
                <p>
                  <Link as={Link} to="/login">
                    Login
                  </Link>
                </p>
              </Form>
            </Col>
          </div>
        </div>
      </>
    );
  }
}

export default SignupPage;
