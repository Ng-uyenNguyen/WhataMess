import { RightSideBarIcons, SideBarModes } from "../enums/sidebar.enum";
import {
  ClockIcon,
  UserIcon,
  UserGroupIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  LinkIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

type leftSidebarIcons = {
  mode: SideBarModes;
  icon: (active: boolean) => JSX.Element;
};

export type rightSideBarIcons = {
  value: RightSideBarIcons;
  icon: React.ReactElement;
  hoverColor?: string;
}

export const leftSidebarConfig: leftSidebarIcons[] = [
  {
    mode: SideBarModes.RECENT,
    icon: (active: boolean) => <ClockIcon className={"h-6 w-6 " + (!active ? "text-gray-400" : "text-green")} />,
  },
  {
    mode: SideBarModes.FRIENDS,
    icon: (active: boolean) => <UserIcon className={"h-6 w-6 " + (!active ? "text-gray-400" : "text-green")} />,
  },
  {
    mode: SideBarModes.GROUPS,
    icon: (active: boolean) => <UserGroupIcon className={"h-6 w-6 " + (!active ? "text-gray-400" : "text-green")} />,
  },
  {
    mode: SideBarModes.FAVORITES,
    icon: (active: boolean) => <BookmarkIcon className={"h-6 w-6 " + (!active ? "text-gray-400" : "text-green")} />,
  },
];

export const rightSideBarConfig: rightSideBarIcons[] = [
  {
    value: RightSideBarIcons.DOCUMENT,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#dfe1f9] transition-all hover:bg-[#d4d7fc] hover:scale-[120%]">
      <DocumentIcon className="w-5 h-5 text-[#5a68df]" />
    </div>
  },
  {
    value: RightSideBarIcons.PHOTOS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#f4eacf] transition-all hover:bg-[#f5e5b7] hover:scale-[120%]">
      <PhotoIcon className="w-5 h-5 text-[#d9c9a0]" />
    </div>
  },
  {
    value: RightSideBarIcons.VIDEOS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#e4f7f9] transition-all hover:bg-[#dffcff] hover:scale-[120%]">
      <VideoCameraIcon className="w-5 h-5 text-[#50b0ba]" />
    </div>
  },
  {
    value: RightSideBarIcons.LINKS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#e0eed5] transition-all hover:bg-[#def5cd] hover:scale-[120%]">
      <LinkIcon className="w-5 h-5 text-[#84aa68]" />
    </div>
  },
  {
    value: RightSideBarIcons.SEARCH,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#ffe0da] transition-all hover:bg-[#fdcfc6] hover:scale-[120%]">
      <MagnifyingGlassIcon className="w-5 h-5 text-[#be6e5f]" />
    </div>
  },
  {
    value: RightSideBarIcons.OTHERS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#d7eaff] transition-all hover:bg-[#c8e3ff] hover:scale-[120%]">
      <DocumentDuplicateIcon className="w-5 h-5 text-[#5ca8ff]" />
    </div>
  },
]
export const fileTypeConfig: rightSideBarIcons[] = [
  {
    value: RightSideBarIcons.DOCUMENT,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#dfe1f9]">
      <DocumentIcon className="w-5 h-5 text-[#5a68df]" />
    </div>,
    hoverColor: '#d4d7fc'
  },
  {
    value: RightSideBarIcons.PHOTOS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#f4eacf]">
      <PhotoIcon className="w-5 h-5 text-[#d9c9a0]" />
    </div>,
    hoverColor: '#f5e5b7'
  },
  {
    value: RightSideBarIcons.VIDEOS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#e4f7f9]">
      <VideoCameraIcon className="w-5 h-5 text-[#50b0ba]" />
    </div>,
    hoverColor: '#dffcff'
  },
  {
    value: RightSideBarIcons.OTHERS,
    icon: <div className="px-4 py-4 cursor-pointer rounded-xl bg-[#d7eaff]">
      <DocumentDuplicateIcon className="w-5 h-5 text-[#5ca8ff]" />
    </div>,
    hoverColor: '#c8e3ff'
  },
]