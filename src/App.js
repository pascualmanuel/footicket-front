import React, {Component} from "react";
import "./App.css";
import {Switch, Route} from "react-router-dom";
import NavBar from "./components/Layout/Navigation/NavBar";
import SignupPage from "./components/Pages/Signup/signup";
import AuthService from "./services/auth.service";
import LoginPage from "./components/Pages/Login/login";
import Matches from "./components/Pages/Matches/LeagueMatches";
import MatchDetails from "./components/Pages/Matches/MatchDetails/MatchDetails.js";
import TeamMatches from "./components/Pages/Matches/TeamMatches";
import TeamProfile from "./components/Pages/TeamProfile/TeamProfile";
import Home from "./components/Pages/Home/Home";
import AcceptedPayment from "./components/Pages/Payment/AcceptedPayment";
import TeamTickets from "./components/Pages/Matches/TeamTickets";
import ProfileUser from "./components/ProfileUser/profileUser";
import ProfileUserTeam from "./components/ProfileUser/profileUserTeam";
import Standings from "./components/Pages/Standings/Standings";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedUser: undefined,
    };

    this.authService = new AuthService();
  }

  componentDidMount() {
    this.authService
      .isloggedin()
      .then((response) => this.storeUser(response.data))
      .catch((err) => this.storeUser(null));
  }

  storeUser = (user) => {
    this.setState({loggedUser: user});
  };

  render() {
    return (
      <>
        <NavBar storeUser={this.storeUser} loggedUser={this.state.loggedUser} />
        <main>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route
              path="/signup"
              render={(props) => (
                <SignupPage {...props} storeUser={this.storeUser} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <LoginPage {...props} storeUser={this.storeUser} />
              )}
            />
            <Route
              path="/tickets"
              render={(props) => <TeamTickets {...props} />}
            />
            <Route
              path="/league/:country"
              render={(props) => (
                <Matches {...props} storeUser={this.storeUser} />
              )}
            />
            <Route
              path="/match/details"
              render={(props) => <MatchDetails {...props} />}
            />
            <Route
              path="/matches/team/:teamName"
              render={(props) => <TeamMatches {...props} />}
            />
            <Route
              path="/team/profile"
              render={(props) => (
                <TeamProfile loggedUser={this.state.loggedUser} {...props} />
              )}
            />

            <Route
              path="/profile-user"
              render={(props) => (
                <ProfileUser loggedUser={this.state.loggedUser} {...props} />
              )}
            />

            <Route
              path="/profile-user-team"
              render={(props) => (
                <ProfileUserTeam
                  loggedUser={this.state.loggedUser}
                  {...props}
                />
              )}
            />

            <Route
              path="/finish/:ticketId"
              render={(props) => <AcceptedPayment {...props} />}
            />
            <Route path="/standings" exact render={() => <Standings />} />

            <Route
              path="/standings/:country"
              render={(props) => (
                <Standings {...props} storeUser={this.storeUser} />
              )}
            />
          </Switch>
        </main>
      </>
    );
  }
}
export default App;
