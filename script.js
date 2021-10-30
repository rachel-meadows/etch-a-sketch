// Constants
const container = document.querySelector('#container');
let gridSize = 16;
let colourChoice = "black";

function makeGrid (width, height) {
    for (i = 0; i < height; i++){
        let row = document.createElement('div'); // Make new element div
        container.appendChild(row);
        row.classList.add('gridRow');
        for (x = 0; x < width; x++) {
            let cell = document.createElement('div'); // Make new element div
            row.appendChild(cell);
            cell.classList.add('gridSquare');
        }
    }
    var gridRows = document.querySelectorAll(".gridSquare");
    var gridSquares = document.querySelectorAll(".gridSquare");
    return [gridRows, gridSquares];
}

function applyHoverPen(gridSquares) {
    gridSquares.forEach((gridSquare) => {
        // This handler will be executed every time the cursor is moved over a different list item
        gridSquare.addEventListener("mouseover", function( e ) {
            // Highlight the mouseover grid square
            e.target.classList.add('activeCell');
        });
    });
}

function clearGrid(gridSquares) {
    const clearGrid = document.querySelector('#clearGrid');
    clearGrid.addEventListener("click", function( e ) {
        gridSquares.forEach((gridSquare) => {
            gridSquare.classList.remove('activeCell');
        });
    });
}

function resizeGrid() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display default slider value
    
    slider.oninput = function() {
        gridSize = this.value;
        output.innerHTML = this.value; // Display new slider value
        // Get rid of the old grid
        container.querySelectorAll('*').forEach(n => n.remove());
        // Make the new grid
        enterActiveState(gridSize);
    }
}

function enterActiveState (gridSize=16) {
    gridArray = makeGrid(gridSize, gridSize); // Width, height - so needn't be square if wanted later
    let gridRows = gridArray[0];
    let gridSquares = gridArray[1];
    applyHoverPen(gridSquares);
    clearGrid(gridSquares);
    resizeGrid();
}

// Calling the functions!
enterActiveState();
