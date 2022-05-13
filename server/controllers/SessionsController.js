import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { sessionsService } from "../services/SessionsService";
import socketService from "../services/SocketService";

export class SessionsController extends BaseController {
  constructor() {
    super("api/session");
    this.router
      .get("/:sessionCode", this.getBySessionCode)
      .get("/:sessionCode/find", this.findActiveSong)
      .put("/:sessionCode", this.addToQueue)
      .put("/:sessionCode/:songUri", this.updateSong)
      .put("/:sessionCode/:songUri/active", this.updateActiveSong)
      .use(auth0provider.getAuthorizedUserInfo)
      .delete("/:sessionCode/:songUri", this.removeSongFromQueue)
      .post("/post", this.create);
  }
  async getBySessionCode(req, res, next) {
    try {
      let data = await sessionsService.getById(req.params.sessionCode);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.body.userEmail;
      // console.log(req.body);
      let data = await sessionsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async addToQueue(req, res, next) {
    try {
      let data = await sessionsService.addToQueue(
        req.params.sessionCode,
        req.body
      );
      socketService.messageRoom(
        "session-" + req.params.sessionCode,
        "updateQueue",
        req.body
      );
      return res.send({ data: data, message: "added song to que" });
    } catch (error) {
      next(error);
    }
  }
  async removeSongFromQueue(req, res, next) {
    try {
      let data = await sessionsService.removeFromQueue(
        req.params.sessionCode,
        req.params.songUri
      );
      socketService.messageRoom(
        "session-" + req.params.sessionCode,
        "updateQueue",
        { sessionCode: req.params.sessionCode }
      );
      return res.send({ data: data, message: "song removed form queue" });
    } catch (error) {
      console.error(error);
    }
  }

  async updateSong(req, res, next) {
    try {
      let data = await sessionsService.updateSong(
        req.params.sessionCode,
        req.body
      );
      socketService.messageRoom(
        "session-" + req.params.sessionCode,
        "songScoreUpdated",
        { sessionCode: req.params.sessionCode }
      );
      return res.send({ data: data, message: "updated song" });
    } catch (error) {
      console.error(error);
    }
  }
  async updateActiveSong(req, res, next) {
    try {
      let data = await sessionsService.updateActiveSong(
        req.params.sessionCode,
        req.body
      );
      socketService.messageRoom(
        "session-" + req.params.sessionCode,
        "activeSongUpdated",
        { data: data }
      );
      return res.send({
        data: data,
        message: "updated active song sesh controller",
      });
    } catch (error) {
      console.error(error);
    }
  }
  async findActiveSong(req, res, next) {
    try {
      let data = await sessionsService.findActiveSong(req.params.sessionCode);
      return res.send({
        data: data,
      });
      // return res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
}
