import React from "react";
import { PageContext } from "../../renderer/types";
import { beforeRender } from "../../renderer/beforeRender";

export const onBeforeRender = beforeRender(({ routeParams }: PageContext) => {
  console.log("routeParams", routeParams);
});

export const Page = () => <div>{"About page with id"}</div>;
