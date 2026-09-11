export default class ChapterCounter {
  constructor(
    contentSelector = "#content",
    displaySelector = "#information div:nth-child(2) span"
  ) {
    this.chapters = document.querySelectorAll(`${contentSelector} article`);
    this.display = document.querySelector(displaySelector);
  }

  render() {
    if (this.display) {
      this.display.textContent = `${this.chapters.length} chapitres`;
    }
  }
}