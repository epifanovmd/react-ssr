import React from "react";

import { PageContext } from "../../../renderer/types";
import { usePageContext } from "../../../renderer/usePageContext";

export const Page = () => {
  const { urlParsed, routeParams } =
    usePageContext<PageContext<{ a: string }, { id: string }>>();

  console.log("urlParsed", urlParsed?.searchAll);
  console.log("routeParams", routeParams);

  return <div>{"About page with id"}</div>;
};
