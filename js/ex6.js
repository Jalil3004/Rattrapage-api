const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];
const MAX_DELAY_MS = 1000;

export default class KonamiCode {
  constructor(onSuccess) {
    this.onSuccess = onSuccess;
    this.progress = 0;
    this.lastKeyTime = 0;
    document.addEventListener("keydown", (e) => this.#handleKey(e));
  }

  #handleKey(event) {
    const now = Date.now();
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    if (now - this.lastKeyTime > MAX_DELAY_MS) this.progress = 0;
    this.lastKeyTime = now;

    if (key === SEQUENCE[this.progress]) {
      this.progress++;
      if (this.progress === SEQUENCE.length) {
        this.progress = 0;
        this.onSuccess();
      }
    } else {
      this.progress = key === SEQUENCE[0] ? 1 : 0;
    }
  }
}