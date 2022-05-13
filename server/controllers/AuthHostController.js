import express from "express";
import BaseController from "../utils/BaseController";
import { authHostService } from "../services/AuthHostService.js";
import auth0provider from "@bcwdev/auth0provider";
const SpotifyWebApi = require("spotify-web-api-node");
let scopes = [
  "streaming",
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
];
// var spotifyRedirect = "";
//We should be able to delete this, because the two functions that needed it created their own now.
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "https://songscoop.herokuapp.com/callback",
  // redirectUri: spotifyRedirect,
});
let unsafe = {};
export class AuthHostController extends BaseController {
  constructor() {
    super("");
    // console.log('AuthHostController active');
    this.router
      .get("/callback", this.authCallBack)
      .get("/login", this.authorizeHost)
      .use("/auth", auth0provider.getAuthorizedUserInfo)
      .post("/auth/tokensave", this.setHostTokens)
      .get("/auth/tokenget", this.getHostTokens);
  }
  async authorizeHost(req, res, next) {
    try {
      //Spotify  was not receiving the redirect in time, so creating the callback API in the function allows it to be set before spotify calls it.
      // spotifyRedirect = req.headers.referer.includes("localhost")
      //   ? "http://localhost:3000/callback"
      //   : "https://songscoop.herokuapp.com/callback";
      // let spotifyCallback = new SpotifyWebApi({
      //   clientId: process.env.SPOTIFY_CLIENT_ID,
      //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      //   redirectUri: spotifyRedirect,
      // });
      // let html = await spotifyCallback.createAuthorizeURL(scopes, "");

      let html = await spotifyApi.createAuthorizeURL(scopes, "");
      console.log(html);
      // res.send({ url: html })
      res.redirect(html);
    } catch (error) {
      next(error);
    }
  }
  async authCallBack(req, res, next) {
    console.log("hit callback");
    const { code } = req.query;
    console.log(code);
    try {
      //Spotify still was not receiving the redirect in time, so creating a second callback API allows it to be accessed.
      // spotifyRedirect = req.headers.referer.includes("localhost")
      //   ? "http://localhost:3000/callback"
      //   : "https://songscoop.herokuapp.com/callback";
      // let spotifySecondCallBack = new SpotifyWebApi({
      //   clientId: process.env.SPOTIFY_CLIENT_ID,
      //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      //   redirectUri: spotifyRedirect,
      // });
      // let data = await spotifySecondCallBack.authorizationCodeGrant(code);
      // let redirect = req.headers.referer;
      // const { access_token, refresh_token, expires_in } = data.body;
      // console.log(data.body);
      let data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token, expires_in } = data.body;
      console.log(data.body);
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      let payload = {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      };

      res.redirect(
        // redirect +
        //   "#/dashboard?" +
        //   `accessToken=${access_token}&refreshToken=${refresh_token}&expiresIn=${expires_in}`
        "https://songscoop.herokuapp.com/#/dashboard?" +
          `accessToken=${access_token}&refreshToken=${refresh_token}&expiresIn=${expires_in}`
      );
    } catch (error) {
      res.redirect("error");
    }
  }
  async setHostTokens(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let payload = {
        creatorEmail: req.body.creatorEmail,
        refreshToken: req.body.refreshToken,
        accessToken: req.body.accessToken,
        expiresIn: req.body.expiresIn,
      };
      await authHostService.setHostTokens(payload);
      res.send("Tokens saved");
    } catch (error) {}
  }
  async getHostTokens(req, res, next) {
    try {
      let result = await authHostService.getHostTokens(req.userInfo.email);
      res.send(result);
    } catch (error) {}
  }
}
