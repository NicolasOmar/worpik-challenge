import { FC } from "react";
import './Cell.css'

interface CellProps {
  column: number
  row: number
  color: string
  onClick: (column: number, row: number) => void
  onContextMenu: (x: number, y: number) => void
}

const Cell: FC<CellProps> = ({
  column,
  row,
  color,
  onClick,
  onContextMenu
}) => (
  <section
    className="cell"
    style={{
      backgroundColor: color
    }}
    onClick={() => onClick(column, row)}
    onContextMenu={(event) => {
      event.preventDefault()
      onContextMenu(event.pageX, event.pageY)
    }}
  />
)

export default Cell