import { Colors } from "@prisma/client";
import { createContext } from "react";

export const ProjectContext = createContext<{ colors: Colors }>({
  colors: {
    id: "",
    primaryColor: "",
    secondaryColor: "",
  },
});