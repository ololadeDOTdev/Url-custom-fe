import React from "react";
import { IContext } from "../../types";

export const context = React.createContext<IContext>({} as unknown as IContext);
