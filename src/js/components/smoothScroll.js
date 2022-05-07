const scroll = new SmoothScroll('a[href^="#"]:not(a[href="#"])', {
  speed: 900,
  speedAsDuration: true,
  updateURL: false
});
