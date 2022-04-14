// Initialisations and constants
const container = document.querySelector('#container')
const colorChoiceOption = document.getElementsByName('color')
const opacityChoiceOption = document.getElementsByName('opacity')
let gridSize = 16
let opacityChoice = 1
let colorChoice = '1, 1, 1, '
let colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`
let currentlyDrawing = true

// Dynamically create a matrix
function makeGrid(width, height) {
  for (i = 0; i < height; i++) {
    let row = document.createElement('div')
    container.appendChild(row)
    row.classList.add('gridRow')
    for (x = 0; x < width; x++) {
      let cell = document.createElement('div')
      row.appendChild(cell)
      cell.classList.add('gridSquare')
    }
  }
  let gridRows = document.querySelectorAll('.gridSquare')
  let gridSquares = document.querySelectorAll('.gridSquare')
  return [gridRows, gridSquares]
}

// Draw on the grid
function applyHoverPen(gridSquares) {
  gridSquares.forEach((gridSquare) => {
    let cellCount = 0
    // Handlers for hover and touchscreen (mobile)
    ;['mouseover', 'touchstart'].forEach((action) =>
      gridSquare.addEventListener(action, (e) => {
        if (currentlyDrawing === true) {
          // Highlight the mouseover grid square
          cellCount += 0.2
          colorOpacityChoice = `rgba(${
            colorChoice + (opacityChoice + cellCount)
          })`
          e.target.style.backgroundColor = colorOpacityChoice
        }
      })
    )
  })

  // Toggle pen on and off
  document.getElementById('container').addEventListener('click', function () {
    if (currentlyDrawing === true) {
      currentlyDrawing = false
    } else {
      currentlyDrawing = true
    }
  })
}

function changeColor() {
  // Handle user inputting a custom colour
  let customColor = document.getElementById('colorPicker')
  customColor.addEventListener('input', () => {
    // Credit for hexToRGB function: https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
    function hexToRGB(hex) {
      var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)
      return `${r}, ${g}, ${b}, `
    }

    colorChoice = hexToRGB(customColor.value)
    colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`
    document.getElementById('custom').value = colorChoice
  })

  // Change pen to a default colour
  colorChoiceOption.forEach((option) => {
    option.addEventListener('click', () => {
      colorChoice = option.value
      colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`
    })
  })

  // Change pen to a new opacity level
  opacityChoiceOption.forEach((option) => {
    option.addEventListener('click', () => {
      if (option.id == 'fade') {
        opacityChoice = 0.1
      } else {
        opacityChoice = 1
      }
      colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`
    })
  })
}

// Reset the grid
function clearGrid(gridSquares) {
  const clearGrid = document.querySelector('#clearGrid')
  clearGrid.addEventListener('click', () => {
    backgroundColor = `rgba(242, 252, 253, 1)`
    gridSquares.forEach((gridSquare) => {
      gridSquare.style.backgroundColor = backgroundColor
    })

    document.getElementById('black').checked = true
    document.getElementById('solid').checked = true
    opacityChoice = 1
    colorChoice = '1, 1, 1, '
    colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`
  })
}

function resizeGrid() {
  let slider = document.getElementById('myRange')
  let output = document.getElementById('gridSize')
  output.innerHTML = slider.value // Display default slider value

  slider.oninput = function () {
    gridSize = this.value
    output.innerHTML = this.value // Display new slider value
    // Get rid of the old grid
    container.querySelectorAll('*').forEach((n) => n.remove())
    // Make the new grid
    enterActiveState(gridSize)
  }
}

function enterActiveState(gridSize = 16) {
  // makeGrid args are width, height - so needn't be square if a rectangle is wanted
  gridArray = makeGrid(gridSize, gridSize)
  let gridSquares = gridArray[1]
  applyHoverPen(gridSquares)
  clearGrid(gridSquares)
  resizeGrid()
  changeColor()
}

enterActiveState()
