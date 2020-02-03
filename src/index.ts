import "./index.scss";
import "./mvp/sliderFacade";
import Demo from "./demo/Demo";

window.onload = function windowHasLoaded() {
  document.querySelectorAll(".demo").forEach(demo => new Demo(demo));
};
