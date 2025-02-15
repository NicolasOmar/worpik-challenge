import { FC } from "react";
import './ColorPicker.css'

interface ColorPickerInterface {
  colorList: string[]
  coordinates: {x: number, y: number}
  onColorClick: (selectedColor: string) => void
}

const colorSizeInPx = 40

const ColorPicker: FC<ColorPickerInterface> = ({
  colorList,
  coordinates,
  onColorClick
}) => {
  return (
    <section
      className="color-picker"
      style={{
        top: `${coordinates.y}px`,
        left: `${coordinates.x}px`,
        gridTemplateColumns: `repeat(${colorList.length}, 1fr)`,
        width: `calc(${colorList.length}* ${colorSizeInPx}px)`,
        height: colorSizeInPx
      }}
      onContextMenu={
        (event) => {
          event.preventDefault()
          console.warn('ColorPicker', event.pageX, event.pageY)
        }
      }
    >
      {colorList.map(
        _color => <section className="color-picker__box" style={{ backgroundColor: _color}} onClick={() => onColorClick(_color)} />
      )}
    </section>
  )
}

export default ColorPicker