import assert from "node:assert/strict";
import { test } from "node:test";
import { formatChoiceDate, readChoice, saveChoice } from "./cookie-consent.js";

const now = new Date("2026-03-10T09:00:00Z");

test("un choix récent est relu tel quel", () => {
  assert.deepEqual(readChoice(saveChoice(true, now), new Date("2026-04-01T09:00:00Z")), { accepted: true });
});

test("un refus est conservé comme un refus", () => {
  assert.deepEqual(readChoice(saveChoice(false, now), now), { accepted: false });
});

test("le choix est redemandé après six mois", () => {
  assert.equal(readChoice(saveChoice(true, now), new Date("2026-10-01T09:00:00Z")), null);
});

test("une valeur illisible est ignorée", () => {
  assert.equal(readChoice("pas du json", now), null);
  assert.equal(readChoice(null, now), null);
});

test("la date du choix est donnée à l'heure de Tunis", () => {
  assert.equal(formatChoiceDate(saveChoice(true, new Date("2026-03-10T23:30:00Z"))), "11 mars 2026");
});
