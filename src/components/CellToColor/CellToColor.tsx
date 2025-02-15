import { FC } from 'react'
import { CellCoordinatesFn } from 'src/interfaces'
import './CellToColor.css'

interface CellToColorProps {
  column: number
  row: number
  color: string
  onCellDragStart: CellCoordinatesFn
  onCellMouseMove: CellCoordinatesFn
  onCellDragStop: CellCoordinatesFn
  onContextMenu: (x: number, y: number) => void
}

const CellToColor: FC<CellToColorProps> = ({
  column,
  row,
  color,
  onCellDragStart,
  onCellMouseMove,
  onCellDragStop,
  onContextMenu
}) => (
  <section
    className="cell-to-color"
    style={{
      backgroundColor: color
    }}
    onContextMenu={event => {
      event.preventDefault()
      onContextMenu(event.pageX, event.pageY)
    }}
    onMouseDown={event => {
      event.preventDefault()
      event.stopPropagation()
      event.button === 0 && onCellDragStart(column, row)
    }}
    onMouseOver={event => {
      event.preventDefault()
      event.stopPropagation()
      onCellMouseMove(column, row)
    }}
    onMouseUp={event => {
      event.preventDefault()
      event.stopPropagation()
      onCellDragStop(column, row)
    }}
  />
)

export default CellToColor
