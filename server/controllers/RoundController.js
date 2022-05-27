import express from "express";
import BaseController from "../utilities/BaseController";
import { roundService } from "../services/RoundService";
import socketService from "../services/SocketService";

export class RoundController extends BaseController {
  constructor() {
    super("api/round");
    this.router
      .get("/:roundNum", this.getRoundData)
      // .get("/:roundnum/:phasenum", this.getPhaseData)
      .get("/start", this.beginRound)
      .get("/:roundNum/:phaseNum", this.nextPhase)
      // .put("/round/:roundnum/:phasenum", this.updatePhaseData)
      // .put("/:roundnum", this.updateRoundData)
      // .put("/:roundnum/:phasenum", this.updatePhaseData)
  }

  async beginRound(req, res, next){
    try {
      let data = await roundService.beginRound();
      console.log(req.body),
      socketService.messageRoom(
        "murder",
        "roundStart",
        data
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async nextPhase(req, res, next){
    try {
      let data = await roundService.nextPhase(req.params.roundNum, req.params.phaseNum);
      console.log(req.body),
      socketService.messageRoom(
        "murder",
        "phaseStart",
        data
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
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
