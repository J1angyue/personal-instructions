import initLightRoad from "./LightRoad";
import initSwiper from "./Swiper";
import "./style.css";

function toggleVisiblity(element) {
  if (!element) {
    return;
  }
  element.style.visibility =
    element.style.visibility === "visible" ? "hidden" : "visible";
}

initLightRoad().then(() => {
  toggleVisiblity(document.getElementById("loading"));
  toggleVisiblity(document.getElementById("background"));
  toggleVisiblity(document.getElementById("swiper"));
  initSwiper();
});
