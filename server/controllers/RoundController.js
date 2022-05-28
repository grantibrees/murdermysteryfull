import express from "express";
import BaseController from "../utilities/BaseController";
import { roundService } from "../services/RoundService";
import socketService from "../services/SocketService";

export class RoundController extends BaseController {
  constructor() {
    super("api/round");
    this.router
      // .get("/:roundNum", this.getRoundData)
      // .get("/:roundnum/:phasenum", this.getPhaseData)
      .get("/start", this.beginRound)
      .get("/:roundNum/:phaseNum", this.nextPhase)
      // .put("/round/:roundnum/:phasenum", this.updatePhaseData)
      // .put("/:roundnum", this.updateRoundData)
      // .put("/:roundnum/:phasenum", this.updatePhaseData)
  }

  async beginRound(req, res, next){
    try {
      let gameData = await roundService.beginRound();
      // console.log(req.body),
      socketService.messageRoom(
        "murder",
        "roundStart",
        gameData
      );
      return res.send(gameData);
    } catch (error) {
      next(error);
    }
  }

  async nextPhase(req, res, next){
    try {
      let r = req.params.roundNum
      let p = req.params.phaseNum
      console.log("params: "+ r + " " + p);
      let gameData = await roundService.nextPhase(r,p);
      console.log("gameData from controller: " +gameData);
      socketService.messageRoom(
        "murder",
        "phaseStart",
        gameData
      );
      return res.send(gameData);
    } catch (error) {
      next(error);
    }
  }


}
