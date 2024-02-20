import { deepDistortion } from "./Distortions";
import App from "./InfiniteLights";

const container = document.getElementById("background");

const options = {
  distortion: deepDistortion,

  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,

  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,

  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,

  // Percentage of the lane's width
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,

  /*** These ones have to be arrays of [min,max].  ***/
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],

  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],

  /****  Anything below can be either a number or an array of [min,max] ****/

  // Length of the lights. Best to be less than total length
  carLightsLength: [400 * 0.05, 400 * 0.15],
  // Radius of the tubes
  carLightsRadius: [0.05, 0.14],
  // Width is percentage of a lane. Numbers from 0 to 1
  carWidthPercentage: [0.3, 0.5],
  // How drunk the driver is.
  // carWidthPercentage's max + carShiftX's max -> Cannot go over 1.
  // Or cars start going into other lanes
  carShiftX: [-0.2, 0.2],
  // Self Explanatory
  carFloorSeparation: [0.05, 1],

  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    /***  Only these colors can be an array ***/
    leftCars: [0xe2173c, 0x841010, 0xf23d3d],
    rightCars: [0xffffff, 0x7686bf, 0x1338b5],
    sticks: 0xdce0ee,
  },
};

export default function initLightRoad() {
  const app = new App(container, options);
  return app.loadAssets().then(app.init);
}
