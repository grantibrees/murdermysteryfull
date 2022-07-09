import { dbContext } from "../database/DbContext";
import O from "esm"


class GameStartup {
  randomSessionCodeGenerator() {
    let genderatedCode = []
    let code = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    for (let i = 1; i <= 4; i++) {
      let index = Math.floor(Math.random() * code.length)
      genderatedCode.push(code[index])
    }
    return genderatedCode.join('')
  }

  //TODO pull in identities list based on player count
makeIdentitiesList(playerCount) {
    let fullIdentitiesList = [
      "Redeye", "Ironwire", "Glassknife", "Ghost", "Cloak", "Cyborg", "Bugger", "Netrunner", "Nighthawk", "Blade", "Greyhat"
    ];

    let identCount = 0;
    let newIdentList = [];
    let occurences = { "total": 0 };

    console.log("player count: "+ playerCount);

    if (playerCount < 6) {
      console.error("something wrong, too few players!");
    } else if (playerCount > 21) {
      console.error("something wrong, too many players!");
    } else if (playerCount == 6) {
      identCount = 4;
    // added additional constraint here and on line 17
    } else if (playerCount >= 7 && playerCount < 11) {
      identCount = 5;
    } else if (playerCount >= 11 && playerCount < 16) {
      identCount = 6;
    } else if (playerCount >= 16) {
      identCount = 7;
    }
    
    occurences["distribution"] = Math.floor((playerCount * 2) / identCount);

    for (let i = 0; i < identCount; i++) {
      newIdentList = this.getRandomIdentity(fullIdentitiesList, newIdentList)
    }
    console.log("newIdentList: " + newIdentList);

    let permutations_arr = this.permutations(newIdentList, occurences);
    let edited_arr = this.editArr(permutations_arr, playerCount, occurences);
    
    // for (let i = 0; i < edited_arr.length; i++) {
    //   console.log("edited array item: " + edited_arr[i]);
    //   console.log("editied array type: " + typeof(edited_arr[i]));
    // }
    // console.log("editied array type: " + typeof(edited_arr));
    let final_arr = this.assignIdenitities(edited_arr)
    return final_arr
}

getRandomIdentity(fullIdentitiesList, newIdentList) {
    let randomIdent = fullIdentitiesList[Math.floor(Math.random() * fullIdentitiesList.length)];
    if (newIdentList.includes(randomIdent)) {
      getRandomIdentity(fullIdentitiesList, newIdentList)
    } else {
      newIdentList.push(randomIdent);
    }
    return newIdentList
}

permutations(array, obj) {
    // in the object, also update the integer value of each key
    let result = array.reduce( (acc, v, i) => 
      acc.concat(array.slice(i+1).map( (w, index) => {
        if (v in obj) {
          obj[v]++;
        } else {
          obj[v] = 1;
        }
        
        if (w in obj) {
          obj[w]++;
        } else {
          obj[w] = 1;
        }
        
        obj["total"]++;
        return [v, w]
      })), 
    []);
    return result
}

editArr(array, playerCount, obj) {
  let distribution = obj["distribution"];
  while (array.length > playerCount) {
    let index = Math.floor(Math.random()*array.length)
    let ident1 = array[index][0];
    let ident2 = array[index][1];
    if (obj[ident1] > distribution && obj[ident2] > distribution) {
      array.splice(index, 1);
      obj[ident1]--;
      obj[ident2]--;
    } else {
      continue;
    }
  }
  return array
}


getRandomIdentity(fullIdentitiesList, newIdentList) {
  let randomIdent = fullIdentitiesList[Math.floor(Math.random() * fullIdentitiesList.length)]
  if (newIdentList.includes(randomIdent)) {
    this.getRandomIdentity(fullIdentitiesList, newIdentList)
  } else {
    newIdentList.push(randomIdent)
  }
  return newIdentList
}

  //Creates a list of possible identities to use based on the player count
  async setIdentityList(playerCount) {
    let identitiesList = this.makeIdentitiesList(playerCount)
    let uniqueCombosCount = playerCount
    console.log("identList length: " + identitiesList.length);
    if (identitiesList.length == 4){
      uniqueCombosCount = 6
    } else if (identitiesList.length == 5) {
      uniqueCombosCount = 10
    }else if (identitiesList.length == 6) {
      uniqueCombosCount = 15
    }else if (identitiesList.length == 7) {
      uniqueCombosCount = 21
    } else {
      console.error("something went wrong in identlist length");
    }
    console.log("uniqueCombosCount: " + uniqueCombosCount);

    let usableIdentitiesList = []
    let offset = 1

    while (usableIdentitiesList.length < uniqueCombosCount) {
      let newIdentArr = this.createIdentPair(identitiesList, offset)
      usableIdentitiesList = newIdentArr.concat(usableIdentitiesList)
      offset++
    }
    console.log("list length b4: " + usableIdentitiesList.length);
    for (let i = 0; i < usableIdentitiesList.length; i++) {
      // console.log(usableIdentitiesList[i]);
    }


    for (let i = 0; i < usableIdentitiesList.length; i++) {
      //TODO loop through and compare ident1 to ident 2 and vice versa
      let swapped = { "ident1": usableIdentitiesList[i].ident2, "ident2": usableIdentitiesList[i].ident1 }
      for (let j = 0; j < usableIdentitiesList.length; j++) {
        if (swapped.ident1 == usableIdentitiesList[j].ident1 && swapped.ident2 == usableIdentitiesList[j].ident2) {
          let splicedDuplicate = usableIdentitiesList.splice(usableIdentitiesList[j], 1)
          // console.log(splicedDuplicate);
        } else {
        }
      }
    }

    // console.log("list length splice: " + usableIdentitiesList.length);
    return usableIdentitiesList
  }

  createIdentPair(identitiesList, offset) {
    let pairList = []
    for (let i = 0; i < identitiesList.length; i++) {
      let pointer = i + offset
      if (pointer == identitiesList.length) {
        pointer = 0
      }
      if (identitiesList[i] != null && identitiesList[pointer] != null) {
        let identPair = { "ident1": identitiesList[i], "ident2": identitiesList[pointer] }
        pairList.push(identPair)
      }
    }
    return pairList
  }


  assignIdenitities(identityArray){
    //pull in players from db
    let players = await dbContext.Game.players.find();
    //loop thru players
    //for each player, assign index from identity array
    console.log("un-updated players from db: " + players);
    for (let i = 0; i < players.length; i++) {
      //for each identity pair in the identity array, assign it to ident slot 1 and 2
      players[i].identity1 = identityArray[i][0]
      players[i].identity1 = identityArray[i][1]
    }
    let updatedPlayers = await dbContext.Game.findOneAndUpdate(
      { players: players})
    console.log("updated players: " + players);
    console.log("db looks like this now: " +updatedPlayers)
    return
  }


}
export const gameStartup = new GameStartup();