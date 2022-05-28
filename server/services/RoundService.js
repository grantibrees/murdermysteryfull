import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class RoundService {
  async beginRound() {
    let game = await dbContext.Game.findOne({ gameName: "murdermystery" })
    console.log(game);
    newRoundNumber = game.roundData.count() + 1
    console.log(newRoundNumber);
    let newlyCreatedRound = {
      roundNumber: newRoundNumber,
      phase1Data: {},
      phase2Data: {},
    }
    game.roundData.push(newlyCreatedRound)
    await nextPhase()
    let updatedGame = await dbContext.Game.findOneAndUpdate(
      { gameName: "murdermystery" },
      game
    )
    return updatedGame
  }

  async nextPhase(roundNum, phaseNum) {
    let newlyCreatedPhase = {
      timer: 0,
      questions: [],
    }
    let ques = await questionsLoader()
    for(q in ques){
      newlyCreatedPhase.questions.push(q)
    }
    let game = await dbContext.Game.findOne({ gameName: "murdermystery" })
    let currentRoundData = {}

    if (game.roundData[roundNum - 1] != game.roundData[roundNum - 1].roundNumber) {
      console.log("Something has gone wrong with the round counting")
    } else {
      currentRoundData = game.roundData[roundNum - 1]
      currentRoundData.push(newlyCreatedPhase)
    }

    if (game.currentPhaseNumber == phaseNum && game.currentRoundNumber == roundNum) {

    } else {
      console.log("Looking for the wrong round or phase num");
    }
    return phase
  }

  async questionsLoader() {
    data = []
    for (let i = 0; i < 50; i++) {
      let qCount = await dbContext.TriviaQuestion.count({ type: 'multiple' });
      let random = Math.floor(Math.random() * qCount)
      let foundQuestion = await dbContext.TriviaQuestion.findOne().skip(random)
      data.push(foundQuestion)
    }

    // pick x numbers between 1 and qCount
    // for each i[x], pull it, add it to data, put it in the deleted DB, delete it from the triva db
    // 

    let data = await dbContext.Game.findOne({ gameName: "murdermystery" });
    return data;

  }

  async getRoundData(roundNumber) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
}

export const roundService = new RoundService();
