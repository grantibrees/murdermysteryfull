import express from "express";
import BaseController from "../utils/BaseController";
import { authHostService } from "../services/AuthHostService.js";


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
}
