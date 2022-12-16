export const getScrollbarWidth = () => {
  if (typeof document === "object" && typeof window == "object") {
    const hasScroll = document.body.scrollHeight > window.innerHeight;

    if (hasScroll) {
      // Creating invisible container
      const outer = document.createElement("div");

      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      document.body.appendChild(outer);

      const inner = document.createElement("div");

      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      outer.parentNode?.removeChild(outer);

      return scrollbarWidth || 0;
    }
  }

  return 0;
};
