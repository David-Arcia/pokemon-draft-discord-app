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

// Command for starting a draft
const DRAFT_COMMAND = {
  name: 'start-draft',
  description: 'Commands for managing a Pokémon draft',
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

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, DRAFT_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
