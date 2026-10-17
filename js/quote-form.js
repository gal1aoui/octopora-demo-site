// Formulaire de demande de devis : validation avant l'envoi, messages en clair à côté de chaque champ.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuote(values) {
  const errors = {};
  if (!(values.nom ?? "").trim()) {
    errors.nom = "Indiquez votre nom.";
  }
  if (!EMAIL.test(values.email ?? "")) {
    errors.email = "Cette adresse e-mail ne semble pas valide.";
  }
  if (!values.besoin) {
    errors.besoin = "Choisissez le type de projet.";
  }
  if ((values.message ?? "").trim().length < 30) {
    errors.message = "Décrivez votre projet en quelques phrases (30 caractères au moins).";
  }
  if (values.consentement !== "on") {
    errors.consentement = "Votre accord est nécessaire pour que nous puissions vous répondre.";
  }
  return errors;
}

function showErrors(form, errors) {
  form.querySelectorAll(".field-error").forEach((element) => element.remove());
  for (const [name, message] of Object.entries(errors)) {
    const field = form.elements.namedItem(name);
    const hint = document.createElement("span");
    hint.className = "field-error";
    hint.textContent = message;
    field.closest("label").append(hint);
  }
}

if (typeof document !== "undefined") {
  const form = document.getElementById("devis");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    const errors = validateQuote(values);
    showErrors(form, errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const response = await fetch(form.action, { method: "POST", body: new FormData(form) });
    form.querySelector(".form-status").textContent = response.ok
      ? "Merci, votre demande est bien arrivée. Nous vous répondons sous 48 heures."
      : "L'envoi a échoué. Réessayez dans un instant.";
  });
}
