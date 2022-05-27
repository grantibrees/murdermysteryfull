import express from "express";
import BaseController from "../utilities/BaseController";
import { gameService } from "../services/GameService";
import socketService from "../services/SocketService";

export class GameController extends BaseController {
  constructor() {
    super("api/game");
    this.router
      // .get("", this.getGameData)
      // .get("/identitylist", this.getIdenityList)
      // .get("/hermes/:id", this.getHermesText)

      // .put("", this.updateGameData)
      .put("/start", this.start)
      // .put("/round/:roundnum", this.updateRoundData)
      // .put("/round/:roundnum/:phasenum", this.updatePhaseData)
      // .put("/:updateidentitylist", this.updateIdentityList)
      // .post("/post", this.uploadIdentitiesJsonData)
      .post("/post", this.uploadTriviaJsonData)
      // .post("/players", this.uploadPlayersJsonData)
  }

  async start(req, res, next){
    try {
      let data = await gameService.start();
      console.log(req.body),
      socketService.messageRoom(
        req.body.room,
        "gameStart",
        data
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async uploadTriviaJsonData(req, res, next) {
    try {
      let payload = {
        trivia: req.body.triviaQuestions
      };
      // console.log(payload)
      await gameService.uploadTrivia(payload);
      res.send("Triva uploaded");
    } catch (error) {
      next(error)
    }
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
