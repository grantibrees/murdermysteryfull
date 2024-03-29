import express from "express";
import BaseController from "../utilities/BaseController";
import { gameService } from "../services/GameService";
import socketService from "../services/SocketService";
import { playersService } from "../services/PlayersService";

export class GameController extends BaseController {
  constructor() {
    super("api/game");
    this.router
      .get("", this.getGameData)
      .get("/getIdentitiesList", this.getIdentitiesList)
      // .get("/hermes/:id", this.getHermesText)
      // .put("", this.updateGameData)
      .put("/start", this.start)
      // .put("/:updateidentitylist", this.updateIdentityList)
      .post("/identities", this.uploadIdentitiesJsonData)
      .post("/trivia", this.uploadTriviaJsonData)
      // .post("/players", this.uploadPlayersJsonData)
  }

  async start(req, res, next){
    try {
      // empty players from db, then add them back
      await playersService.deletePlayersFromGame();
      await playersService.addPlayersToGame();
      console.log("players successfully added to game");
      let data = await gameService.createGame();
      console.log("data back from gameService.createGame(): " + data);
      // console.log(req.body),
      socketService.messageRoom(
        req.body.room,
        "gameStart",
        data
      );
      console.log("game created");
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getGameData(req, res, next){
    try {
      let gameData = await gameService.getGameData();
      res.send(gameData);
    } catch (error) {
      next(error);
    }
  }


  async getIdentitiesList(req, res, next) {
    try {
      let identitiesList = await gameService.getIdentitiesList();
      res.send(identitiesList);
    } catch (error) {
      next(error);
    }
  }

  async uploadIdentitiesJsonData(req, res, next) {
    try {
      let payload = {
        identitiesList: req.body.identitiesList
      };
      // console.log(payload)
      await gameService.uploadIdentities(payload);
      res.send("identities uploaded");
    } catch (error) {
      next(error)
    }
  }

  async uploadTriviaJsonData(req, res, next) {
    try {
      let payload = {
        trivia: req.body.triviaQuestions
      };
      // console.log(payload)
      await gameService.uploadTrivia(payload);
      res.send("Trivia uploaded");
    } catch (error) {
      next(error)
    }
  }
  

}
