function makeGrid (width, height) {
    const container = document.querySelector('#container');

    for (i = 0; i < height; i++){
        let row = document.createElement('div'); // Make new element div
        container.appendChild(row);
        row.classList.add('gridRow');
        for (x = 0; x < width; x++) {
            let cell = document.createElement('div'); // Make new element div
            console.log(i);
            row.appendChild(cell);
            cell.classList.add('gridSquare');
        }
    }

}


makeGrid(16, 16); // Width, height. Default should be 16.