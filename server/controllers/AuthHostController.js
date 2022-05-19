import express from "express";
import BaseController from "../utils/BaseController";
import { authHostService } from "../services/AuthHostService.js";
// import auth0provider from "@bcwdev/auth0provider";
// const SpotifyWebApi = require("spotify-web-api-node");


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
