export class Pokemon {
  constructor({name:string, value:number}) {
    this.name = name;
    this.value = value;
  }
}

export class Player {
  constructor(props = { discordAccount: string, numberOfPokemon: number, budget: number}) {
    this.discordAccount = props.discordAccount;
    this.budget = props.budget;
    this.numberOfPokemon = props.numberOfPokemon;
    this.draftedPokemon = new Set();
  }

  static addPokemon(pokemon) {
    if(isValidPokemon(pokemon))
    { 
      this.draftedPokemon.add(pokemon);
      return true;
    }
    return false;
  }

  static isValidPokemon(pokemon) {
    //no repeats
    if(this.draftedPokemon.has(pokemon)){
      return false;
    }
    //no overbudget
    if(getCurrentValue() + pokemon["value"] > this.budget) {
      return false;
    }
    //no going over the legal amount of pokemon (should never be hit, but just in case)
    if(this.draftedPokemon.size() >= this.numberOfPokemon) {
      return false;
    }
    return true;
  }

  static getCurrentValue() {
    let sum = 0;
    for (const item of mySet) {
      sum += item.value;
    }
    return sum;
  }
}

export class DraftOrganizer {
  constructor(props = {budget: number, numberOfPokemon: number, period: number}) {
    this.budget = props.budget;
    this.numberOfPokemon = props.numberOfPokemon;
    this.period = props.period;
    //Final player list that contains player objects
    this.players = []
    //String list of players who are added via command
    this.prospectivePlayers = []
    this.isRunning = false;
  }

  lockAndRunDraft() {
    this.isRunning = true;
    this.players = this.constructPlayers(this.prospectivePlayers)
    console.log("run draft");
    //Todo: turn on when more infrastrcture ready
    //this.runDraft();
  }

  addPlayer(userName) {
    if (this.isRunning) {
      return;
    }
    this.prospectivePlayers.push(userName);
  }

  removePlayer(userName) {
    if (this.isRunning) {
      return;
    }
    for (let i = 0; i < this.prospectivePlayers.length; i++) {
      console.log(this.prospectivePlayers[i]);
      console.log(userName);
      if (this.prospectivePlayers[i] == userName) {
        this.prospectivePlayers = this.prospectivePlayers.toSpliced(i, 1);
      }
    }
  }

  constructPlayers(players){
    let playerList = [];

    for(player in players) {
      playerList.push(new Player(player, this.numberOfPokemon, this.budget));
    }
    return playerList;
  }

  runDraft() {
    let draftStage = 0;

    const queue = [...this.players];
    const stack = [];
    const deliquents = [];

    while(draftStage < this.numberOfPokemon) {
      while(queue.length() < 0){
        this.notify(queue[0]);
        const isSuccessful = this.awaitPlayer(queue[0]); //idk how this works
        if(isSuccessful){
          queue.push(queue[0]);
        } else {
          deliquents.push(queue[0])
        }
        queue.shift();
      }
      draftStage++;
      while(queue.length() > 0){

      }
    } 

    while(deliquents.length() > 0) {
      this.notify(deliquents[0]);
      const isSuccessful = this.awaitPlayer(deliquents[0]); //idk how this works
      if(!isSuccessful) {
        deliquents.push(deliquents[0]);
      } 
      deliquents.shift();
    }
  }

  awaitPlayer(player){
    //use discord hook to get input from player
    //const pokemon 
  }

  
  notify(player){

    //use discord hook to message player its their turn
    //continue;

  }

  //Announce to the server something
  announce(message){

  }

  getProspectivePlayersString(){
    if (this.prospectivePlayers.length == 0) {
      return "No Players In Draft"
    }
    let acc = '';
    for (let i = 0; i < this.prospectivePlayers.length; i++) {
      acc+= `<@${this.prospectivePlayers[i]}>\n`;
    }
    return acc;
  }


}