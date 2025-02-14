import { FC } from "react";
import './Cell.css'

interface CellProps {
  id: number
  color: string
  onClick: (cellId: number) => void
}

const Cell: FC<CellProps> = ({
  id,
  color,
  onClick
}) => (
  <section
    className="cell"
    style={{
      backgroundColor: color
    }}
    onClick={() => onClick(id)}
    onContextMenu={(event) => {
      event.preventDefault()
      console.warn('context')
    }}
  />
)

export default Cell