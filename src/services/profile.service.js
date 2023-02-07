import axios from "axios";

class ProfileService {
  constructor() {
    this.app = axios.create({
      baseURL:
        `https://footicket-api.onrender.com/api/profile-user` ||
        `${process.env.REACT_APP_BASE_URL}/profile-user`,
      withCredentials: true,
    });
  }
  getProfile = (id) => this.app.get(`/${id}`);
  getTicketProfile = () => this.app.get(`/UserTickets`);
}

export default ProfileService;
