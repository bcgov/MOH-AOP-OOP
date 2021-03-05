export const scrollTo = (top, smoothScroll) => {
  if (!top) {
    top = 0;
  }
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  if ( supportsNativeSmoothScroll ) {
    if (smoothScroll) {
      window.scrollTo({top: top, behavior: 'smooth'});
    } else {
      window.scrollTo({top: top});
    }
  } else {
    /**
     * IE does not support ScrollToOptions (behavior, top, left), but does support
     * scrollTo() with parameters for x and y coorindiates.
     */
    window.scrollTo(0, top);
  }
};

export const scrollToError = () => {
  const el = document.querySelector('.text-danger');
  scrollToElement(el, true);
}

export const scrollToElement = (element, smoothScroll) => {
  if (!element) {
    return;
  }
  const yOffset = -75;
  setTimeout(() => {
    const top = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    scrollTo(top, smoothScroll);
  }, 0);
}
