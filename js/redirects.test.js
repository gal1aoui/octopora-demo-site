import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizePath, resolveRedirect } from "./redirects.js";

test("redirige une ancienne page vers la nouvelle", () => {
  assert.deepEqual(resolveRedirect("/nos-realisations.php"), { to: "/references", code: 301 });
});

test("ignore la casse, l'extension, la barre finale et les paramètres", () => {
  assert.equal(normalizePath("/Actualites.html/?page=2"), "/actualites");
  assert.equal(normalizePath("/"), "/");
});

test("laisse passer une adresse du nouveau site", () => {
  assert.equal(resolveRedirect("/blog"), null);
});
