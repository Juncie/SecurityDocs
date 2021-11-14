import axios from "axios";
import userEvent from "@testing-library/user-event";

console.log(process.env);

const serverUrl =
  process.env.NODE_ENV === "production"
    ? ""
    : `http://localhost:5000/api/auth`;

console.log(serverUrl);

export default dbActions = {
    login: async (userId, password) => await axios.get(`${serverUrl}/userAuth/login`),
    register: async profile => await axios.post(`${serverUrl}/register`, profile),
    getUser: async () => await axios.get(`${serverUrl}/getuser`),
}