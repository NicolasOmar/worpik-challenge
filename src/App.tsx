import { useCallback, useState } from 'react'
import TableToColor from '@components/TableToColor/TableToColor'
import ColorPicker from '@components/ColorPicker/ColorPicker'
import { ScreenCoordinates } from './interfaces'
import './App.css'

const whiteColor = 'white'
const selectableColors: string[] = [
  'red',
  'blue',
  'cyan',
  'magenta',
  'yellow',
  'black',
  'green',
  'brown'
]
const columnNumber = 100
const rowNumber = 100

function App() {
  /**
   * To imrpove
   * Include fade in and fade out in ColorPicker
   * Improve drag and select performance
   * Adjust documentation for better references
   */
  const [cellsToColor, setCellsToColor] = useState<string[][]>(
    Array.from({ length: columnNumber }).map(() =>
      Array.from({ length: rowNumber }).map(() => whiteColor)
    )
  )
  const [selectedColor, setSelectedColor] = useState<string>(selectableColors[0])
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [pickerCoordinates, setPickerCoordinates] = useState<ScreenCoordinates>({
    xAxis: 0,
    yAxis: 0
  })
  const [isDraggingMouse, setIsDraggingMouse] = useState<boolean>(false)

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

  const handleDragStart = (column: number, row: number) => {
    setIsDraggingMouse(true)
    setShowPicker(false)
    handleTableRender(column, row)
  }

  const handleMouseMove = (column: number, row: number) => {
    isDraggingMouse && handleTableRender(column, row)
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
        onCellDragStart={handleDragStart}
        onCellMouseMove={handleMouseMove}
        onCellDragStop={handleDragStop}
        onContextClick={handleContextClick}
      />
      {showPicker ? (
        <ColorPicker
          colorList={selectableColors}
          coordinates={pickerCoordinates}
          onColorClick={handleColorSelection}
        />
      ) : null}
    </section>
  )
}

export default App
