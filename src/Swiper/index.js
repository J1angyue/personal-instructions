import Swiper from "swiper";
import { Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";

Swiper.use([Navigation, EffectCoverflow]);

export default function initSwiper() {
  const swiper = new Swiper(".swiper", {
    loop: true,
    observeParents: true,
    touchMoveStopPropagation: false,
    preventClicksPropagation: false,
    effect: "coverflow",
    slidesPerView: 1,
    coverflowEffect: {
      modifier: 3,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      touchStart() {
        document.body.dispatchEvent(new Event("touchstart"));
      },
      touchEnd() {
        document.body.dispatchEvent(new Event("touchend"));
      },
    },
  });

  return swiper;
}
