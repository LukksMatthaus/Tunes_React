import axios from "axios";
const apiMusica = axios.create({
  baseURL: "https://itunes.apple.com/"
});
export default apiMusica;
