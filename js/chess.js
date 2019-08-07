const MAX_BOARD_HEIGHT = 8;
const MAX_BOARD_WIDTH = 8;
var board = new Array(MAX_BOARD_WIDTH); // Creating the rows

$(document).ready(function(){generate_board();});

class Space
{
	piece = "none"; // What piece the space posesses
	constructor(position, top, bottom, left, right)
	{
		this.position = position;
		this.top = top; // What's on top of the space
		this.bottom = bottom; // What's below it, etc.
		this.left = left;
		this.right = right;
	}

	set_piece(inPiece)
	{
		this.piece = inPiece;
	}
};



////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    GENERATION    ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function generate_board()
{
	/////////////////////////////////////////////////////////////////////////////////////////////
	// NOTE: Plane is rotated by 90 degrees, with the origin located at the top left of the table
	/////////////////////////////////////////////////////////////////////////////////////////////

	for(var x = 0; x < MAX_BOARD_WIDTH; x++)
	{
		$("#chessBoard").append("<tr>");
		board[x] = new Array(MAX_BOARD_HEIGHT); // Creating the column for this row

		for(var y = 0; y < MAX_BOARD_HEIGHT; y++)
		{
			// Calculating the various positions around the piece for later use in movement calculations
			var currentPosition = x.toString() + y.toString();
			var currentTop = x.toString() + (y + 1).toString();
			var currentBottom = x.toString() + (y - 1).toString();
			var currentLeft = (x - 1).toString() + y.toString();
			var currentRight = (x + 1).toString() + y.toString();
			var spaceColor;

			board[x][y] = new Space(currentPosition, currentTop, currentBottom, currentLeft, currentRight);

			// If the current position has at least one axis that's currently even, color it black
			if(((x % 2 == 0) && (y % 2 != 0)) || (x % 2 != 0) && (y % 2 == 0)) // Coloring the squares
			{
				spaceColor = "blackPlace";
			}
			else // If both axes are odd, color it white
			{
				spaceColor = "whitePlace";
			}

			$("#chessBoard").append("<td class='" + spaceColor + "' id='" + currentPosition + "'><i id='" + currentPosition + "Icon'></i></td>");
		}
		$("#chessBoard").append("</tr>");
	}

	add_pieces();
};

function add_pieces()
{
	// NOTE: Placement of pieces occurs in three steps:
		// add_icon sets the display icon of the place with the piece that belongs
		// $("###").addClass will add an instance of that piece to the table cell, for use in event handling on clicks
		// board[x][y].set_piece will alter the object being held in that space


	// Adding PAWN
	for(var i = 0; i < MAX_BOARD_HEIGHT; i++)
	{
		$("#1" + i + "Icon").addClass("fas fa-chess-pawn");
		$("#6" + i + "Icon").addClass("fas fa-chess-pawn");

		board[1][i].set_piece("blackPawn" + i); // Updating the data grid
		board[6][i].set_piece("whitePawn" + i);

		$("#1" + i).addClass("blackPawn" + i + " blackPiece"); // Adding the pieces to the table cells
		$("#6" + i).addClass("whitePawn" + i + " whitePiece")
	}

	// Adding ROOK
	add_icon("00", "rook", "black"); // 00
	 $("#00").addClass("rook blackRook0 blackPiece");
	  board[0][0].set_piece("blackRook0");
	add_icon("07", "rook", "black"); // 07
	 $("#07").addClass("rook blackRook1 blackPiece");
	  board[0][7].set_piece("blackRook1");

	add_icon("70", "rook", "white"); // 70
	 $("#70").addClass("rook whiteRook0 whitePiece");
	  board[7][0].set_piece("whiteRook0");
	add_icon("77", "rook", "white"); // 77
	 $("#77").addClass("rook whiteRook1 whitePiece");
	  board[7][7].set_piece("whiteRook1");


	// Adding KNIGHT
	add_icon("01", "knight", "black"); // 01
	 $("#01").addClass("knight blackKnight0 blackPiece");
	  board[0][1].set_piece("blackKnight0");
	add_icon("06", "knight", "black"); // 06
	 $("#06").addClass("knight blackKnight1 blackPiece");
	  board[0][6].set_piece("blackKnight1");

	add_icon("71", "knight", "white"); // 71
	 $("#71").addClass("knight whiteKnight0 whitePiece");
	  board[7][1].set_piece("whiteKnight0");
	add_icon("76", "knight", "white"); // 76
	 $("#76").addClass("knight whiteKnight1 whitePiece");
	  board[7][6].set_piece("whiteKnight1");


	// Adding BISHOP
	add_icon("02", "bishop", "black"); // 02
	 $("#02").addClass("bishop blackBishop0 blackPiece");
	  board[0][2].set_piece("blackBishop0");
	add_icon("05", "bishop", "black"); // 05
	 $("#05").addClass("bishop blackBishop1 blackPiece");
	  board[0][5].set_piece("blackBishop1");

	add_icon("72", "bishop", "white"); // 72
	 $("#72").addClass("bishop whiteBishop0 whitePiece");
	  board[7][2].set_piece("whiteBishop0");
	add_icon("75", "bishop", "white"); // 75
	 $("#75").addClass("bishop whiteBishop1 whitePiece");
	  board[7][5].set_piece("whiteBishop1");


	// Adding QUEEN
	add_icon("03", "queen", "black"); // 03
	 $("#03").addClass("queen blackQueen blackPiece");
	  board[0][3].set_piece("blackQueen");
	add_icon("73", "queen", "white"); // 73
	 $("#73").addClass("queen whiteQueen whitePiece");
		board[7][3].set_piece("whiteQueen");


	// Adding KING
	add_icon("04", "king", "black"); // 04
   $("#04").addClass("king blackKing blackPiece");
	  board[0][4].set_piece("blackKing");
	add_icon("74", "king", "white"); // 74
   $("#74").addClass("king whiteKing whitePiece");
	  board[7][4].set_piece("whiteKing");
};

function add_icon(pos, piece)
{
	$("#" + pos + "Icon").addClass("fas fa-chess-" + piece);
};



////////////////////////////////////////////////////////////////////////////////
///////////////////////////////    GAMEPLAY    /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

{ // Bracketed to hide during editing :)
$(document.body).on("click", ".available", function(){var gotoPlace = $(this).attr("id");move_piece(gotoPlace)});

$(document.body).on("click", ".blackRook0", function(){rook_movement(".blackRook0", "black", "white");});
$(document.body).on("click", ".blackRook1", function(){rook_movement(".blackRook1", "black", "white");});
$(document.body).on("click", ".whiteRook0", function(){rook_movement(".whiteRook0", "white", "black");});
$(document.body).on("click", ".whiteRook1", function(){rook_movement(".whiteRook1", "white", "black");});

$(document.body).on("click", ".blackKnight0", function(){knight_movement(".blackKnight0", "black", "white");});
$(document.body).on("click", ".blackKnight1", function(){knight_movement(".blackKnight1", "black", "white");});
$(document.body).on("click", ".whiteKnight0", function(){knight_movement(".whiteKnight0", "white", "black");});
$(document.body).on("click", ".whiteKnight1", function(){knight_movement(".whiteKnight1", "white", "black");});

$(document.body).on("click", ".blackBishop0", function(){bishop_movement(".blackBishop0", "black", "white");});
$(document.body).on("click", ".blackBishop1", function(){bishop_movement(".blackBishop1", "black", "white");});
$(document.body).on("click", ".whiteBishop0", function(){bishop_movement(".whiteBishop0", "white", "black");});
$(document.body).on("click", ".whiteBishop1", function(){bishop_movement(".whiteBishop1", "white", "black");});

$(document.body).on("click", ".whiteQueen", function(){queen_movement(".whiteQueen", "white", "black");});
$(document.body).on("click", ".blackQueen", function(){queen_movement(".blackQueen", "black", "white");});

$(document.body).on("click", ".whiteKing", function(){king_movement(".whiteKing", "white", "black");});
$(document.body).on("click", ".blackKing", function(){king_movement(".blackKing", "black", "white");});

$(document.body).on("click", ".whitePawn0", function(){pawn_movement(".whitePawn0", "white", "black");});
$(document.body).on("click", ".whitePawn1", function(){pawn_movement(".whitePawn1", "white", "black");});
$(document.body).on("click", ".whitePawn2", function(){pawn_movement(".whitePawn2", "white", "black");});
$(document.body).on("click", ".whitePawn3", function(){pawn_movement(".whitePawn3", "white", "black");});
$(document.body).on("click", ".whitePawn4", function(){pawn_movement(".whitePawn4", "white", "black");});
$(document.body).on("click", ".whitePawn5", function(){pawn_movement(".whitePawn5", "white", "black");});
$(document.body).on("click", ".whitePawn6", function(){pawn_movement(".whitePawn6", "white", "black");});
$(document.body).on("click", ".whitePawn7", function(){pawn_movement(".whitePawn7", "white", "black");});

$(document.body).on("click", ".blackPawn0", function(){pawn_movement(".blackPawn0", "black", "white");});
$(document.body).on("click", ".blackPawn1", function(){pawn_movement(".blackPawn1", "black", "white");});
$(document.body).on("click", ".blackPawn2", function(){pawn_movement(".blackPawn2", "black", "white");});
$(document.body).on("click", ".blackPawn3", function(){pawn_movement(".blackPawn3", "black", "white");});
$(document.body).on("click", ".blackPawn4", function(){pawn_movement(".blackPawn4", "black", "white");});
$(document.body).on("click", ".blackPawn5", function(){pawn_movement(".blackPawn5", "black", "white");});
$(document.body).on("click", ".blackPawn6", function(){pawn_movement(".blackPawn6", "black", "white");});
$(document.body).on("click", ".blackPawn7", function(){pawn_movement(".blackPawn7", "black", "white");});
}

var pieceSelected = false;
var pawnArray = new Array();
var availableClass = "";
var removableClass = "";
var availableShape = "";
var removableShape = "";
var selectedPiece = ""; // The id that's currently selected

function toggle_available_spaces()
{
	if(!pieceSelected) // If a piece was just selected
	{
		pieceSelected = true; // Set the piece as selected
		availableClass = "available";
		availableShape = "availableCircle";
		removableClass = "";
		removableShape = "";
	}
	else // If a piece was already selected and the player selected something else
	{
		pieceSelected = false;
		removableClass = "available";
		removableShape = "availableCircle";
		availableClass = "";
		availableShape = "";
		$("." + removableClass).removeClass(removableClass);
		$("." + removableShape).removeClass(removableShape);
	}
};

function check_piece_surroundings(inputPosition, friendlyColor)
{
	try
	{
		// If the projected position doesn't have a friendly piece in it, we can move to it
		if(!$(inputPosition).attr('class').includes(friendlyColor + "Piece"))
		{
			add_available_space(inputPosition);
		}
	}
	catch(TypeError) // If the position is out of bounds
	{} // Do nothing, don't attempt to activate the place
};

function add_available_space(inputPosition)
{
	$(inputPosition).removeClass(removableClass).addClass(availableClass);
	if(!$(inputPosition).attr('class').includes("Piece")) // If the place doesn't have a piece on it
	{
		$(inputPosition).append("<div class=" + availableShape + "></div>");
	}
};

function knight_movement(piece, friendlyColor, opponentColor)
{
	var currentPos = $(piece).attr('id'); // Get the current position of the piece

	try
	{
		var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
		var pieceX = parseInt(currentPos.substring(0, 1), 10);
	}
	catch(TypeError) // If the piece no longer exists
	{
		return; // If not returned, the player(s) will have to click an extra time to reset the piece selection
	}

	toggle_available_spaces();

	selectedPiece = piece.substring(1, piece.length);
	var projectedPosition;

	// Add highlighting to the knight's space
	$("#" + currentPos).removeClass(removableClass).addClass(availableClass);

	projectedPosition = ("#" + (pieceX - 2) + (pieceY - 1)); // -2x -1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX - 2) + (pieceY + 1)); // -2x +1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 2) + (pieceY - 1)); // +2x -1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 2) + (pieceY + 1)); // +2x +1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX - 1) + (pieceY + 2)); // -1x +2y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX - 1) + (pieceY - 2)); // -1x -2y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY - 2)); // +1x -2y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY + 2)); // +1x +2y
	check_piece_surroundings(projectedPosition, friendlyColor);
};

function rook_movement(piece, friendlyColor, opponentColor)
{
	var currentPos = $(piece).attr('id'); // Get the current position of the piece

	try
	{
		var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
		var pieceX = parseInt(currentPos.substring(0, 1), 10);
	}
	catch(TypeError) // If the piece no longer exists
	{
		return; // If not returned, the player(s) will have to click an extra time to reset the piece selection
	}

	toggle_available_spaces();

	selectedPiece = piece.substring(1, piece.length);
	var projectedPosition;

	var yPositive = pieceY;
	var yNegative = pieceY;
	var xPositive = pieceX;
	var xNegative = pieceX;

	while(xPositive < MAX_BOARD_HEIGHT)
	{
		projectedPosition = ("#" + xPositive + pieceY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		xPositive++;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}
	while(xNegative > -1)
	{
		projectedPosition = ("#" + xNegative + pieceY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		xNegative--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}

	while(yPositive < MAX_BOARD_WIDTH)
	{
		projectedPosition = ("#" + pieceX + yPositive);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		yPositive++;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}
	while(yNegative > -1)
	{
		projectedPosition = ("#" + pieceX + yNegative);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		yNegative--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}

};

function bishop_movement(piece, friendlyColor, opponentColor)
{
	var currentPos = $(piece).attr('id'); // Get the current position of the piece

	try
	{
		var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
		var pieceX = parseInt(currentPos.substring(0, 1), 10);
	}
	catch(TypeError) // If the piece no longer exists
	{
		return; // If not returned, the player(s) will have to click an extra time to reset the piece selection
	}

	toggle_available_spaces();

	selectedPiece = piece.substring(1, piece.length);
	var projectedPosition;
	var currentX = pieceX;
	var currentY = pieceY;

	while((currentX > -1) && (currentY < MAX_BOARD_WIDTH)) // North East movement
	{
		projectedPosition = ("#" + currentX + currentY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		currentX--;
		currentY++;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}

	currentX = pieceX;
	currentY = pieceY;

	while((currentX < MAX_BOARD_HEIGHT) && (currentY < MAX_BOARD_WIDTH)) // South East movement
	{
		projectedPosition = ("#" + currentX + currentY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		currentX++;
		currentY++;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}

	currentX = pieceX;
	currentY = pieceY;

	while((currentX < MAX_BOARD_HEIGHT) && (currentY > -1)) // South West movement
	{
		projectedPosition = ("#" + currentX + currentY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		currentX++;
		currentY--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}

	currentX = pieceX;
	currentY = pieceY;

	while((currentX > -1) && (currentY > -1)) // North West movement
	{
		projectedPosition = ("#" + currentX + currentY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes(friendlyColor + "Piece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		add_available_space(projectedPosition);
		currentX--;
		currentY--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}
};

function queen_movement(piece, friendlyColor, opponentColor) // FIX
{
	bishop_movement(piece, friendlyColor, opponentColor);
	toggle_available_spaces();
	rook_movement(piece, friendlyColor, opponentColor);
};

function king_movement(piece, friendlyColor, opponentColor)
{
	var currentPos = $(piece).attr('id'); // Get the current position of the piece

	try
	{
		var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
		var pieceX = parseInt(currentPos.substring(0, 1), 10);
	}
	catch(TypeError) // If the piece no longer exists
	{
		return; // If not returned, the player(s) will have to click an extra time to reset the piece selection
	}

	toggle_available_spaces();

	selectedPiece = piece.substring(1, piece.length);
	var projectedPosition;

	// Add the current position as an available place
	$("#" + currentPos).removeClass(removableClass).addClass(availableClass);

	projectedPosition = ("#" + (pieceX - 1) + (pieceY - 1)); // -1x -1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX - 1) + (pieceY + 1)); // -1x +1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY - 1)); // +1x -1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY + 1)); // +1x +1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX - 1) + pieceY); // -1x
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + (pieceX + 1) + pieceY); // +1x
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + pieceX + (pieceY + 1)); // +1y
	check_piece_surroundings(projectedPosition, friendlyColor);
	projectedPosition = ("#" + pieceX + (pieceY - 1)); // -1y
	check_piece_surroundings(projectedPosition, friendlyColor);

};

function pawn_movement(piece, friendlyColor, opponentColor)
{
	var currentPos = $(piece).attr('id'); // Get the current position of the piece

	try
	{
		var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
		var pieceX = parseInt(currentPos.substring(0, 1), 10);
	}
	catch(TypeError) // If the piece no longer exists
	{
		return; // If not returned, the player(s) will have to click an extra time to reset the piece selection
	}

	toggle_available_spaces();

	selectedPiece = piece.substring(1, piece.length);
	var projectedPosition;
	var moveDirection = 0; // Depends on the color of the pawn. White -> moveDirection = negative; Black -> moveDirection = positive

	if(friendlyColor == "white")
	{
		moveDirection = -1;
	}
	else
	{
		moveDirection = 1;
	}

	// Add the current position as an available place
	$("#" + currentPos).removeClass(removableClass).addClass(availableClass);

	projectedPosition = ("#" + (pieceX + moveDirection) + (pieceY)); // The place in front of the pawn
	var diagonalPosition1 = ("#" + (pieceX + moveDirection) + (pieceY + moveDirection)); // Pawns can only take pieces diagonal to them
	var diagonalPosition2 = ("#" + (pieceX + moveDirection) + (pieceY - moveDirection));


	// Checking for available spaces for the diagonal positions
	// If there is an opposing piece, the pawn can take it
	try
	{
		if($(diagonalPosition2).attr("class").includes(opponentColor + "Piece"))
		{
			add_available_space(diagonalPosition2);
		}
	}
	catch(TypeError) // If there is an invalid place, just cancel
	{} // Do nothing

	try
	{
		if($(diagonalPosition1).attr("class").includes(opponentColor + "Piece"))
		{
			add_available_space(diagonalPosition1);
		}
	}
	catch(TypeError) // If there is an invalid place, just cancel
	{} // Do nothing

	try
	{
		if(!$(projectedPosition).attr("class").includes("Piece")) // If there isn't a piece in the way of the pawn
		{
			check_piece_surroundings(projectedPosition, friendlyColor);

			if(check_pawn_movement(piece)) // If the pawn hasn't moved yet, it can move two spaces
			{
				projectedPosition = ("#" + (pieceX + (moveDirection * 2)) + (pieceY));
				if(!$(projectedPosition).attr("class").includes("Piece")) // If there isn't a piece in the way of the pawn
				{
					check_piece_surroundings(projectedPosition, friendlyColor);
				}
			}
		}
	}
	catch(TypeError) // If there is an invalid place, just cancel
	{} // Do nothing
};

function check_pawn_movement(inputPiece)
{
	if(pawnArray.includes(inputPiece)) // If the pawn has moved before
	{
		return false; // It's only allowed to move one space
	}
	else
	{
		return true; // It's allowed to move two spaces, return true
	}
};

function move_piece(gotoPlace) // gotoPlace: place to which we're moving
{
	toggle_available_spaces();
	var currentPos = $("." + selectedPiece).attr("id"); // Get the current position of the piece

	if(currentPos === gotoPlace)
	{
		toggle_available_spaces();
		return;
	}

	if(selectedPiece.includes("Pawn"))
	{
		pawnArray.push("." + selectedPiece); // Add it to the array
	}

	var currentIcon = $("#" + currentPos + "Icon").attr("class");
	currentIconName = currentIcon.substring(currentIcon.lastIndexOf("-") + 1); // Get the type of piece from the icon

	var classes = $("#" + currentPos).attr("class"); // Get all classes for the current position
	var projectedClasses = $("#" + gotoPlace).attr("class"); // Get all classes for the position to which we're moving

	classes = classes.substring(11, classes.length); // Take everything after the 'black/white Place' class (keep the square on the board)
	projectedClasses = projectedClasses.substring(11, projectedClasses.length); // Get the classes for the piece to which we're moving

	classes = classes.replace("available", ""); // Remove the 'available' class from both places, to end the turn
	projectedClassse = projectedClasses.replace("available", "");

	$("#" + currentPos).removeClass(classes); // Remove all classes except the square color from the place we're at
	$("#" + currentPos + "Icon").removeClass(); // Remove the icon

	$("#" + gotoPlace).removeClass(projectedClasses); // Remove all classes except the square color from the place to which we're moving
	$("#" + gotoPlace + "Icon").removeClass(); // Remove the icon

	$("#" + gotoPlace).addClass(classes); // Add the classes from the current position to the place we're going

	add_icon(gotoPlace, currentIconName); // Add the icon to the place we're going
};
