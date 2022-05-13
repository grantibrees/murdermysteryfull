import Axios from "axios"
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'
export const loginApi = Axios.create({
  baseURL: base + "login/",
  timeout: 3000,
  withCredentials: true
})
export const api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})
export const hostTokensApi = Axios.create({
  baseURL: base + "auth/",
  timeout: 3000,
  withCredentials: true
})
export const spotifyAuthApi = Axios.create({
  baseURL: "https://accounts.spotify.com/api/",
  timeout: 3000,
  withCredentials: true
})

export const spotifyAuthHost = Axios.create({
  baseURL: "https://accounts.spotify.com/",
  timeout: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",

  }
})

export const spotifyApi = Axios.create({
  baseURL: "https://api.spotify.com/v1/",
  timeout: 3000
})

export const spotifySongApi = Axios.create({
  baseURL: "https://api.spotify.com/v1/me/player/",
  timeout: 3000,
})


