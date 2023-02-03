import React, {Component} from "react";
import {Form, Button, Col} from "react-bootstrap";
import AuthService from "../../../services/auth.service";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

import "../../Styles/styles.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.authService = new AuthService();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.authService
      .login(this.state.username, this.state.password)
      .then((response) => {
        this.props.storeUser(response.data);
        this.props.history.push("/");
      })

      .catch((err) =>
        console.log(err.response.data.message, "yo soy el error!!")
      );
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
              <h2 style={{textAlign: "center"}}> Iniciar Sesion</h2>
              <hr></hr>
              <br></br>
              <br></br>

              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    value={this.state.username}
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    value={this.state.password}
                    name="password"
                    type="password"
                    placeholder="*******"
                  />
                </Form.Group>
                <Button id="login-button" type="submit">
                  Iniciar Sesión
                </Button>
                <p>
                  <br></br> ¿Aún no eres parte de la comunidad de FootTicket?
                  <br></br>
                </p>
                <p>
                  <Link as={Link} to="/signup">
                    Registrate
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

export default LoginPage;
