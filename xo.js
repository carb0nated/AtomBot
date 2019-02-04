const index = require("./index.js");
const help = require("./help.js");

module.exports = {
    start: function(message, atom) { 
        start(message, atom);
    }
};

let command;
var board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let playerOneUsername;
let playerTwoUsername;



/* Main function of the XO game */
function start(message, atom) {
    command = message.content.split(" ");
    checkUsage(message);
}

function welcome(message) {
    message.channel.send(`
[XO] Welcome ${playerOneUsername} and ${playerTwoUsername} to the XO game.
The rules in this game are the same.
In order to play and make your move, you must type
**::xo play [index]**
where *index* is the index of the cell you would like to choose as shown below:

|-----------------|
|   0   |   1   |   2   |
|-----------------|
|   3   |   4   |   5   |
|-----------------|
|   6   |   7   |   8   |
|-----------------|

For example,  **::xo play 4**   will mark the cell '4' with either X or O, depending on your symbol.
Good luck and have fun!`);
}

/* Checks the arguments given by the user */
function checkUsage(message) {
    if (command[1] == 'play') {
        if (message.author.username == playerOneUsername) {
            player1Move(message, command[2]);
            console.log(board);
        } else if (message.author.username == playerTwoUsername) {
            player2Move(message, command[2]);
            console.log(board);
        }
    } else if (command [1] == 'help') {
        help.xo(message);
    } else {
        if(command.length != 4) {
            message.channel.send('[XO] Not enough arguments were given.');
            message.channel.send('Usage: ::xo [player1\'s username] [player2\'s username] [random starting player? Y|N ]. For more help, type ::help');
            return;
        } else {
            if(command[3] != 'Y' && command[3] != 'N' && command[3] != 'y' && command[3] != 'n') {
                message.channel.send('[XO] Incorrect input for third argument (random start? Y|N). You must type either Y or N.');
                return;
            } else {
                playerOneUsername = command[1];
                playerTwoUsername = command[2];
                welcome(message);
                if (command[3] == 'Y' || command[3] == 'y') {
                    randomStart(message, playerOneUsername, playerTwoUsername);
                }
            }
        }
    }
}

/*  */
function checkIfPlayersExist(message, atom, player1, player2) {
    if(message.guild.member(player1) != null) {
        console.log('HE EXISTS!');
    } else {
        console.log(message.guild.member(player1));
    }
    console.log(message.guild.members.some(user => user.username == player1));
    if (message.guild.members.some(user => user.username == player1))  {
        console.log(`It contains player1, aka ${player1}`);
    } else {
        console.log(`Guild does not contain player1, aka ${player1}.`);
    }
}

function isCellEmpty(x) {
    return (board[x] != 'X' && board[x] != 'O');
}

function whoOccupiesCell(x) {
    if (isCellEmpty(x)) {
        return null;
    } else {
        if (board[x] == 'X') {
            return 'X';
        } else {
            return 'O';
        }
    }
}

function player1Move(message, x) {
    if(message.author.username == playerOneUsername) {
        if (isCellEmpty(x)) {
            board[x] = 'X';
        } else {
            message.channel.send(`[XO] Invalid cell, ${playerOneUsername}. Please choose another cell.`);
        }
    }
    printOutBoard(message);
    checkGameOver(message, 'X');
}

function player2Move(message, x) {
    if(message.author.username == playerTwoUsername) {
        if (isCellEmpty(x)) {
            board[x] = 'O';
        } else {
            message.channel.send(`[XO] Invalid cell, ${playerTwoUsername}. Please choose another cell.`);
        }
    }
    printOutBoard(message);
    checkGameOver(message, 'O');
}

function checkGameOver(message, symbol) {
    if (board[0] == symbol && board[1] == symbol && board[2] == symbol) {
        gameOver(message, symbol);
    } else if (board[0] == symbol && board[4] == symbol && board[8] == symbol) {
        gameOver(message, symbol);
    } else if (board[0] == symbol && board[3] == symbol && board[6] == symbol) {
        gameOver(message, symbol);
    } else if (board[6] == symbol && board[7] == symbol && board[8] == symbol) {
        gameOver(message, symbol);
    } else if (board[1] == symbol && board[4] == symbol && board[7] == symbol) {
        gameOver(message, symbol);
    } else if (board[2] == symbol && board[5] == symbol && board[8] == symbol) {
        gameOver(message, symbol);
    } else if (board[3] == symbol && board[4] == symbol && board[5] == symbol) {
        gameOver(message, symbol);
    } else if (board[2] == symbol && board[4] == symbol && board[6] == symbol) {
        gameOver(message, symbol);
    }

    let x = ' ';
    if (board[0] != x && board[1] != x && board[2] != x && board[3] != x && board[4] != x 
        && board[5] != x && board[6] != x && board[7] != x && board[8] != x) {
            gameOver(message, null);
    }
}

function gameOver(message, winner) {
    if (winner == null) {
        message.channel.send('[XO] Game over! There was no winner. gg!')
        cleanup();
        return;
    } else if (winner == 'X' || winner == 'O') {
        winner == 'X' ? message.channel.send(`[XO] Game over! The winner is ${playerOneUsername}!`):null;
        winner == 'O' ? message.channel.send(`[XO] Game over! The winner is ${playerTwoUsername}!`):null;
        cleanup();
        return;
    } else {
        message.channel.send('[XO] An error has occured in XO.gameOver(...).js. Please contact the development team with this message attached and the command you used. Thanks :)');
        cleanup();
        return;
    }
}

function printOutBoard(message) {
    message.channel.send(`
[XO]
|------------------|
|   ${board[0]}   |   ${board[1]}   |   ${board[2]}   |
|------------------|
|   ${board[3]}   |   ${board[4]}   |   ${board[5]}   |
|------------------|
|   ${board[6]}   |   ${board[7]}   |   ${board[8]}   |
|------------------|

`)
}

function randomStart(message, p1, p2) {
    let choices = [p1, p2];
    let chosen = choices[Math.floor(Math.random()*choices.length)];
    message.channel.send(`[XO] The starting player is ${chosen}!`);
}

function cleanup() {
    board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    return;
}

function reset(board, p1, p2) {
    board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    p1 = null;
    p2 = null;
}