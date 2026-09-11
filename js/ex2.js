const STORAGE_KEY = "nextlearn_timer_start";
const ALERT_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes

export default class Timer {
  constructor(displaySelector = "#information div:nth-child(3) span") {
    this.display = document.querySelector(displaySelector);
    this.intervalId = null;
    this.startTimestamp = this.#loadOrCreateStart();
  }

  #loadOrCreateStart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return parseInt(saved, 10);
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, String(now));
    return now;
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
      this.display.classList.toggle("timer-alert", elapsed >= ALERT_THRESHOLD_MS);
    }
  }

  start() {
    this.#tick();
    this.intervalId = setInterval(() => this.#tick(), 1000);
  }

  reset() {
    this.startTimestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, String(this.startTimestamp));
    this.display?.classList.remove("timer-alert");
    this.#tick();
  }
}