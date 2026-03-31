import React, { useContext } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Type, AlignLeft, Image, MousePointer, Minus, Square, Timer, Plus } from "lucide-react";
import type { BlockType } from "../../types/project";
import { useBuilderStore } from "../../store/builderStore";
import { BlockPaletteItem } from "./BlockPaletteItem";
import { CustomBlocksContext } from "../CustomBlocksContext";
import { createCustomBlock } from "../../lib/createCustomBlock";
import type { CustomBlockDefinition } from "../../types/customBlock";

const BLOCK_TYPES: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: "heading", label: "Heading", icon: <Type size={16} /> },
  { type: "text", label: "Text", icon: <AlignLeft size={16} /> },
  { type: "image", label: "Image", icon: <Image size={16} /> },
  { type: "button", label: "Button", icon: <MousePointer size={16} /> },
  { type: "divider", label: "Divider", icon: <Minus size={16} /> },
  { type: "spacer", label: "Spacer", icon: <Square size={16} /> },
  { type: "countdown", label: "Countdown", icon: <Timer size={16} /> },
];

function CustomPaletteItem({ def }: { def: CustomBlockDefinition }) {
  const { addBlockDirect } = useBuilderStore();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-custom-${def.id}`,
    data: { source: "palette", customBlockDefId: def.id },
  });

  return (
    <div
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-violet-50 transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="flex items-center gap-3 flex-1 cursor-grab active:cursor-grabbing min-w-0"
      >
        <span className="text-violet-500 flex-shrink-0">{def.icon}</span>
        <span className="text-sm font-medium text-violet-700 truncate">{def.label}</span>
      </div>
      <button
        onClick={() => addBlockDirect(createCustomBlock(def))}
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-0.5 rounded hover:bg-violet-100 text-violet-500 hover:text-violet-800"
        title={`Add ${def.label}`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export function Sidebar() {
  const { addBlock } = useBuilderStore();
  const customBlocks = useContext(CustomBlocksContext);

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Blocks</h2>
      </div>
      {customBlocks.length > 0 && (
        <div className="p-2 border-b border-gray-200">
          <div className="flex flex-col gap-0.5">
            {customBlocks.map((def) => (
              <CustomPaletteItem key={def.id} def={def} />
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-0.5">
          {BLOCK_TYPES.map(({ type, label, icon }) => (
            <BlockPaletteItem key={type} type={type} label={label} icon={icon} onClick={() => addBlock(type)} />
          ))}
        </div>
      </div>
    </div>
  );
}
