export interface ScreenCoordinates {
  xAxis: number
  yAxis: number
}

export interface CellTableCoordinates {
  column: number
  row: number
}

export type CellCoordinatesFn = (column: number, row: number) => void
