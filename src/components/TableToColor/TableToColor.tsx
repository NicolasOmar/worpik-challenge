import { FC, useMemo } from 'react'
import Cell from '@components/CellToColor/CellToColor'
import ColorPicker from '@components/ColorPicker/ColorPicker'
import { Coordinates } from 'src/interfaces'
import './TableToColor.css'

interface TableToColorInterface {
  tableStructure: string[][]
  pickedAppears: boolean
  pickerCoordinates: Coordinates
  selectableColorsList: string[]
  onCellClick: (column: number, row: number) => void
  onCellDragStart: (column: number, row: number) => void
  onCellMouseMove: (column: number, row: number) => void
  onCellDragStop: (column: number, row: number) => void
  onContextClick: (xAxis: number, yAxis: number) => void
  onSelectColor: (selectedColor: string) => void
}

const TableToColor: FC<TableToColorInterface> = ({
  tableStructure,
  pickedAppears,
  pickerCoordinates,
  selectableColorsList,
  onCellClick,
  onCellDragStart,
  onCellMouseMove,
  onCellDragStop,
  onContextClick,
  onSelectColor
}) => {
  const memoizedTable = useMemo(
    () =>
      tableStructure.map((column, columnIndex) => (
        <section
          key={columnIndex}
          className="table__column"
          style={{ gridTemplateRows: `repeat(${column.length}, 1fr)` }}
        >
          {column.map((cellColor, rowIndex) => {
            return (
              <Cell
                key={`${columnIndex}-${rowIndex}`}
                column={columnIndex}
                row={rowIndex}
                color={cellColor}
                onCellClick={onCellClick}
                onCellDragStart={onCellDragStart}
                onCellMouseMove={onCellMouseMove}
                onCellDragStop={onCellDragStop}
                onContextMenu={onContextClick}
              />
            )
          })}
        </section>
      )),
    [tableStructure, onCellClick, onCellDragStart, onCellMouseMove, onCellDragStop, onContextClick]
  )
  return (
    <>
      {memoizedTable}
      {pickedAppears ? (
        <ColorPicker
          colorList={selectableColorsList}
          coordinates={pickerCoordinates}
          onColorClick={onSelectColor}
        />
      ) : null}
    </>
  )
}

export default TableToColor
