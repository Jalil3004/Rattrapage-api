export default class Timer {
  constructor(displaySelector = "#information div:nth-child(3) span") {
    this.display = document.querySelector(displaySelector);
    this.intervalId = null;
    this.startTimestamp = Date.now();
  }

  #formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  #tick() {
    const elapsed = Date.now() - this.startTimestamp;
    if (this.display) {
      this.display.textContent = this.#formatTime(elapsed);
      this.display.classList.toggle("timer-alert", elapsed >= 10 * 60 * 1000);
    }
  }

  start() {
    this.#tick();
    this.intervalId = setInterval(() => this.#tick(), 1000);
  }

  reset() {
    this.startTimestamp = Date.now();
    this.display?.classList.remove("timer-alert");
    this.#tick();
  }
}