import React from "react";
import { beforeRender } from "../../renderer/beforeRender";
import { PageContext } from "../../renderer/types";
import { usePageContext } from "../../renderer/usePageContext";

type AboutPageContext = PageContext<
  { a: string | number },
  { b: string },
  { c: number }
>;

export const onBeforeRender = beforeRender<AboutPageContext>(
  ({ urlParsed, routeParams }) => {
    console.log("[onBeforeRender] urlParsed", urlParsed.searchAll);
    console.log("[onBeforeRender] routeParams", routeParams);
  },
);

export const Page = () => {
  const { urlParsed, routeParams } =
    usePageContext<PageContext<{ a: string }, { id: string }>>();

  console.log("urlParsed", urlParsed.searchAll);
  console.log("routeParams", routeParams);

  return <div>{"About page with id"}</div>;
};
