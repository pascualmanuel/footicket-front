const axios = require("axios");

class APIHandler {
  constructor() {
    //Tabla de Posiciones
    this.axiosApp = axios.create({
      baseURL:
        "https://footicket-api.onrender.com/api" ||
        process.env.REACT_APP_BASE_URL,

      withCredentials: true,
    });
  }

  getAllMatches = (country) => this.axiosApp.get(`/matches/league/${country}`);
  getTeamId = (name) => this.axiosApp.get(`/matches/team/${name}`);
  getTeamMatches = (id) => this.axiosApp.get(`/matches/team/matches/${id}`);
  checkMatch = (matchId) =>
    this.axiosApp.get(`/team-profile/check-match/${matchId}`);
  createMatch = (match) =>
    this.axiosApp.post(`/team-profile/create-match`, match);

  createTicket = (price, matchId, number, info, teamHome, teamAway) =>
    this.axiosApp.post(
      `/tickets/create-ticket/${price}/${matchId}/${number}/${info}/${teamHome}/${teamAway}`
    );
  sendEmail = (ticketId) => this.axiosApp.post(`/checkout/finish/${ticketId}`);
  getAllTicketsMatches = () => this.axiosApp.get(`/matches/get-matches`);
  getMatchInfo = (matchId) =>
    this.axiosApp.get(`/matches/get-match-info/${matchId}`);
  getPositions = (country) =>
    this.axiosApp.get(`/matches/standings/${country}`);
  getNextMatches = (country) =>
    this.axiosApp.get(`/matches/next-matches/${country}`);
  getLeagueInfo = (country) =>
    this.axiosApp.get(`/matches/league-info/${country}`);
  getTeamInfo = (name) => this.axiosApp.get(`/matches/team-info/${name}`);
}

export default APIHandler;
