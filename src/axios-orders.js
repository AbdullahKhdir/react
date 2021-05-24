import axios from "axios";

//to create multiple instances for a different routes in the backend e.g. Auth-Route
//and to use it seperatly in the app.

const axiosInstance = axios.create({
  baseURL : "https://myburger-backend-b503e-default-rtdb.firebaseio.com/"
});

export default axiosInstance;
