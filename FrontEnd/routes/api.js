import axios from "axios";
import userEvent from "@testing-library/user-event";

console.log(process.env);

const serverUrl =
  process.env.NODE_ENV === "production"
    ? ""
    : `http://localhost:5000/api`;

console.log(serverUrl);

const actions = {
    newUser: async user => axios.post(`${serverUrl}/newUser`, user),
}

export default actions;