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
	add_icon("44", "rook", "black"); // 00
	 $("#44").addClass("rook blackRook0 blackPiece");
	  board[4][4].set_piece("blackRook0");
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
	add_icon("43", "king", "black"); // 04
   $("#43").addClass("king blackKing blackPiece");
	  board[4][3].set_piece("blackKing");
	add_icon("74", "king", "white"); // 74
   $("#74").addClass("king whiteKing whitePiece");
	  board[7][4].set_piece("whiteKing");
};

function add_icon(pos, piece)
{
	$("#" + pos + "Icon").addClass("fas fa-chess-" + piece);
};



var selected = false;
var availableClass = "";
var removableClass = "available";
var selectedPiece = "";

function toggle_available_spaces()
{
	if(selected === false)
	{
		console.log("not active");
		selected = true;
		availableClass = "available";
		removableClass = "";
	}
	else
	{
		console.log("active");
		selected = false;
		availableClass= "";
		removableClass = "available";
		remove_available_spaces();
	}

};

function remove_available_spaces()
{
	console.log("removable class: " + removableClass);
	$(".available").removeClass(removableClass);
}

$(document.body).on("click", ".available", function(){var gotoPlace = $(this).attr("id"); move_piece(gotoPlace);});

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

$(document.body).on("click", ".blackPawn0", function(){});


function knight_movement(piece, friendlyColor, opponentColor)
{
	toggle_available_spaces();
	selectedPiece = piece.substring(1, piece.length);
	var currentPos = $(piece).attr('id'); // Get the current position of the piece
	var projectedPosition;
	var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
	var pieceX = parseInt(currentPos.substring(0, 1), 10);

	function check_knight_position(inputPosition)
	{
		try
		{
			// If the projected position doesn't have a friendly piece in it, we can move to it
			if(!$(inputPosition).attr('class').includes(friendlyColor + "Piece"))
			{
				$(inputPosition).removeClass(removableClass).addClass(availableClass);
			}
		}
		catch(TypeError) // If the position is out of bounds
		{} // Do nothing, don't attempt to activate the place
	}

	// Add highlighting to the knight's space
	$("#" + currentPos).removeClass(removableClass).addClass(availableClass);

	projectedPosition = ("#" + (pieceX - 2) + (pieceY - 1)); // -2x -1y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX - 2) + (pieceY + 1)); // -2x +1y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 2) + (pieceY - 1)); // +2x -1y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 2) + (pieceY + 1)); // +2x +1y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX - 1) + (pieceY + 2)); // -1x +2y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX - 1) + (pieceY - 2)); // -1x -2y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY - 2)); // +1x -2y
	check_knight_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY + 2)); // +1x +2y
	check_knight_position(projectedPosition);
};

function rook_movement(piece, friendlyColor, opponentColor)
{
	toggle_available_spaces();
	selectedPiece = piece.substring(1, piece.length);
	var currentPos = $(piece).attr('id'); // Get the current position of the piece
	var projectedPosition;
	var pieceY = currentPos.substring(1, 2);
	var pieceX = currentPos.substring(0, 1);

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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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
	toggle_available_spaces();
	selectedPiece = piece.substring(1, piece.length);
	var currentPos = $(piece).attr('id'); // Get the current position of the piece
	var projectedPosition;
	var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
	var pieceX = parseInt(currentPos.substring(0, 1), 10);

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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
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

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
		currentX--;
		currentY--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes(opponentColor + "Piece"))
		{
			break;
		}
	}
};

function queen_movement(piece, friendlyColor, opponentColor)
{
	bishop_movement(piece, friendlyColor, opponentColor);
	rook_movement(piece, friendlyColor, opponentColor);
};

function king_movement(piece, friendlyColor, opponentColor)
{
	toggle_available_spaces();
	selectedPiece = piece.substring(1, piece.length);
	var currentPos = $(piece).attr('id'); // Get the current position of the piece
	var projectedPosition;
	var pieceY = parseInt(currentPos.substring(1, 2), 10); // Cast to int so we can do arithmetic with the position
	var pieceX = parseInt(currentPos.substring(0, 1), 10);

	function check_king_position(inputPosition)
	{
		try
		{
			// If the projected position doesn't have a friendly piece in it, we can move to it
			if(!$(inputPosition).attr('class').includes(friendlyColor + "Piece"))
			{
				$(inputPosition).removeClass(removableClass).addClass(availableClass);
			}
		}
		catch(TypeError) // If the position is out of bounds
		{} // Do nothing, don't attempt to activate the place
	};

	// Add the current position as an available place
	$("#" + currentPos).removeClass(removableClass).addClass(availableClass);

	projectedPosition = ("#" + (pieceX - 1) + (pieceY - 1)); // -1x -1y
	check_king_position(projectedPosition);
	projectedPosition = ("#" + (pieceX - 1) + (pieceY + 1)); // -1x +1y
	check_king_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY - 1)); // +1x -1y
	check_king_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 1) + (pieceY + 1)); // +1x +1y
	check_king_position(projectedPosition);
	projectedPosition = ("#" + (pieceX - 1) + pieceY); // -1x
	check_king_position(projectedPosition);
	projectedPosition = ("#" + (pieceX + 1) + pieceY); // +1x
	check_king_position(projectedPosition);
	projectedPosition = ("#" + pieceX + (pieceY + 1)); // +1y
	check_king_position(projectedPosition);
	projectedPosition = ("#" + pieceX + (pieceY - 1)); // -1y
	check_king_position(projectedPosition);

};

function pawn_movement(piece, friendlyColor, opponentColor)
{

};

function move_piece(id) // id: place to which we're moving
{
	var currentPos = $("." + selectedPiece).attr("id"); // Get the current position of the piece
	var currentIcon = $("#" + currentPos + "Icon").attr("class");
	currentIconName = currentIcon.substring(currentIcon.lastIndexOf("-") + 1); // Get the type of piece from the icon

	var classes = $("#" + currentPos).attr("class"); // Get all classes for the current position
	classes = classes.substring(11, classes.length); // Take everything after the black/white Place class
	classes = classes.replace("available", "");
	// $(".available").removeClass("available");

	console.log("classes: " + classes);

	$("#" + currentPos).removeClass(classes);
	$("#" + currentPos + "Icon").removeClass();

	$("#" + id).addClass(classes);

	add_icon(id, currentIcon);
	remove_available_spaces();
}
