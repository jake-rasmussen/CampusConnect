import { Colors } from "@prisma/client";
import { createContext } from "react";

type ProjectContextType = {
  colors: Colors,
  isVisible: boolean,
}

export const ProjectContext = createContext<ProjectContextType>({
  colors: {
    id: "",
    primaryColor: "",
    secondaryColor: "",
  },
  isVisible: false,
});