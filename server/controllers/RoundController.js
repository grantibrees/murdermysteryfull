import express from "express";
import BaseController from "../utilities/BaseController";
import { roundService } from "../services/RoundService";
import socketService from "../services/SocketService";

export class RoundController extends BaseController {
  constructor() {
    super("api/round");
    this.router
      .get("/:roundnum", this.getRoundData)
      .get("/:roundnum/:phasenum", this.getPhaseData)

      .put("/:roundnum", this.updateRoundData)
      .put("/:roundnum/:phasenum", this.updatePhaseData)
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
