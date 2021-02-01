export const scrollTo = top => {
  if (!top) {
    top = 0;
  }
  const supportsNativeSmoothScroll =
    "scrollBehavior" in document.documentElement.style;

  if (supportsNativeSmoothScroll) {
    window.scrollTo({ top: top, behavior: "smooth" });
  } else {
    /**
     * IE does not support ScrollToOptions (behavior, top, left), but does support
     * scrollTo() with parameters for x and y coorindiates.
     */
    window.scrollTo(0, top);
  }
};

export const scrollToError = () => {
  const yOffset = -75;
  setTimeout(() => {
    const el = document.querySelector(".text-danger");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      scrollTo(top);
    }
  }, 0);
};
