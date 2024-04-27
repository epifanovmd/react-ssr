import React from "react";
import { memo, useCallback } from "react";

import { usePageContext } from "../../renderer/usePageContext";

export const Link = memo((props: { href: string; children: string }) => {
  const pageContext = usePageContext();
  const isActive = useCallback(
    () =>
      props.href === "/"
        ? pageContext.urlPathname === props.href
        : pageContext.urlPathname.startsWith(props.href),
    [pageContext.urlPathname, props.href],
  );

  return (
    <a href={props.href} className={isActive() ? "is-active" : undefined}>
      {props.children}
    </a>
  );
});
