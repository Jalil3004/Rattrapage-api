export default class ChapterAccordion {
  constructor(contentSelector = "#content") {
    this.container = document.querySelector(contentSelector);
    this.articles = [...this.container.querySelectorAll("article")];
    this.#bindEvents();
  }

  #bindEvents() {
    this.container.addEventListener("click", (event) => {
      const heading = event.target.closest("h2");
      if (!heading) return;
      this.#toggle(heading.closest("article"));
    });
  }

  #toggle(article) {
    const wasExpanded = article.classList.contains("expanded");
    this.collapseAll();
    if (!wasExpanded) article.classList.add("expanded");
  }

  collapseAll() {
    this.articles.forEach((a) => a.classList.remove("expanded"));
  }
}