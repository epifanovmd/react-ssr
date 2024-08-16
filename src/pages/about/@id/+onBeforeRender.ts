import { beforeRender } from "../../../renderer/beforeRender";
import { PageContext } from "../../../renderer/types";

type AboutPageContext = PageContext<
  { a: string | number },
  { b: string },
  { c: number }
>;

export const onBeforeRender = beforeRender<AboutPageContext>(
  ({ urlParsed, routeParams }) => {
    console.log("[onBeforeRender] urlParsed", urlParsed?.searchAll);
    console.log("[onBeforeRender] routeParams", routeParams);
  },
);
