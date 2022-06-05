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
    ]
    let identCount = 0
    let newIdentList = []

    if (playerCount < 6) {
      console.error("something wrong, too few players!");
    } else if (playerCount > 21) {
      console.error("something wrong, too many players!");
    } else if (playerCount == 6) {
      identCount = 4
    } else if (playerCount >= 7) {
      identCount = 5
    } else if (playerCount >= 11) {
      identCount = 6
    } else if (playerCount >= 16) {
      identCount = 7
    }

    for (let i = 0; i < identCount; i++) {
      newIdentList = this.getRandomIdentity(fullIdentitiesList, newIdentList)
    }
    console.log("newIdentList: " + newIdentList);
    return newIdentList
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
  setIdentityList(playerCount) {
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
      console.log(usableIdentitiesList[i]);
    }


    for (let i = 0; i < usableIdentitiesList.length; i++) {
      //TODO loop through and compare ident1 to ident 2 and vice versa
      let swapped = { "ident1": usableIdentitiesList[i].ident2, "ident2": usableIdentitiesList[i].ident1 }
      for (let j = 0; j < usableIdentitiesList.length; j++) {
        if (swapped.ident1 == usableIdentitiesList[j].ident1 && swapped.ident2 == usableIdentitiesList[j].ident2) {
          let splicedDuplicate = usableIdentitiesList.splice(usableIdentitiesList[j], 1)
          console.log(splicedDuplicate);
        } else {
        }
      }
    }

    console.log("list length splice: " + usableIdentitiesList.length);
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




}
export const gameStartup = new GameStartup();