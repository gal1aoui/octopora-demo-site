import assert from "node:assert/strict";
import { test } from "node:test";
import { buildPicture, buildSrcset } from "./image-srcset.js";

test("génère un srcset avec la largeur de chaque variante", () => {
  assert.equal(
    buildSrcset("img/equipe.jpg", [480, 800]),
    "img/equipe-480.webp 480w, img/equipe-800.webp 800w",
  );
});

test("la balise picture garde un repli JPEG et le chargement différé", () => {
  const html = buildPicture({ path: "img/equipe.png", alt: "L'équipe de l'agence" });
  assert.match(html, /<img src="img\/equipe-800\.jpg" alt="L'équipe de l'agence" loading="lazy"/);
  assert.match(html, /type="image\/webp"/);
});
