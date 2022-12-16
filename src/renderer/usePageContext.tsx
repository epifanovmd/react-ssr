import React, { useContext } from "react";
import type { PageContext } from "./types";

const Context = React.createContext<PageContext>(undefined as any);

export const PageContextProvider = ({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) =>
  <Context.Provider value={pageContext}>{children}</Context.Provider>;

export const usePageContext = () => useContext(Context);
