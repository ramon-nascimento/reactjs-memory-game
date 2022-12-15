import { useState } from 'react'

import './App.css'

interface Cell {
  row: number;
  column: number;
}

function App() {
  const grid = [
    [1, 2, 3, 4],
    [5, 6, 5, 6],
    [1, 4, 2, 3]
  ]

  const [isRevealed, setIsRevealed] = useState(
    new Array(grid.length).fill('').map(() => 
      new Array(grid[0].length).fill(false)
    )
  )

  const [firstNumber, setFirstNumber] = useState<Cell>()

  function revealCardHandler(row: number, column: number) {
    if (isRevealed[row][column]) return

    const currentNumber = grid[row][column]
    const newRevealedArray = [ ...isRevealed ]
    newRevealedArray[row][column] = true

    setIsRevealed(newRevealedArray)

    if (firstNumber) {
      const number = grid[firstNumber.row][firstNumber.column]

      if (number !== currentNumber) {
        setTimeout(() => {
          newRevealedArray[row][column] = false
          newRevealedArray[firstNumber.row][firstNumber.column] = false

          setIsRevealed([ ...newRevealedArray ])
        }, 1000);
      } else {
        const youWon = isRevealed.flat().every(item => item)

        if (youWon) {
          setTimeout(() => {
            alert('Você ganhou!')
          }, 600);
        }
      }

      setFirstNumber(undefined)
    } else {
      setFirstNumber({ row, column })
    }
  }

  return (
    <div className="App">
      <h1>Jogo da Memória</h1>
      {
        grid.map((row, rowIndex) => (
          <div key={rowIndex} className='grid'>
            {
              row.map((column, columnIndex) => (
                <div 
                  key={columnIndex} 
                  className={`card ${isRevealed[rowIndex][columnIndex] ? 'clicked' : ''}`} 
                  onClick={() => revealCardHandler(rowIndex, columnIndex)}
                >
                  {isRevealed[rowIndex][columnIndex] && <span>{column}</span>}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default App
