var col = 9;
var row = 9;

var N = 9;

var stack = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var x;
var y;

var SRN; // square root of N
var K; // No. Of missing digits

let button;

var grid =               [[3,  , 6, 5,  , 8, 4,  ,   ],
                         [ 5, 2,  ,  ,  ,  ,  ,  ,   ],
                         [  , 8, 7,  ,  ,  ,  , 3, 1 ],
                         [  ,  , 3,  , 1,  ,  , 8,   ],
                         [ 9,  ,  , 8, 6, 3,  ,  , 5 ],
                         [  , 5,  ,  , 9,  , 6,  ,   ],
                         [ 1, 3,  ,  ,  ,  , 2, 5,   ],
                         [  ,  ,  ,  ,  ,  ,  , 7, 4 ],
                         [  ,  , 5, 2,  , 6, 3,  ,   ]];

var storage =            [[3, 0, 6, 5, 0, 8, 4, 0, 0 ],
                         [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
                         [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
                         [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
                         [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
                         [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
                         [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
                         [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
                         [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]];
var mat =               [[3, 0, 6, 5, 0, 8, 4, 0, 0 ],
                         [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
                         [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
                         [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
                         [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
                         [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
                         [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
                         [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
                         [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]];
storage = mat;


var hor = 1000;
var ver = 1000;

var input;
// var buttons;

function setup(){
  var canvas = createCanvas(hor, ver);
  canvas.parent("sketch-holder");
  
  // input = createInput();
  // input.position(600, 300);
  // buttons = createButton("submit");

  // buttons.position(160, 30);
  // buttons.mousePressed(myInput);
  
  // button = createButton('Solve Sudoku');
  // button.position(10000,200);
  // button.style('background-color', color(22,165,150));
  // button.mouseClicked(solve);

//   var x = document.getElementById("hi");
//   $('#hi').on('click', function(solve) {
//   event.preventDefault(); // To prevent following the link (optional)
// });

        this.N = N;
        this.K = K;
        var SRNd = Math.sqrt(N);
}
// function myInput() {
//   grid = this.value();
// }
function draw(){
  background(25,25,25);

    // button.mousePressed(solve(grid, 0, 0));

  for( var i = 0; i < col; i++) {
    for( var j = 0; j < row; j++){
        x = i * 111;
        y = j * 111;

        fill(19,39,67);
        tint(255, 255);
        stroke(104,44,14);
        strokeWeight(4);
        rect(x, y, 111, 111);

        textSize(40);
        textFont("Poppins");
        noStroke();
        fill(255,65,77);
        x = i * 111;
        y = j * 111;
        if(storage[j][i] == 0){
          fill(22,165,150);
          text(grid[j][i], x + 40 , y + 65);
        }else{
          text(grid[j][i], x + 45 , y + 65);
    }
    }
  }
}

function isSafe(grid,  row, col, num)
{
     
    // Check if we find the same num 
    // in the similar row , we return 0
    for (var x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return 0;
 
    // Check if we find the same num in the 
    // similar column , we return 0
    for (var x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return 0;
 
    // Check if we find the same num in the 
    // particular 3*3 matrix, we return 0
    var startRow = row - row % 3, 
                 startCol = col - col % 3;
   
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (grid[i + startRow][j + 
                          startCol] == num)
                return 0;
 
    return 1;
}
 
/* Takes a partially filled-in grid and attempts
to assign values to all unassigned locations in
such a way to meet the requirements for
Sudoku solution (non-duplication across rows,
columns, and boxes) */
function solveSuduko(grid, row, col)
{
     
    // Check if we have reached the 8th row 
    // and 9th column (0
    // indexed matrix) , we are 
    // returning true to avoid
    // further backtracking
    if (row == N - 1 && col == N)
        return 1;
 
    //  Check if column value  becomes 9 ,
    //  we move to next row and
    //  column start from 0
    if (col == N) 
    {
        row++;
        col = 0;
    }
   
    // Check if the current position 
    // of the grid already contains
    // value >0, we iterate for next column
    if (grid[row][col] > 0)
        return solveSuduko(grid, row, col + 1);
 
    for (var num = 1; num <= N; num++) 
    {
         
        // Check if it is safe to place 
        // the num (1-9)  in the
        // given row ,col  ->we move to next column
        if (isSafe(grid, row, col, num)==1) 
        {
            /* assigning the num in the 
               current (row,col)
               position of the grid
               and assuming our assined num 
               in the position
               is correct     */
            grid[row][col] = num;
           
           
            if (solveSuduko(grid, row, col + 1)==1)
                return 1;
        }
       
        grid[row][col] = 0;
    }
    return 0;
}

function solve(){

 if (solveSuduko(grid, 0, 0)==1){
        textSize(40);
        noStroke();
        fill(255,65);
    for( var i = 0; i < col; i++) {
    for( var j = 0; j < row; j++){
        x = i * 111;
        y = j * 111;
        if(storage[j][i] == 0){
          fill(22,165,150);
          text(grid[j][i], x + 50 , y + 75);
        }else{
          text(grid[j][i], x + 50 , y + 75);
        }
      }
    }
  } 

}


//Gen Sudoku



function fillValues(){

    fillDiagonal();
        // Fill remaining blocks
    fillRemaining(0, SRN);
        // Remove Randomly K digits to make game
    removeKDigits();
}

function fillDiagonal()
    {

        for (var i = 0; i<N; i=i+SRN)

            // for diagonal box, start coordinates->i==j
            fillBox(i, i);
    }

    // Returns false if given 3 x 3 block contains num.
    function unUsedInBox(rowStart, colStart, num)
    {
        for (var i = 0; i<SRN; i++){
            for (var j = 0; j<SRN; j++){
                if (mat[rowStart+i][colStart+j]==num){
                    return false;}}}
        return true;
    }
  

     function fillRemaining(i, j)
    {
        //  System.out.println(i+" "+j);
        if (j>=N && i<N-1)
        {
            i = i + 1;
            j = 0;
        }
        if (i>=N && j>=N)
            return true;

        if (i < SRN)
        {
            if (j < SRN)
                j = SRN;
        }
        else if (i < N-SRN)
        {
            if (j==(i/SRN)*SRN)
                j =  j + SRN;
        }
        else
        {
            if (j == N-SRN)
            {
                i = i + 1;
                j = 0;
                if (i>=N)
                    return true;
            }
        }

        for ( var num = 1; num<=N; num++)
        {
            if (CheckIfSafe(i, j, num))
            {
                mat[i][j] = num;
                if (fillRemaining(i, j+1))
                    return true;

                mat[i][j] = 0;
            }
        }
        return false;
    }

    // Remove the K no. of digits to
    // complete game
    function removeKDigits()
    {
        var count = K;
        while (count != 0)
        {
            var cellId = randomGenerator(N*N);

            // System.out.println(cellId);
            // extract coordinates i  and j
            var i = (cellId/N);
            var j = cellId%9;
            if (j != 0)
                j = j - 1;

            // System.out.println(i+" "+j);
            if (mat[i][j] != 0)
            {
                count--;
                mat[i][j] = 0;
            }
        }
    }

     function fillBox(row,col)
    {
        var num;
        for (var i=0; i<SRN; i++)
        {
            for (var j=0; j<SRN; j++)
            {
                do
                {
                    num = randomGenerator(N);
                }
                while (!unUsedInBox(row, col, num));

                mat[row+i][col+j] = num;
            }
        }
    }

    // Random generator
    function randomGenerator(num)
    {
        return Math.floor((Math.random()*num+1));
    }

     function CheckIfSafe(i, j, num)
    {
        return (unUsedInRow(i, num) &&
                unUsedInCol(j, num) &&
                unUsedInBox(i-i%SRN, j-j%SRN, num));
    }

    function unUsedInRow(i,num)
    {
        for (var j = 0; j<N; j++)
            if (mat[i][j] == num)
                return false;
        return true;
    }

    // check in the row for existence
    function unUsedInCol(j,num)
    {
        for (var i = 0; i<N; i++)
            if (mat[i][j] == num)
                return false;
        return true;
    }