import { useCallback, useState } from 'react'
import TableToColor from '@components/TableToColor/TableToColor'
import { CellCoordinates, Coordinates } from './interfaces'
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
  const [isDraggingMouse, setIsDraggingMouse] = useState<boolean>(false)
  const [movedCell, setMovedCell] = useState<CellCoordinates>({ column: 0, row: 0 })

  const handleTableRender = useCallback(
    (column: number, row: number) => {
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
    },
    [selectedColor, whiteColor, setCellsToColor]
  )

  const handleCellClick = (column: number, row: number) => handleTableRender(column, row)

  const handleDragStart = (column: number, row: number) => {
    console.warn('handleDragStart')
    setIsDraggingMouse(true)
    handleTableRender(column, row)
  }

  const handleMouseMove = (column: number, row: number) => {
    const isSameCell = column === movedCell.column && row === movedCell.row
    console.warn('handleMouseMove', { column, row }, movedCell, isSameCell)
    if (isDraggingMouse && !isSameCell) {
      handleTableRender(column, row)
      setMovedCell({ column, row })
    }
  }

  const handleDragStop = () => setIsDraggingMouse(false)

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
        onCellDragStart={handleDragStart}
        onCellMouseMove={handleMouseMove}
        onCellDragStop={handleDragStop}
        onContextClick={handleContextClick}
        onSelectColor={handleColorSelection}
      />
    </section>
  )
}

export default App
