// randomly return Rock / Paper / Scissors

/* Array of game data
 * Each entry contains an array with two items:
 * [0] - choice
 * [2] - object choice "beats"
 */
const choiceWinners = [
	["rock", "scissors"],
	["paper", "rock"],
	["scissors", "paper"],
];

// set score for game up here, game() will update this
let playerScore = 0;
let computerScore = 0;

let currentPlayerChoice = "";
let currentComputerChoice = "";
let currentResult = "";
let currentRoundMessage = "";

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
	button.addEventListener("click", drawResults);
});

/////////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////////

function drawResults(event) {
	console.log(event);
	const targetRoundMessage = document.querySelector(".current-game");
	const targetPlayerTotal = document.querySelector(".results .player .total");
	const targetPlayerDetail = document.querySelector(".results .player .detail");
	const targetComputerTotal = document.querySelector(
		".results .computer .total",
	);
	const targetComputerDetail = document.querySelector(
		".results .computer .detail",
	);
	const targetResultTotal = document.querySelector(".results .result .total");
	const targetResultDetail = document.querySelector(".results .result .detail");
	currentRoundMessage = playRound(event.target.id, getComputerChoice());
	targetRoundMessage.textContent = currentRoundMessage;

	targetPlayerTotal.textContent = `Player Score: ${playerScore}`;
	targetComputerTotal.textContent = `Computer Score: ${computerScore}`;
	targetResultTotal.textContent = `${
		playerScore > computerScore
			? "Player"
			: computerScore > playerScore
			? "Computer"
			: "No one"
	} is winning!`;

	targetPlayerDetail.innerHTML += `${currentResult}: ${currentPlayerChoice}<br />`;
	targetComputerDetail.innerHTML += `${currentComputerChoice}<br />`;
	targetResultDetail.innerHTML += `You ${currentResult}!!<br />`;

	// add styling to winner / loser box to change shades if player is losing
	if (playerScore < computerScore) {
		targetResultTotal.classList.add("lose");
	} else {
		targetResultTotal.classList.remove("lose");
	}
}

function cleanedChoice(choice) {
	const firstCharacter = choice.charAt(0);
	return firstCharacter.toUpperCase() + choice.slice(1).toLowerCase();
}

function getComputerChoice() {
	const computerChoice = Math.floor(Math.random() * 3);
	return choiceWinners[computerChoice][0];
}

function getChoiceWinnerArray(choice) {
	for (const choiceWinner of choiceWinners) {
		if (choiceWinner[0] === choice.toLowerCase()) {
			return choiceWinner;
		}
	}
	return false;
}

// play a single round of the game
// player selection should be case insensitive!
function playRound(playerSelection, computerSelection) {
	const playerChoiceLower = playerSelection.toLowerCase();
	const choiceWinner = getChoiceWinnerArray(playerChoiceLower);
	let returnResult = "";

	currentPlayerChoice = cleanedChoice(playerSelection);
	currentComputerChoice = cleanedChoice(computerSelection);

	if (!choiceWinner) {
		currentResult = "FORFIET";
		returnResult = `You selected neither Rock, Paper, nor Scissors!
      You have chosen not to play,
      and therefore have both lost and not lost...`;
	}

	if (currentPlayerChoice === currentComputerChoice) {
		currentResult = "DRAW";
		returnResult = `You both chose ${currentComputerChoice}! It's a draw!`;
	} else if (choiceWinner[1] === computerSelection) {
		playerScore++;
		currentResult = "WIN";
		returnResult = `You Win! ${currentPlayerChoice} beats ${currentComputerChoice}!`;
	} else {
		computerScore++;
		currentResult = "LOSE";
		returnResult = `You Lose! ${currentPlayerChoice} beats ${currentComputerChoice}!`;
	}

	return returnResult;
}
