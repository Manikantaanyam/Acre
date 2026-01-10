"use client";
import { ChevronDown, Home, Layers } from "lucide-react";
import Button from "./Button";
import { ACTION_ITEMS } from "@/constants/constant";
import { useRef, useState } from "react";

export default function Toolbar() {
  const [openList, setOpenList] = useState<boolean>(false);
  const [fileType, setFileType] = useState<"video" | "audio" | "image" | null>(
    null
  );
  console.log("file", fileType);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleClick(type: string) {
    if (type === "audio" || type === "video" || type === "image") {
      setFileType(type);
      fileInputRef?.current?.click();
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !fileType) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", fileType);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("data", data);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mt-6 flex justify-between items-center">
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        accept={
          fileType === "video"
            ? "video/*"
            : fileType === "audio"
            ? "audio/*"
            : fileType === "image"
            ? "image/*"
            : undefined
        }
        onChange={handleFileChange}
      />
      <div className="hidden md:flex items-center gap-2 p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
        {ACTION_ITEMS.map(({ id, name, icon: Icon, iconColor }) => (
          <button
            key={id}
            onClick={() => handleClick(name.toLowerCase())}
            className="group flex gap-2.5 items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            <Icon
              className={`${iconColor} transition-transform group-hover:scale-110`}
              size={16}
            />
            <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
              {name}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile drop down */}
      <div className="flex md:hidden relative">
        <button
          onClick={() => setOpenList((p) => !p)}
          className={`text-xs text-white font-medium px-4 py-2 border border-white/10 rounded-lg flex items-center gap-2 transition-all active:scale-95`}
        >
          Add item
          <div
            className={`transition-transform duration-300 ${
              openList ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={14} />
          </div>
        </button>

        {openList && (
          <div className="absolute top-[calc(100%+8px)] left-0 min-w-32 p-1.5 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            {ACTION_ITEMS.map(({ id, name, icon: Icon, iconColor }) => (
              <button
                key={id}
                onClick={() => handleClick(name)}
                className="w-full text-xs flex gap-3 items-center hover:bg-white/5 px-3 py-2.5 rounded-md transition-colors text-zinc-400 hover:text-white"
              >
                <Icon size={16} className={iconColor} />
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2.5">
        <Button
          name="Home"
          Icon={Home}
          className="bg-[#86ff2e] hover:bg-[#a3ff62] text-black font-semibold "
        />
        <Button
          name="Canvas"
          Icon={Layers}
          className="text-white border border-white/20 hover:border-[#86ff2e] hover:text-[#86ff2e] transition-all"
        />
      </div>
    </div>
  );
}
