import { useState } from 'react'
import './App.css'
import Cell from './Cell/Cell'
import ColorPicker from './ColorPicker/ColorPicker'

const whiteColor = 'white'
const colorList: string[] = [
  'red',
  'blue',
  'cyan',
  'magenta',
  'yellow',
  'black',
  'green'
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
  const [pickerClicked, setPickerClicked] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<{x: number, y: number}>({ x: 0, y: 0 })

  const handleOnClick = (column: number, row: number) => {
    setCellsToColor(
      _currentCells => (
        _currentCells.map(
          (_column, columnIndex) => (
            _column.map(
              (_cell, rowIndex) => {
                let colorToRender = _cell
                if (columnIndex === column && rowIndex === row) {
                  if (_cell === selectedColor) {
                    colorToRender = whiteColor
                  } else {
                    colorToRender = _cell === whiteColor ? selectedColor : whiteColor
                  }
                }
                
                return colorToRender
              }
            )
          )
        )
      )
    )
  }

  const handleContextClick = (x: number, y: number) => {
    setPickerClicked(true)
    setCoordinates({ x, y })
  }

  const handlePickedColor = (color: string) => {
    setSelectedColor(color)
    setPickerClicked(false)
  }

  return (
    <section
      className="app"
      style={{ gridTemplateColumns: `repeat(${columnNumber}, minmax(10px, 1fr))`}}
    >
      {
        cellsToColor.map(
          (column, columnIndex) => (
            <section
              key={columnIndex}
              className='app__column'
              style={{ gridTemplateRows: `repeat(${rowNumber}, 1fr)`}}
            >
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
                        onContextMenu={handleContextClick}
                      />
                    )
                  }
                )
              }
            </section>
          )
        )
      }
      {
        pickerClicked ? (
          <ColorPicker
            colorList={colorList}
            coordinates={coordinates}
            onColorClick={handlePickedColor}
          />
        ) : null
      }
    </section>
  )
}

export default App
