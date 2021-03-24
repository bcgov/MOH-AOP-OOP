export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!window.navigator.userAgent.match(/Trident.*rv:11\./)) {
    return true;
  }
  return false;
}
