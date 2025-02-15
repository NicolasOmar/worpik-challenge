import { FC, useMemo } from 'react'
import Cell from '@components/CellToColor/CellToColor'
import { CellCoordinatesFn } from 'src/interfaces'
import './TableToColor.css'

interface TableToColorInterface {
  tableStructure: string[][]
  onCellDragStart: CellCoordinatesFn
  onCellMouseMove: CellCoordinatesFn
  onCellDragStop: CellCoordinatesFn
  onContextClick: (xAxis: number, yAxis: number) => void
}

const TableToColor: FC<TableToColorInterface> = ({
  tableStructure,
  onCellDragStart,
  onCellMouseMove,
  onCellDragStop,
  onContextClick
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
                onCellDragStart={onCellDragStart}
                onCellMouseMove={onCellMouseMove}
                onCellDragStop={onCellDragStop}
                onContextMenu={onContextClick}
              />
            )
          })}
        </section>
      )),
    [tableStructure, onCellDragStart, onCellMouseMove, onCellDragStop, onContextClick]
  )

  return memoizedTable
}

export default TableToColor
