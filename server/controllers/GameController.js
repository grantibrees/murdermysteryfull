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
      // .put("/round/:roundnum", this.updateRoundData)
      // .put("/round/:roundnum/:phasenum", this.updatePhaseData)
      // .put("/:updateidentitylist", this.updateIdentityList)
      .post("/post", this.uploadIdentitiesJsonData)
      // .post("/trivia", this.uploadTriviaJsonData)
      // .post("/players", this.uploadPlayersJsonData)
  }

  async uploadIdentitiesJsonData(req, res, next) {
    try {
      let payload = {
        identitiesList: req.body.identitiesList
      };
      // console.log(payload)
      await gameService.uploadIdentities(payload);
      res.send("Identities uploaded");
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