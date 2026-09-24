import { site } from "@/content/site";

const SOURCE = 1024;

const darkCrop = {
  visW: 1004,
  visH: 1000,
  left: 10,
  top: 14,
} as const;

const lightCrop = {
  visW: 1005,
  visH: 1001,
  left: 10,
  top: 13,
} as const;

function cropStyle({
  visW,
  visH,
  left,
  top,
}: {
  visW: number;
  visH: number;
  left: number;
  top: number;
}) {
  return {
    width: `calc(${SOURCE} / ${visW} * 100%)`,
    height: `calc(${SOURCE} / ${visH} * 100%)`,
    left: `calc(-${left} / ${visW} * 100%)`,
    top: `calc(-${top} / ${visH} * 100%)`,
  };
}

export function HeroCodingAvatar() {
  const alt = `${site.name} em pixel art, codando no notebook`;

  return (
    <figure
      className="relative mx-auto hidden w-full max-w-sm overflow-hidden md:mx-0 md:block md:max-w-none filter-[drop-shadow(0_0_18px_color-mix(in_srgb,var(--primary)_35%,transparent))]"
      style={{ aspectRatio: `${darkCrop.visW} / ${darkCrop.visH}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.heroCodingAvatarLight}
        alt={alt}
        width={SOURCE}
        height={SOURCE}
        className="absolute max-w-none dark:hidden rounded-3xl"
        style={cropStyle(lightCrop)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.heroCodingAvatar}
        alt={alt}
        width={SOURCE}
        height={SOURCE}
        className="absolute max-w-none hidden dark:block rounded-3xl"
        style={cropStyle(darkCrop)}
      />
    </figure>
  );
}
