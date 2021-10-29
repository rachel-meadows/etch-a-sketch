function makeGrid (width, height) {
    const container = document.querySelector('#container');

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
    var gridSquares = document.querySelectorAll(".gridSquare");
    return gridSquares;
}

function applyHoverPen(gridSquares) {
    gridSquares.forEach((gridSquare) => {
        // This handler will be executed every time the cursor is moved over a different list item
        gridSquare.addEventListener("mouseover", function( e ) {
            console.log(gridSquare);
            // Highlight the mouseover grid square
            e.target.style.background = `rgba(255, 0, 0, ${0.9})`;
        });

        /* Playing with removing styles:
        gridSquare.addEventListener("mouseleave", e => {
            // Reset the colour after a short delay
            setTimeout(function() {
                e.target.style.background = "";
            }, 500);
        });
        */
    });
}


gridSquares = makeGrid(16, 16); // Width, height. Default should be 16.
applyHoverPen(gridSquares);