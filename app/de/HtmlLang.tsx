"use client";

import { useEffect, type FC } from "react";

type Props = {
  lang: string;
};

export const HtmlLang: FC<Props> = ({ lang }) => {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
};
