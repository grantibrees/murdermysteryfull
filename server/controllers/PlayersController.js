import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { playersService } from "../services/PlayersService";

export class PlayersController extends BaseController {
  constructor() {
    super("api/players");
    this.router
      .get("", this.getPlayerData)
      .put("/:id", this.edit);
  }
  async getPlayerData(req, res, next) {
    try {
      let profile = await playersService.getPlayerData(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
