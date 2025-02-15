import { useState } from 'react'
import TableToColor from '@components/TableToColor/TableToColor'
import { Coordinates } from './interfaces'
import './App.css'

const whiteColor = 'white'
const selectableColors: string[] = ['red', 'blue', 'cyan', 'magenta', 'yellow', 'black', 'green']
const columnNumber = 100
const rowNumber = 100

function App() {
  /**
   * Check drag events to calculate which cell will be hovered during that moment
   */
  const [cellsToColor, setCellsToColor] = useState<string[][]>(
    Array.from({ length: columnNumber }).map(() =>
      Array.from({ length: rowNumber }).map(() => whiteColor)
    )
  )
  const [selectedColor, setSelectedColor] = useState<string>(selectableColors[0])
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [pickerCoordinates, setPickerCoordinates] = useState<Coordinates>({ xAxis: 0, yAxis: 0 })

  const handleCellClick = (column: number, row: number) => {
    setCellsToColor(_currentCells =>
      _currentCells.map((_column, columnIndex) =>
        _column.map((_cell, rowIndex) => {
          let colorToRender = _cell
          if (columnIndex === column && rowIndex === row) {
            if (_cell === whiteColor) {
              colorToRender = selectedColor
            } else {
              colorToRender = _cell !== selectedColor ? selectedColor : whiteColor
            }
          }

          return colorToRender
        })
      )
    )
  }

  const handleContextClick = (xAxis: number, yAxis: number) => {
    setShowPicker(true)
    setPickerCoordinates({ xAxis, yAxis })
  }

  const handleColorSelection = (color: string) => {
    setSelectedColor(color)
    setShowPicker(false)
  }

  return (
    <section
      className="table__container"
      style={{ gridTemplateColumns: `repeat(${columnNumber}, 1fr)` }}
    >
      <TableToColor
        tableStructure={cellsToColor}
        pickedAppears={showPicker}
        pickerCoordinates={pickerCoordinates}
        selectableColorsList={selectableColors}
        onCellClick={handleCellClick}
        onContextClick={handleContextClick}
        onSelectColor={handleColorSelection}
      />
    </section>
  )
}

export default App
