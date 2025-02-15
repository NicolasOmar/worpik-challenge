import { FC } from 'react'
import './CellToColor.css'

interface CellToColorProps {
  column: number
  row: number
  color: string
  onCellClick: (column: number, row: number) => void
  onCellDragStart: (column: number, row: number) => void
  onCellMouseMove: (column: number, row: number) => void
  onCellDragStop: (column: number, row: number) => void
  onContextMenu: (x: number, y: number) => void
}

const CellToColor: FC<CellToColorProps> = ({
  column,
  row,
  color,
  onCellClick,
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
    onClick={() => onCellClick(column, row)}
    onContextMenu={event => {
      event.preventDefault()
      onContextMenu(event.pageX, event.pageY)
    }}
    onMouseDown={event => {
      console.warn(event.button)
      event.preventDefault()
      event.stopPropagation()
      event.button === 0 && onCellDragStart(column, row)
    }}
    onMouseMove={event => onCellMouseMove(column, row)}
    onMouseUp={event => onCellDragStop(column, row)}
  />
)

export default CellToColor
