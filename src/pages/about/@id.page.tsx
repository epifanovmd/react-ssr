import React from "react";
import { PageContext } from "../../renderer/types";

export const Page = (pageContext: PageContext) => (
  <div>{`About page with id = ${console.log("pageContext", pageContext)}`}</div>
);
