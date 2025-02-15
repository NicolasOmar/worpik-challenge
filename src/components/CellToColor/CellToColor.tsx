import { FC } from 'react'
import './CellToColor.css'

interface CellToColorProps {
  column: number
  row: number
  color: string
  onClick: (column: number, row: number) => void
  onContextMenu: (x: number, y: number) => void
}

const CellToColor: FC<CellToColorProps> = ({ column, row, color, onClick, onContextMenu }) => (
  <section
    className="cell-to-color"
    style={{
      backgroundColor: color
    }}
    onClick={() => onClick(column, row)}
    onContextMenu={event => {
      event.preventDefault()
      onContextMenu(event.pageX, event.pageY)
    }}
  />
)

export default CellToColor
