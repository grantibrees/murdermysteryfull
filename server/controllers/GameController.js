import express from "express";
import BaseController from "../utils/BaseController";
import { gameService } from "../services/GameService";
import socketService from "../services/SocketService";

export class GameController extends BaseController {
  constructor() {
    super("api/game");
    this.router
      .get("", this.getGameData)
      .get("/round/:roundnum", this.getRoundData)
      .get("/round/:roundnum/:phasenum", this.getPhaseData)

      //Gets the trivia questions during Phase 1
      .get("/round/:roundnum/1/questions", this.getTriviaQuestions)
      .get("/playerlist", this.getPlayerList)
      .get("/identitylist", this.getIdenityList)
      .get("/hermes/:id", this.getHermesText)

      .put("", this.updateGameData)
      .put("/round/:roundnum", this.updateRoundData)
      .put("/round/:roundnum/:phasenum", this.updatePhaseData)
      .put("/:updateplayerlist", this.updatePlayerList)
      .put("/:updateidentitylist", this.updateIdentityList)
  }
  
  async getRoundData(req, res, next) {
    try {
      let data = await gameService.getRoundData(req.params.roundNumber);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  
}
