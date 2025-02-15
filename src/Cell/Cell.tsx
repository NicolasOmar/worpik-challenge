import { FC } from "react";
import './Cell.css'

interface CellProps {
  column: number
  row: number
  color: string
  onClick: (column: number, row: number) => void
}

const Cell: FC<CellProps> = ({
  column,
  row,
  color,
  onClick
}) => (
  <section
    className="cell"
    style={{
      backgroundColor: color
    }}
    onClick={() => onClick(column, row)}
    onContextMenu={(event) => {
      event.preventDefault()
      console.warn('context')
    }}
  />
)

export default Cell