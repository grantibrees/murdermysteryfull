import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";
import socketService from "./SocketService";

class RoundService {
  async beginRound() {
    //pull the game from the db
    let game = await dbContext.Game.findById({ _id: "62917cae3921a45ae316a97f" })
    // console.log(game);
    //set the next round number
    let newRoundNumber = game.roundData.length
    newRoundNumber += 1
    game.currentRoundNumber = newRoundNumber

    // console.log("new round number: "+newRoundNumber);
    //make a new round obj
    let newlyCreatedRound = {
      roundNumber: newRoundNumber,
      phase1Data: {
        fakeOb1: ""
      },
      phase2Data: {
        fakeOb2: ""
      },
    }
    //push the obj to game data
    game.roundData.push(newlyCreatedRound)
    // console.log("game: " + game);

    //update game in db with game.newlyCreatedRound obj
    let gameWithNewRound = await dbContext.Game.findOneAndUpdate(
      { _id: "62917cae3921a45ae316a97f" },
      game,
      { new: true }
    )
    // console.log("gameWithNewRound: "+gameWithNewRound);

    // let gameWithNewPhase = await this.nextPhase(newRoundNumber, 0)

    return gameWithNewRound
  }

  async nextPhase(roundNum, phaseNum) {
    if (roundNum == 0) {
      console.log("round is 0 during phase");
      return "round shouldn't be 0"
    }

    if (phaseNum == 2) {
      phaseNum = 0
    } else {
      phaseNum++
    }
    console.log("phase updated to: " + phaseNum);

    let newlyCreatedPhase = {
      timer: 0,
      questions: [],
    }
    //add questions to array if phase1
    if (phaseNum == 1) {
      let ques = await this.questionsLoader()
      newlyCreatedPhase.questions = [...ques]
    }
    // console.log("newphaseobj: "+newlyCreatedPhase.questions);
    //pull the game from db
    let game = await dbContext.Game.findOne({ _id: "62917cae3921a45ae316a97f" })

    let roundIndex = roundNum - 1
    console.log("roundIndex is "+roundIndex);

    // console.log("game.roundData[roundIndex].roundNumber: " + game.roundData[roundIndex].roundNumber);
    if (roundNum != game.roundData[roundIndex].roundNumber) {
      console.log("Something has gone wrong with the round counting")
      return "round counting wrong"
    }
    //set the round data from the game obj in the db to our currentRoundData obj

    //Increase the phase number, and put the new phase into the round.phaseData
    if (phaseNum == 1) {
      console.log("hit phase 1 updates");
      //5 min
      game.currentPhaseNumber = 1
      newlyCreatedPhase.timer = 300000
      game.roundData[roundIndex].phase1Data = newlyCreatedPhase
    } else if (phaseNum == 2) {
      //15 min
      game.currentPhaseNumber = 2
      newlyCreatedPhase.timer = 900000
      game.roundData[roundIndex].phase2Data = newlyCreatedPhase
    } else if (phaseNum == 0) {
      game.currentPhaseNumber = 0
    } else {
      console.log("something wrong with phase num")
    }

    let updatedGame = await dbContext.Game.findOneAndUpdate(
      { _id: "62917cae3921a45ae316a97f" },
      game,
      { new: true }
    )
    console.log("updatedGame: " + updatedGame);
    console.log("round number: " + game.currentPhaseNumber);
    console.log("updated phase number: " + game.currentPhaseNumber);
    return updatedGame
  }

  async questionsLoader() {
    let data = []
    let qCount = await dbContext.TriviaQuestion.countDocuments({ type: 'multiple' });
    console.log(qCount + " questions in DB");

    for (let i = 0; i < 70; i++) {
      let random = Math.floor(Math.random() * qCount)
      let foundQuestion = await dbContext.TriviaQuestion.findOne().skip(random)
      data.push(foundQuestion)
      qCount--

      //move the foundQ to the "deleted" db, then delete it from the trivia db
      // await dbContext.DeletedTriviaQ.create(foundQuestion)
      // let deletedCount = await dbContext.TriviaQuestion.deleteOne(
      //   { question: foundQuestion.question }
      //   ).deletedCount
      // if (deletedCount != 1){
      //   console.error("something has gone wrong with deleting trivia");
      //   return "deletedcount wrong"
      // }
    }
    // console.log("ques data: "+data[0]);
    console.log("ques count: " + data.length);
    return data;
  }


}

export const roundService = new RoundService();
