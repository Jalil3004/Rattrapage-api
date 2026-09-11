import ChapterCounter from "./ex1.js";
import Timer from "./ex2.js";

document.addEventListener("DOMContentLoaded", () => {
  new ChapterCounter().render();

  const timer = new Timer();
  timer.start();
});