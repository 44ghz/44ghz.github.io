const MAX_BOARD_HEIGHT = 8;
const MAX_BOARD_WIDTH = 8;
var board = new Array(MAX_BOARD_WIDTH); // Creating the rows

$(document).ready(function(){
	generate_board();
});

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
		// addIcon sets the display icon of the place with the piece that belongs
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
	addIcon("00", "rook", "black");
	 $("#00").addClass("blackRook0 blackPiece");
	  board[0][0].set_piece("blackRook0");
	addIcon("07", "rook", "black");
	 $("#07").addClass("blackRook1 blackPiece");
	  board[0][7].set_piece("blackRook1");

	addIcon("70", "rook", "white");
	 $("#70").addClass("whiteRook0 whitePiece");
	  board[7][0].set_piece("whiteRook0");
	addIcon("77", "rook", "white");
	 $("#77").addClass("whiteRook1 whitePiece");
	  board[7][7].set_piece("whiteRook1");


	// Adding KNIGHT
	addIcon("01", "knight", "black");
	 $("#01").addClass("blackKnight0 blackPiece");
	  board[0][1].set_piece("blackKnight0");
	addIcon("06", "knight", "black");
	 $("#06").addClass("blackKnight1 blackPiece");
	  board[0][6].set_piece("blackKnight1");

	addIcon("71", "knight", "white");
	 $("#71").addClass("whiteKnight0 whitePiece");
	  board[7][1].set_piece("whiteKnight0");
	addIcon("76", "knight", "white");
	 $("#76").addClass("whiteKnight1 whitePiece");
	  board[7][6].set_piece("whiteKnight1");


	// Adding BISHOP
	addIcon("02", "bishop", "black");
	 $("#02").addClass("blackBishop0 blackPiece");
	  board[0][2].set_piece("blackBishop0");
	addIcon("05", "bishop", "black");
	 $("#05").addClass("blackBishop1 blackPiece");
	  board[0][5].set_piece("blackBishop1");

	addIcon("72", "bishop", "white");
	 $("#72").addClass("whiteBishop0 whitePiece");
	  board[7][2].set_piece("whiteBishop0");
	addIcon("75", "bishop", "white");
	 $("#75").addClass("whiteBishop1 whitePiece");
	  board[7][5].set_piece("whiteBishop1");


	// Adding QUEEN
	addIcon("03", "queen", "black");
	 $("#03").addClass("blackQueen blackPiece");
	  board[0][3].set_piece("blackQueen");
	addIcon("73", "queen", "white");
	 $("#73").addClass("whiteQueen whitePiece");
		board[7][3].set_piece("whiteQueen");


	// Adding KING
	addIcon("04", "king", "black");
   $("#04").addClass("blackKing blackPiece");
	  board[0][4].set_piece("blackKing");
	addIcon("74", "king", "white");
   $("#74").addClass("whiteKing whitePiece");
	  board[7][4].set_piece("whiteKing");
}

function addIcon(pos, piece)
{
	$("#" + pos + "Icon").addClass("fas fa-chess-" + piece);
}



var selected = false;
var availableClass = "";
var removeableClass = "";

$(document.body).on("click", '.blackRook0', function(){
	if(selected === false)
	{
		selected = true;
		availableClass = "available";
		removableClass = "";
	}
	else
	{
		selected = false;
		availableClass= "";
		removableClass = "available";
	}

	var currentPos = $(".blackRook0").attr('id'); // Get the current position of the piece
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
		if(($(projectedPosition).attr('class').includes("blackPiece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
		xPositive++;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes("whitePiece"))
		{
			break;
		}
	}
	while(yPositive < MAX_BOARD_WIDTH)
	{
		projectedPosition = ("#" + pieceX + yPositive);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes("blackPiece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
		yPositive++;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes("whitePiece"))
		{
			break;
		}
	}
	while(yNegative > -1)
	{
		projectedPosition = ("#" + pieceX + yNegative);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes("blackPiece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
		yNegative--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes("whitePiece"))
		{
			break;
		}

	}
	while(xNegative > -1)
	{
		projectedPosition = ("#" + xNegative + pieceY);

		// If the next piece is the same color, break because we can't capture nor move past it
		if(($(projectedPosition).attr('class').includes("blackPiece")) &&
			(projectedPosition !== "#" + currentPos))
		{
			break;
		}

		$(projectedPosition).removeClass(removableClass).addClass(availableClass);
		xNegative--;

		// If the next piece is of the opposite color, allow it to be captured
		if($(projectedPosition).attr('class').includes("whitePiece"))
		{
			break;
		}
	}
});



$(document.body).on("click", '.blackRook0', function(){

});

$(document.body).on("click", '.blackPawn0', function(){

});
