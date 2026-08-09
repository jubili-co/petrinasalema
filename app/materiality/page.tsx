import { redirect } from "next/navigation";
import type { FC } from "react";

/** Materiality kits live on Jubili. Keep this route from promising an empty shelf. */
const MaterialityPage: FC = () => {
  redirect("https://jubili.co");
};

export default MaterialityPage;
