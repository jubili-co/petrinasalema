import type { FC, ReactNode } from "react";

import { htmlLang } from "@/lib/locale";

import { HtmlLang } from "./HtmlLang";

type Props = {
  children: ReactNode;
};

const DeLayout: FC<Props> = ({ children }) => (
  <>
    <HtmlLang lang={htmlLang("de-AT")} />
    {children}
  </>
);

export default DeLayout;
