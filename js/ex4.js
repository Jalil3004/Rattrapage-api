export default class VideoPlayer {
  constructor({
    videoSelector = "#video video",
    playBtnSelector = "#video-play",
    resetBtnSelector = "#video-reset",
    progressSelector = "#video-progress",
    fullscreenBtnSelector = "#video-fullscreen",
    containerSelector = "#video",
  } = {}) {
    this.video = document.querySelector(videoSelector);
    this.playBtn = document.querySelector(playBtnSelector);
    this.resetBtn = document.querySelector(resetBtnSelector);
    this.progress = document.querySelector(progressSelector);
    this.fullscreenBtn = document.querySelector(fullscreenBtnSelector);
    this.container = document.querySelector(containerSelector);
    this.#bindEvents();
  }

  #bindEvents() {
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.resetBtn.addEventListener("click", () => this.reset());
    this.progress.addEventListener("click", (e) => this.#seek(e));
    this.fullscreenBtn.addEventListener("click", () => this.#toggleFullscreen());
    this.video.addEventListener("timeupdate", () => this.#updateProgress());
    this.video.addEventListener("play", () => this.#setIcon("fa-pause"));
    this.video.addEventListener("pause", () => this.#setIcon("fa-play"));
  }

  #setIcon(iconClass) {
    this.playBtn.querySelector("i").className = `fa-solid ${iconClass}`;
  }

  togglePlay() {
    this.video.paused ? this.video.play() : this.video.pause();
  }

  reset() {
    this.video.pause();
    this.video.currentTime = 0;
    this.#updateProgress();
  }

  #updateProgress() {
    if (this.video.duration) {
      this.progress.value = (this.video.currentTime / this.video.duration) * 100;
    }
  }

  #seek(event) {
    const rect = this.progress.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    this.video.currentTime = ratio * this.video.duration;
  }

  #toggleFullscreen() {
    document.fullscreenElement
      ? document.exitFullscreen()
      : this.container.requestFullscreen();
  }
}