import type { FC } from "react";

type Props = {
  data: Record<string, unknown>;
};

export const JsonLd: FC<Props> = ({ data }) => (
  <script
    type="application/ld+json"
    data-id="json-ld"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
