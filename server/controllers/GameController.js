import express from "express";
import BaseController from "../utils/BaseController";
import { gameService } from "../services/GameService";
import socketService from "../services/SocketService";

export class GameController extends BaseController {
  constructor() {
    super("api/game");
    this.router
      .get("/:round", this.getRoundData)
      .get("/:playerlist", this.getPLayerList)
      .get("/:identitylist", this.getIdenityList)
      .put("/:updateround", this.updateRoundData)
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
