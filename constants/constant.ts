import {
  Link as LinkIcon,
  Music,
  NotepadText,
  Video,
  Code,
  Image,
} from "lucide-react";

export const ACTION_ITEMS = [
  {
    id: 1,
    name: "Note",
    icon: NotepadText,
    iconColor: "text-green-500",
  },
  {
    id: 2,
    name: "Image",
    icon: Image,
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    name: "Video",
    icon: Video,
    iconColor: "text-purple-500",
  },
  {
    id: 4,
    name: "Link",
    icon: LinkIcon,
    iconColor: "text-orange-500",
  },
  {
    id: 5,
    name: "Code",
    icon: Code,
    iconColor: "text-neutral-200",
  },
  {
    id: 6,
    name: "Audio",
    icon: Music,
    iconColor: "text-red-500",
  },
];
