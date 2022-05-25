import express from "express";
import BaseController from "../utils/BaseController";
import { gameService } from "../services/GameService";
import socketService from "../services/SocketService";

export class GameController extends BaseController {
  constructor() {
    super("api/game");
    this.router
      .get("", this.getGameData)
      .get("/identitylist", this.getIdenityList)
      .get("/hermes/:id", this.getHermesText)

      .put("", this.updateGameData)
      .put("/round/:roundnum", this.updateRoundData)
      .put("/round/:roundnum/:phasenum", this.updatePhaseData)
      .put("/:updateidentitylist", this.updateIdentityList)
  }

  async getGameData(req, res, next) {
    try {
      let data = await gameService.getGameData(req.params.roundNumber);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  
}
