import axios from "axios";
import userEvent from "@testing-library/user-event";

console.log(process.env);

const serverUrl =
  process.env.NODE_ENV === "production"
    ? ""
    : `http://localhost:5000/api`;

console.log(serverUrl);

// const createHeaders = () => {
//   return { headers: { Authorization: `Bearer ${AsyncStorage.getitem("token")}`}};
// }

const dbRoute = {
    newUser: async (user) => await axios.post(`${serverUrl}/newUser`, user),
    getUser: async (userId) => await axios.get(`${serverUrl}/getUser`, userId),
    findUser: async (userId) => await axios.post(`${serverUrl}/findUser`, userId),
}

export default dbRoute;