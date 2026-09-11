import ChapterCounter from "./ex1.js";
import Timer from "./ex2.js";
import ChapterAccordion from "./ex3.js";
import VideoPlayer from "./ex4.js";

document.addEventListener("DOMContentLoaded", () => {
  new ChapterCounter().render();

  const timer = new Timer();
  timer.start();

  const accordion = new ChapterAccordion();
  accordion.collapseAll();

  const videoPlayer = new VideoPlayer();
});