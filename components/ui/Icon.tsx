"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  BookmarkSimpleIcon,
  CaretDownIcon,
  CheckIcon,
  CircleNotchIcon,
  CodeIcon,
  CopyIcon,
  CubeIcon,
  CursorClickIcon,
  DotsThreeIcon,
  FolderSimpleIcon,
  GithubLogoIcon,
  GridFourIcon,
  HeartIcon,
  ImageSquareIcon,
  InfoIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  MonitorIcon,
  MoonIcon,
  NavigationArrowIcon,
  PlayIcon,
  PlusIcon,
  RowsIcon,
  SidebarSimpleIcon,
  SparkleIcon,
  StackIcon,
  SunIcon,
  TerminalWindowIcon,
  TextTIcon,
  XIcon,
  ArrowsClockwiseIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

const icons: Record<string, PhosphorIcon> = {
  back: ArrowLeftIcon,
  forward: ArrowRightIcon,
  external: ArrowSquareOutIcon,
  bookmark: BookmarkSimpleIcon,
  down: CaretDownIcon,
  check: CheckIcon,
  loading: CircleNotchIcon,
  code: CodeIcon,
  copy: CopyIcon,
  cube: CubeIcon,
  buttons: CursorClickIcon,
  more: DotsThreeIcon,
  folder: FolderSimpleIcon,
  github: GithubLogoIcon,
  grid: GridFourIcon,
  heart: HeartIcon,
  galleries: ImageSquareIcon,
  info: InfoIcon,
  feedback: LightningIcon,
  search: MagnifyingGlassIcon,
  monitor: MonitorIcon,
  moon: MoonIcon,
  navigation: NavigationArrowIcon,
  play: PlayIcon,
  plus: PlusIcon,
  rows: RowsIcon,
  sidebar: SidebarSimpleIcon,
  backgrounds: SparkleIcon,
  cards: StackIcon,
  sun: SunIcon,
  sections: TerminalWindowIcon,
  text: TextTIcon,
  close: XIcon,
  reset: ArrowsClockwiseIcon,
  mobile: DeviceMobileIcon,
  tablet: DeviceTabletIcon,
};
export function Icon({
  name,
  size = 18,
  className = "",
  filled = false,
}: {
  name: string;
  size?: number;
  className?: string;
  filled?: boolean;
}) {
  const Component = icons[name] ?? CubeIcon;
  return (
    <Component
      size={size}
      weight={filled ? "fill" : "regular"}
      className={className}
      aria-hidden="true"
    />
  );
}
