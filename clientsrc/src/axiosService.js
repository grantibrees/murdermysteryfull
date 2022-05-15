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

export const triviaApi = Axios.create({
  baseURL: "https://opentdb.com/api.php?amount=50",
  timeout: 3000
})
// open trivia db api requires a category. 
// here is a list of them: https://opentdb.com/api_category.php

//we'll also want to add in &type=multiple to indicate multiple choice
//example: https://opentdb.com/api.php?amount=50&category=17&type=multiple
// I think we'll use categories 15, 17, 18, and 30

export const twilioApi = Axios.create({
  baseURL: "https://conversations.twilio.com/v1",
  timeout: 3000,
})


