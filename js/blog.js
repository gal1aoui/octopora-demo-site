import { ARTICLES } from "./articles.js";

const DATE = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export function formatArticleDate(isoDate) {
  return DATE.format(new Date(`${isoDate}T12:00:00Z`));
}

export function publishedArticles(articles) {
  return articles
    .filter((article) => article.publie_le)
    .sort((a, b) => b.publie_le.localeCompare(a.publie_le));
}

export function articleCard(article) {
  return `<article class="card">
    <p class="muted">${formatArticleDate(article.publie_le)}</p>
    <h2><a href="article.html?slug=${article.slug}">${article.titre}</a></h2>
    <p>${article.resume}</p>
  </article>`;
}

if (typeof document !== "undefined") {
  const list = document.getElementById("articles");
  if (list) {
    list.innerHTML = publishedArticles(ARTICLES).map(articleCard).join("");
  }
}
