// Constants
const container = document.querySelector('#container');
const colorChoiceOption = document.getElementsByName('color');
let gridSize = 16;
let opacityChoice = 1;
let colorChoice = "1, 1, 1, ";
let colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`;

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
            e.target.style.backgroundColor = colorOpacityChoice;
        });
    });
}

function changeColor() {
    colorChoiceOption.forEach((option) => {
        // This handler will be executed every time the user clicks a different radio button
        option.addEventListener("click", function( e ) {
            if (option.id == "fade") {
                opacityChoice = 0.5;
            } else {
                opacityChoice = 1;
                colorChoice = option.value;
                console.log(option.value)
                console.log(colorOpacityChoice);
            }
            colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`;
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
    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
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
    changeColor();
}

// Calling the functions!
enterActiveState();
