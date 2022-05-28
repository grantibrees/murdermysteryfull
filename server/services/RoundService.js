import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class RoundService {
  async beginRound() {
    //pull the game from the db
    let game = await dbContext.Game.findOne({ gameName: "murdermystery" })
    console.log(game);
    //set the next round number
    newRoundNumber = game.roundData.count() + 1
    game.currentRoundNumber = newRoundNumber

    console.log(newRoundNumber);
    //make a new round obj
    let newlyCreatedRound = {
      roundNumber: newRoundNumber,
      phase1Data: {},
      phase2Data: {},
    }
    //push the obj to game data
    game.roundData.push(newlyCreatedRound)

    //update game in db with game.newlyCreatedRound obj
    let gameWithNewRound = await dbContext.Game.findOneAndUpdate(
      { gameName: "murdermystery" },
      game
      )
    console.log(gameWithNewRound);

    let gameWithNewPhase = await nextPhase(newRoundNumber, 0)

    return gameWithNewPhase
  }

  async nextPhase(roundNum, phaseNum) {
    let newlyCreatedPhase = {
      timer: 0,
      questions: [],
    }

    //add questions to array if phase1
    if(phaseNum == 1){
      let ques = await questionsLoader()
      newlyCreatedPhase.questions = [...ques]
    }
    
    //pull the game from db
    let game = await dbContext.Game.findOne({ gameName: "murdermystery" })
    let currentRoundData = {}

    //as long as the index of the round is the same as the roundNum 
    // (which is the round we are currently on), continue
    if (game.roundData[roundNum - 1] != game.roundData[roundNum - 1].roundNumber) {
      console.log("Something has gone wrong with the round counting")
      return error
    }
      //set the round data from the game obj in the db to our currentRoundData obj
      currentRoundData = game.roundData[roundNum - 1]

      //Increase the phase number, and put the new phase into the round.phaseData
      if(phaseNum == 0){
        //5 min
        newlyCreatedPhase.timer = 300000
        currentRoundData.phase1data = newlyCreatedPhase
        game.currentPhaseNumber = 1
      } else if (phaseNum == 1){
        //15 min
        newlyCreatedPhase.timer = 900000
        currentRoundData.phase2data = newlyCreatedPhase
        game.currentPhaseNumber = 2
      } else if (phaseNum == 2){
        game.currentPhaseNumber = 0
      } else {
        console.log("something wrong with phase num")
      }
    // in our game data, set the roundData at the correct index to our currentRoundData obj 
    if (game.currentPhaseNumber != 0){
      game.roundData[roundNum - 1] = currentRoundData
    }
    
    let updatedGame = await dbContext.Game.findOneAndUpdate(
      { gameName: "murdermystery" },
      game
      )

    return updatedGame
  }

  async questionsLoader() {
    data = []
    for (let i = 0; i < 70; i++) {
      let qCount = await dbContext.TriviaQuestion.count({ type: 'multiple' });
      let random = Math.floor(Math.random() * qCount)
      let foundQuestion = await dbContext.TriviaQuestion.findOne().skip(random)
      data.push(foundQuestion)

      //move the foundQ to the "deleted" db, then delete it from the trivia db
      await dbContext.DeletedTriviaQ.create(foundQuestion)
      let deletedCount = await dbContext.TriviaQuestion.deleteOne(
        { question: foundQuestion.question }
        ).deletedCount
      if (deletedCount != 1){
        console.error("something has gone wrong with deleting trivia");
        return "deletedcount wrong"
      }
    }
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
