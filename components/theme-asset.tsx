import { cn } from "@/lib/utils";

type ThemeAssetProps = {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export function ThemeAsset({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
}: ThemeAssetProps) {
  return (
    <span className={cn("inline-block", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        className="block h-full w-full object-contain dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        className="hidden h-full w-full object-contain dark:block"
      />
    </span>
  );
}
