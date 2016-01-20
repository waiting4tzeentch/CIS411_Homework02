/****************************************************************************/
/*                                                                          */
/* Author: Michael Opper Moser                                              */
/*                                                                          */
/****************************************************************************/

$(function() {

	var playerTurn 	= 1;				// field for holding player turn
										// initialized for player 1
	var table		= $('table');		// holds the values for the board
	var messages	= $('.messages');	// holds messages
	var turn		= $('.turn');		// holds the turn number
	var playPattern = 'xValue';			// holds the pattern for current player
										// initialized for player 1 (x)

	// display current player's turn
	getNextPlayer(turn, playerTurn);

	// click action
	$('td').click(function() {
		td = $(this);
		var state = getState(td);
		// check if box has been used, if not proceed
		if(!state) {
			// change box pattern to player's pattern
			setState(td, playPattern);

			// check win condition, if player won, display message
			if (checkWinCondition(table, playPattern)) {
				messages.html('Player '+playerTurn+' has won!');
				turn.html('');
			}
			// else set next player
			else {
				playerTurn = setNextPlayer(playerTurn);
				getNextPlayer(turn, playerTurn);
			}
		} // END: if (!state)
		else {
			messages.html('This box has been used and is now dirty. Find your own box!');
		}
	}); // END: td click function

	$('.reset').click(function() {
		playerTurn = 1;
		messages.html ('');
		newGame(table);
		getNextPlayer(turn, playerTurn);
	}); // END: reset button click function

}); // END: root function

function newGame(table) {
	// find each table data and remove the xValue and oValue from it
	table.find('td').each(function() {
		$(this).removeClass('xValue').removeClass('oValue');
	});
}

function getState(td) {
	// if table data is either xValue or oValue return 1
	if (td.hasClass('xValue') || td.hasClass('oValue')) {
		return 1;
	}
	else {
		return 0;
	}
}

function setState(td, pattern) {
	// set the table data element with a css class
	return td.addClass(pattern);
}

function getNextPlayer (turn, player) {
	turn.html('Player turn: '+player);
}

// check playerTurn and return the opposite value
function setNextPlayer(playerTurn) {
	if (playerTurn == 1) {
		return playerTurn = 2;
		return playPattern = 'oValue';
	}
	else {
		return playerTurn = 1;
		return playPattern = 'xValue';
	}
}

// returns a 1 if three patterns in a row, column, or diagonal are the same
function checkWinCondition(table, pattern) {
	var won = 0;
	// check each row for same value
	if(table.find('.box1').hasClass(pattern) &&
		table.find('.box2').hasClass(pattern) &&
		table.find('.box3').hasClass(pattern)){
			won = 1;
		}
	else if (table.find('.box4').hasClass(pattern) &&
		table.find('.box5').hasClass(pattern) &&
		table.find('.box6').hasClass(pattern)){
			won = 1;
		}
	else if (table.find('.box7').hasClass(pattern) &&
		table.find('.box8').hasClass(pattern) &&
		table.find('.box9').hasClass(pattern)){
			won = 1;
		}
	// check each column for same pattern
	else if (table.find('.box1').hasClass(pattern) &&
		table.find('.box4').hasClass(pattern) &&
		table.find('.box7').hasClass(pattern)){
			won = 1;
		}
	else if (table.find('.box2').hasClass(pattern) &&
		table.find('.box5').hasClass(pattern) &&
		table.find('.box8').hasClass(pattern)){
			won = 1;
		}
	else if (table.find('.box3').hasClass(pattern) &&
		table.find('.box6').hasClass(pattern) &&
		table.find('.box9').hasClass(pattern)){
			won = 1;
		}
	// check if diagonals have same pattern
	else if (table.find('.box1').hasClass(pattern) &&
		table.find('.box5').hasClass(pattern) &&
		table.find('.box9').hasClass(pattern)){
			won = 1;
		}
	else if (table.find('.box3').hasClass(pattern) &&
		table.find('.box5').hasClass(pattern) &&
		table.find('.box7').hasClass(pattern)){
			won = 1;
		}
	return won;
}



