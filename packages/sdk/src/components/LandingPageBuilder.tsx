import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Save, Undo2, Monitor, Smartphone, LayoutTemplate, Settings } from "lucide-react";
import type { Project } from "../types/project";
import type { FileManagerConfig } from "../types/fileManager";
import type { CustomBlockDefinition } from "../types/customBlock";
import type { TemplateDefinition } from "../types/template";
import { useBuilderStore } from "../store/builderStore";
import { createCustomBlock } from "../lib/createCustomBlock";
import { Sidebar } from "./Sidebar/Sidebar";
import { Canvas } from "./Canvas/Canvas";
import { PropertiesPanel } from "./PropertiesPanel/PropertiesPanel";
import { FileManagerContext } from "./FileManager/FileManagerContext";
import { CustomBlocksContext } from "./CustomBlocksContext";
import { TemplatesContext } from "./TemplatesContext";
import { TemplatesModal } from "./Templates/TemplatesModal";
import { ProjectSettingsPanel } from "./ProjectSettings/ProjectSettingsPanel";
import { PreviewModeContext, type PreviewMode } from "./PreviewModeContext";
import { Button } from "./ui/Button";

export interface LandingPageBuilderProps {
  initialProject?: Project;
  onSave?: (project: Project) => void | Promise<void>;
  fileManager?: FileManagerConfig;
  customBlocks?: CustomBlockDefinition[];
  templates?: TemplateDefinition[];
}

export function LandingPageBuilder({
  initialProject,
  onSave,
  fileManager,
  customBlocks = [],
  templates = [],
}: LandingPageBuilderProps) {
  const { project, history, loadProject, addBlock, addBlockDirect, moveBlock, updateProject, undo } = useBuilderStore();
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Load initial project
  useEffect(() => {
    if (initialProject) {
      loadProject(initialProject);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current as {
      source: "palette" | "canvas";
      type?: string;
      customBlockDefId?: string;
    };

    if (activeData.source === "palette") {
      if (activeData.customBlockDefId) {
        const def = customBlocks.find((d) => d.id === activeData.customBlockDefId);
        if (def) addBlockDirect(createCustomBlock(def));
      } else if (activeData.type) {
        addBlock(activeData.type as Parameters<typeof addBlock>[0]);
      }
      return;
    }

    if (activeData.source === "canvas") {
      const overId = over.id as string;
      if (overId === "canvas-droppable") return;
      const blocks = project.blocks;
      const fromIdx = blocks.findIndex((b) => b.id === active.id);
      const toIdx = blocks.findIndex((b) => b.id === overId);
      if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
        moveBlock(active.id as string, toIdx);
      }
    }
  };

  const handleSave = async () => {
    if (onSave) await onSave(project);
  };

  return (
    <TemplatesContext.Provider value={templates}>
      <CustomBlocksContext.Provider value={customBlocks}>
        <PreviewModeContext.Provider value={previewMode}>
          <FileManagerContext.Provider value={fileManager ?? null}>
            <div className="flex h-screen flex-col bg-gray-100 font-sans">
              {/* Toolbar */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-200 shrink-0">
                <div className="flex-1">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject({ name: e.target.value })}
                    className="text-sm font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1.5 py-0.5 -ml-1.5"
                  />
                </div>
                {/* Preview mode toggle */}
                <div className="flex items-center rounded-md border border-gray-200 p-0.5 gap-0.5">
                  <button
                    onClick={() => setPreviewMode("desktop")}
                    title="Desktop preview"
                    className={`p-1.5 rounded transition-colors ${
                      previewMode === "desktop" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Monitor size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewMode("mobile")}
                    title="Mobile preview"
                    className={`p-1.5 rounded transition-colors ${
                      previewMode === "mobile" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Smartphone size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                    <Settings size={14} />
                    Settings
                  </Button>
                  {templates.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setShowTemplates(true)}>
                      <LayoutTemplate size={14} />
                      Templates
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={undo} disabled={history.length === 0} title="Undo">
                    <Undo2 size={14} />
                    Undo
                  </Button>
                  {onSave && (
                    <Button variant="secondary" size="sm" onClick={handleSave}>
                      <Save size={14} />
                      Save
                    </Button>
                  )}
                </div>
              </div>

              {/* Main layout */}
              <div className="flex flex-1 overflow-hidden">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <Sidebar />
                  <Canvas />
                  <PropertiesPanel />
                </DndContext>
              </div>
            </div>
            {showSettings && <ProjectSettingsPanel onClose={() => setShowSettings(false)} />}
            {showTemplates && (
              <TemplatesModal
                onSelect={(p) => {
                  loadProject(p);
                  setShowTemplates(false);
                }}
                onClose={() => setShowTemplates(false)}
              />
            )}
          </FileManagerContext.Provider>
        </PreviewModeContext.Provider>
      </CustomBlocksContext.Provider>
    </TemplatesContext.Provider>
  );
}
