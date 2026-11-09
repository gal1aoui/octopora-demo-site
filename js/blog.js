import { ARTICLES } from "./articles.js";

const DATE = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const WORDS_PER_MINUTE = 200;

export function formatArticleDate(isoDate) {
  return DATE.format(new Date(`${isoDate}T12:00:00Z`));
}

export function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function publishedArticles(articles) {
  return articles
    .filter((article) => article.publie_le)
    .sort((a, b) => b.publie_le.localeCompare(a.publie_le));
}

export function articleCard(article) {
  return `<article class="card">
    <p class="muted">${formatArticleDate(article.publie_le)}, ${readingTime(article.contenu)} min de lecture</p>
    <h2><a href="article.html?slug=${article.slug}">${article.titre}</a></h2>
    <p>${article.resume}</p>
  </article>`;
}

export function articlePage(article) {
  return `<h1>${article.titre}</h1>
    <p class="muted">${article.auteur}, ${formatArticleDate(article.publie_le)}</p>
    <p>${article.contenu}</p>`;
}

if (typeof document !== "undefined") {
  const list = document.getElementById("articles");
  if (list) {
    list.innerHTML = publishedArticles(ARTICLES).map(articleCard).join("");
  }
  const page = document.getElementById("article");
  if (page) {
    const slug = new URLSearchParams(location.search).get("slug");
    const article = ARTICLES.find((candidate) => candidate.slug === slug);
    document.title = article ? article.titre : "Article introuvable";
    page.innerHTML = article ? articlePage(article) : "<h1>Cet article n'existe plus.</h1>";
  }
}
