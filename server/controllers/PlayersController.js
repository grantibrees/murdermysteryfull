import express from "express";
import BaseController from "../utilities/BaseController";
import { playersService } from "../services/PlayersService";

export class PlayersController extends BaseController {
  constructor() {
    super("api/players");
    this.router
      .get("", this.getAllPlayerData)
      .get("/identity", this.setIdentities)
      .get("/:hackername", this.getPlayerData)
      // .get("/playerlist", this.getPlayerList)

      .put("/:hackerName", this.updatePlayerData)
      
      // .put("/sympathist", this.offerSymp)
      // .put("/playerlist", this.updatePlayerList)

      .post("/post", this.postPlayers)
  }

  async setIdentities(req, res, next) {
    try {
      let identities = await playersService.setIdentities();
      res.send(identities);
    } catch (error) {
      next(error);
    }
  }

  async getAllPlayerData(req, res, next) {
    try {
      let playerData = await playersService.getAllPlayerData();
      res.send(playerData);
    } catch (error) {
      next(error);
    }
  }

  async getPlayerData(req, res, next) {
    try {
      let playerData = await playersService.getPlayerData(req.params.hackername);
      res.send(playerData);
    } catch (error) {
      next(error);
    }
  }


  async updatePlayerData(req, res, next) {
    try {
      let data = await playersService.updatePlayerData(
        req.params.hackerName,
        req.body
      );
      return res.send({ data: data, message: "updated player" });
    } catch (error) {
      console.error(error);
    }
  }


  async postPlayers(req, res, next) {
    try {
      let payload = {
        players: req.body.players
      };
      // console.log(payload)
      await playersService.uploadPlayers(payload);
      res.send("Players uploaded");
    } catch (error) {
      next(error)
    }
  }
}
