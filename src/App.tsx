import { useState } from 'react'
import './App.css'
import Cell from './Cell/Cell'

const whiteColor = 'white'
const colorList: string[] = [
  'red',
  'blue',
  'cyan',
  'magenta',
  'yellow',
  'black'
]
const columnNumber = 100
const rowNumber = 100

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
  const [cellsToColor, setCellsToColor] = useState<string[][]>(
    Array.from({ length: columnNumber }).map(
      () => (
        Array.from({ length: rowNumber }).map(
          () => whiteColor
        )
      )
    )
  )
  const [selectedColor, setSelectedColor] = useState<string>(colorList[0])

  const handleOnClick = (column: number, row: number) => {
    setCellsToColor(
      _currentCells => (
        _currentCells.map(
          (_column, columnIndex) => (
            _column.map(
              (_cell, rowIndex) => {
                let colorToRender = _cell
                if (columnIndex === column && rowIndex === row) {
                  colorToRender = _cell !== whiteColor ? whiteColor : selectedColor
                }
                
                return colorToRender
              }
            )
          )
        )
      )
    )
    setSelectedColor(colorList[0])
  }

  return (
    <section className="app">
      {
        cellsToColor.map(
          (column, columnIndex) => (
            <section key={columnIndex} className='app__column'>
              {
                column.map(
                  (cellColor, rowIndex) => {
                    return (
                      <Cell
                        key={`${columnIndex}-${rowIndex}`}
                        column={columnIndex}
                        row={rowIndex}
                        color={cellColor}
                        onClick={handleOnClick}
                      />
                    )
                  }
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
