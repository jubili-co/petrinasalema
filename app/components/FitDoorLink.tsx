"use client";

import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

import { FIT_DOOR_OPENED } from "@/lib/posthog";

import { captureEvent } from "./captureEvent";

type Props = PropsWithChildren<{
  href: string;
  className?: string;
  "data-id"?: string;
}>;

export const FitDoorLink: FC<Props> = ({
  href,
  children,
  className,
  "data-id": dataId = "fit-door-link",
}) => {
  const onOpen = () => {
    captureEvent(FIT_DOOR_OPENED, { path: href });
  };

  return (
    <Link href={href} data-id={dataId} className={className} onClick={onOpen}>
      {children}
    </Link>
  );
};
