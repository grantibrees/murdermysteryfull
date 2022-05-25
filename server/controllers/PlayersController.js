import express from "express";
import BaseController from "../utils/BaseController";
import { playersService } from "../services/PlayersService";

export class PlayersController extends BaseController {
  constructor() {
    super("api/players");
    this.router
      .get("", this.getAllPlayerData)
      .get("/:id", this.getPlayerData)
      .get("/playerlist", this.getPlayerList)

      .put("/:id", this.updatePlayerData)
      .put("/playerlist", this.updatePlayerList)
  }

  
  async getPlayerData(req, res, next) {
    try {
      let profile = await playersService.getPlayerData(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async updatePlayerData(req, res, next) {
    try {
      let data = await playersService.updatePlayerData(
        req.params.id,
        req.body
      );
      socketService.messageRoom(
        "id-" + req.params.id,
        "playerDataUpdated",
        { id: req.params.id }
      );
      return res.send({ data: data, message: "updated player" });
    } catch (error) {
      console.error(error);
    }
  }
}
