import React, {useState} from "react";
import Logo from "../../../assets/ft-logo.png";
import {Link} from "react-router-dom";
import AuthService from "../../../services/auth.service";
import "../../Styles/styles.css";
import {
  Button,
  Container,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Nav,
} from "react-bootstrap";

const authService = new AuthService();

const Navigation = ({loggedUser, storeUser}) => {
  const logout = () => {
    authService
      .logout()
      .then((response) => storeUser(null))
      .catch((err) => console.log(err));
  };
  const [teamName, setTeamName] = useState("");

  const handleChange = (e) => {
    setTeamName(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const userNameProfile = !loggedUser ? "Mi Perfil" : loggedUser.username;

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logo" style={{width: "35px"}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: "600px"}}
            navbarScroll
          >
            <NavDropdown title={userNameProfile} id="navbarScrollingDropdown">
              {!loggedUser ? (
                <>
                  <NavDropdown.Item as={Link} to="/login">
                    Iniciar Sesion
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">
                    Registro
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  {/* {loggedUser.role === "STANDARD" && (
                    <NavDropdown.Item to="#action3">
                      Últimas Compras
                    </NavDropdown.Item>
                  )} */}

                  {loggedUser.role === "STANDARD" ? (
                    <NavDropdown.Item as={Link} to="/profile-user">
                      Mi perfil {/* Profile de user */}
                    </NavDropdown.Item>
                  ) : (
                    <>
                      <NavDropdown.Item as={Link} to="/team/profile">
                        Vender entradas
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/profile-user-team">
                        Mis ventas
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} onClick={logout} to="/">
                    Cerrar Sesion
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            <>
              <NavDropdown title="Tickets" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/league/england">
                  Premier League
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/league/spain">
                  LaLiga
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/league/italy">
                  Serie A
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/league/germany">
                  Bundesliga
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/league/argentina">
                  Liga prof. Argentina
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/league/france">
                  League 1
                </NavDropdown.Item>
              </NavDropdown>
            </>
            <>
              <NavDropdown title="Posiciones" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/standings/england">
                  Premier League
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/standings/spain">
                  LaLiga
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/standings/italy">
                  Serie A
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/standings/argentina">
                  Liga Prof. Argentina
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/standings/germany">
                  Bundesliga
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/standings/france">
                  League 1
                </NavDropdown.Item>
              </NavDropdown>
            </>
            {/* <Nav.Link as={Link} to="/tickets">
                Tickets
              </Nav.Link>
            {loggedUser && loggedUser.role === "TEAM" && (
              <>
                <Nav.Link>Vender entradas</Nav.Link>
                <NavDropdown title="Mi equipo" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/team/profile">
                    Partidos
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )} */}
          </Nav>
          <Form onSubmit={handleSubmit} className="d-flex">
            <FormControl
              type="search"
              placeholder="Busqueda por equipo"
              className="me-2"
              aria-label="Search"
              name="teamName"
              value={teamName}
              onChange={handleChange}
            />
            <Link to={`/matches/team/${teamName}`}>
              <Button variant="" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
