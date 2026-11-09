import assert from "node:assert/strict";
import { test } from "node:test";
import { formatArticleDate, publishedArticles, readingTime } from "./blog.js";

test("écrit la date de publication en toutes lettres", () => {
  assert.equal(formatArticleDate("2026-10-02"), "2 octobre 2026");
});

test("compte une minute de lecture pour 200 mots", () => {
  assert.equal(readingTime("mot ".repeat(200)), 1);
  assert.equal(readingTime("mot ".repeat(1000)), 5);
  assert.equal(readingTime("Court."), 1);
});

test("n'affiche que les articles publiés, les plus récents d'abord", () => {
  const articles = [
    { slug: "a", publie_le: "2026-10-02" },
    { slug: "brouillon", publie_le: null },
    { slug: "b", publie_le: "2026-10-16" },
  ];
  assert.deepEqual(publishedArticles(articles).map((article) => article.slug), ["b", "a"]);
});
