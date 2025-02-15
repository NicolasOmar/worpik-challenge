import { FC } from "react"
import Cell from "@components/CellToColor/CellToColor"
import ColorPicker from "@components/ColorPicker/ColorPicker"
import { Coordinates } from "src/interfaces"

interface TableToColorInterface {
  tableStructure: string[][]
  pickedAppears: boolean
  pickerCoordinates: Coordinates
  selectableColorsList: string[]
  onCellClick: (column: number, row: number) => void
  onContextClick: (xAxis: number, yAxis: number) => void
  onSelectColor: (selectedColor: string) => void
}

const TableToColor: FC<TableToColorInterface> = ({
  tableStructure,
  pickedAppears,
  pickerCoordinates,
  selectableColorsList,
  onCellClick,
  onContextClick,
  onSelectColor
}) => {
  return (
    <>

      {
        tableStructure.map(
          (column, columnIndex) => (
            <section
              key={columnIndex}
              className='app__column'
              style={{ gridTemplateRows: `repeat(${column.length}, 1fr)` }}
            >
              {
                column.map(
                  (cellColor, rowIndex) => {
                    return (
                      <Cell
                        key={`${columnIndex}-${rowIndex}`}
                        column={columnIndex}
                        row={rowIndex}
                        color={cellColor}
                        onClick={onCellClick}
                        onContextMenu={onContextClick}
                      />
                    )
                  }
                )
              }
            </section>
          )
        )
      }
      {
        pickedAppears ? (
          <ColorPicker
            colorList={selectableColorsList}
            coordinates={pickerCoordinates}
            onColorClick={onSelectColor}
          />
        ) : null
      }
    </>
  )
}

export default TableToColor