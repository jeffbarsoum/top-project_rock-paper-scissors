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
const numberOfRounds = 5;

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
	if (!choiceWinner) {
		console.log(
			"You selected neither Rock, Paper, nor Scissors! You have chosen not to play, and therefore have both lost and not lost...",
		);
		return;
	}

	if (playerChoiceLower === computerSelection) {
		console.log(
			`You both chose ${cleanedChoice(playerSelection)}! It's a draw!`,
		);
		return;
	}

	if (choiceWinner[1] === computerSelection) {
		playerScore++;
		console.log(
			`You Win! ${cleanedChoice(playerSelection)} beats ${cleanedChoice(
				computerSelection,
			)}!`,
		);
		return;
	} else {
		computerScore++;
		console.log(
			`You Lose! ${cleanedChoice(computerSelection)} beats ${cleanedChoice(
				playerSelection,
			)}!`,
		);
		return;
	}
}

function game() {
	// call playRound 5 times
	// keep score, report winner w/ console.log
	let timesPlayed = 0;

	while (timesPlayed < numberOfRounds) {
		const playerChoice = prompt("Rock? Paper? Or Scissors??");
		playRound(playerChoice, getComputerChoice());
		timesPlayed++;
	}

	console.log(
		`Your final score is ${playerScore}. The computer's score is ${computerScore}. ${
			playerScore > computerScore ? "You Win!" : ""
		}`,
	);
}

// game();

console.log("Hello Worldy!");
