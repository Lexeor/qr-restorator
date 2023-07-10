const vibrate = () => {
  // enable vibration support
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

  if (navigator.vibrate) {
    // vibration API supported
    navigator.vibrate(5);
  }
};

export default vibrate;
