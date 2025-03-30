import React, { useState } from "react"
import * as Icons from "lucide-react"
import { useEditorStore } from "../../store/editorStore"

const iconList = Object.keys(Icons).filter((name) => /^[A-Z]/.test(name))

export const IconLibrary: React.FC = () => {
  const [search, setSearch] = useState("")
  const [size, setSize] = useState(40)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [fillColor, setFillColor] = useState("#ffffff")

  const filteredIcons = iconList.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  )

  const addIconToCanvas = (name: string) => {
    useEditorStore.getState().addIconOverlay({
      name,
      size,
      strokeWidth,
      color: strokeColor,
      fill: fillColor
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 space-y-2 flex-shrink-0">
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex items-center gap-2 text-sm">
          <label>Size</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-16 border border-gray-300 rounded px-1"
          />
          <label>Stroke</label>
          <input
            type="number"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-12 border border-gray-300 rounded px-1"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label>Outline</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-10 h-6 border border-gray-300 rounded"
          />
          <label>Fill</label>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="w-10 h-6 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-hide">
        <div className="grid grid-cols-4 gap-3">
          {filteredIcons.map((name) => {
            const LucideIcon = Icons[name as keyof typeof Icons]
            return (
              <div
                key={name}
                className="w-full aspect-square border rounded bg-white flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                title={name}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", name)
                }}
                onClick={() => addIconToCanvas(name)}
              >
                <LucideIcon
                  size={size}
                  strokeWidth={strokeWidth}
                  color={strokeColor}
                  fill={fillColor}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
