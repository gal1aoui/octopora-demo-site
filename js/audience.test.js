import assert from "node:assert/strict";
import { test } from "node:test";
import { buildHit, dayInTunis } from "./audience.js";

const now = new Date("2026-03-10T09:00:00Z");

test("ne garde que le chemin et le domaine d'origine", () => {
  const hit = buildHit({ url: "https://agence.example/devis.html?email=a@b.tn", referrer: "https://www.google.com/search?q=agence", now });
  assert.deepEqual(hit, { jour: "2026-03-10", chemin: "/devis.html", source: "www.google.com" });
});

test("ne mesure rien quand le navigateur demande de ne pas être suivi", () => {
  assert.equal(buildHit({ url: "https://agence.example/", doNotTrack: true, now }), null);
});

test("le jour suit l'heure de Tunis, pas celle de Greenwich", () => {
  assert.equal(dayInTunis(new Date("2026-03-10T23:30:00Z")), "2026-03-11");
});
