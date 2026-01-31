import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

// Command for generating a new draft
const INIT_DRAFT_COMMAND = {
  name: 'init-draft',
  description: 'Begin a new draft instance',
  type: 1,
  options: [

    {
      type: 4,
      name: "team-size",
      description: "Number of pokemon each player drafts",
      required: true,
      min_value: 1,
      max_value: 30
    },
    {
      type: 4,
      name: "budget",
      description: "Total budget per player",
      required: true,
      min_value: 1
    },
  ]
}

// Command for starting the existing draft
const START_DRAFT_COMMAND = {
  name: 'start-draft',
  description: 'Begin drafting with current draft instance',
  type: 1,
}

//Add players to draft
const ADD_PLAYER_COMMAND = {
  name: 'add-player',
  description: 'Add a player to the draft',
  type: 1,
  options: [

    {
      type: 6,
      name: "player",
      description: "the player to add",
      required: true,
    },
  ]
}

//Remove players to draft
const REMOVE_PLAYER_COMMAND = {
  name: 'remove-player',
  description: 'Remove a player from the draft',
  type: 1,
  options: [

    {
      type: 6,
      name: "player",
      description: "the player to remove",
      required: true,
    },
  ]
}

//See player list
const SEE_PLAYERS_COMMAND = {
  name: 'see-players',
  description: 'See all prospective players in the draft',
  type: 1,
}

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, INIT_DRAFT_COMMAND, START_DRAFT_COMMAND, ADD_PLAYER_COMMAND, REMOVE_PLAYER_COMMAND, SEE_PLAYERS_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
