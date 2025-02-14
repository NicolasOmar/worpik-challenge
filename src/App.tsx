import { useState } from 'react'
import './App.css'
import Cell from './Cell/Cell'

function App() {
  /**
   * Possible ways to improve
   * Move structure to rows > columns > cells
   * Make the whole structure as an useMemo
   * Make 2 states, row and column
   * Once the cell is clicked, get its row and column
   * The memo will render the structure based on the selected cell while maintaning its current state
   * Check drag events to calculate which cell will be hovered during that moment
   */
  const whiteColor = 'white'
  const colorList: string[] = [
    'red',
    'blue',
    'cyan',
    'magenta',
    'yellow',
    'black'
  ]
  const [cellsToColor, setCellsToColor] = useState<string[]>(Array.from({ length: 20 }).map(() => whiteColor))
  const [selectedColor, setSelectedColor] = useState<string>(colorList[0])

  const handleOnClick = (cellId: number) => {
    setCellsToColor(
      _currentCells => _currentCells.map(
        (_cellColor, _coloredCellIndex) => {
          if (cellId === _coloredCellIndex)  {
            return _cellColor === selectedColor ? whiteColor : selectedColor
          } else {
            return _cellColor
          }
        }
      )
    )

    setSelectedColor(_currentColor => _currentColor === colorList[0] ? colorList[1]: _currentColor)
  }

  return (
    <section className="app">
      {
        Array.from({ length: 5 }).map(
          () => (
            <section>
              {
                cellsToColor.map(
                  (color, i) => <Cell key={i} id={i} color={color} onClick={handleOnClick} />
                )
              }
            </section>
          )
        )
      }
    </section>
  )
}

export default App
