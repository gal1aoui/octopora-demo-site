import assert from "node:assert/strict";
import { test } from "node:test";
import { validateQuote } from "./quote-form.js";

const valid = {
  nom: "Nour Trabelsi",
  email: "nour@example.com",
  besoin: "refonte",
  message: "Notre site date de 2019 et ne génère presque plus de demandes.",
  consentement: "on",
};

test("une demande complète passe", () => {
  assert.deepEqual(validateQuote(valid), {});
});

test("signale une adresse e-mail invalide", () => {
  assert.ok(validateQuote({ ...valid, email: "nour@" }).email);
});

test("demande un message d'au moins 30 caractères", () => {
  assert.ok(validateQuote({ ...valid, message: "Un site." }).message);
});

test("refuse l'envoi sans consentement", () => {
  assert.ok(validateQuote({ ...valid, consentement: undefined }).consentement);
});
