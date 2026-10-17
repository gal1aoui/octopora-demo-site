// Bandeau de consentement : on mémorise le choix du visiteur pendant six mois, puis on le redemande.
export const CONSENT_KEY = "consentement-cookies";
export const VALIDITY_DAYS = 182;
const DAY_MS = 24 * 60 * 60 * 1000;

export function saveChoice(accepted, now) {
  return JSON.stringify({ accepted: Boolean(accepted), at: now.toISOString() });
}

export function readChoice(raw, now) {
  if (!raw) {
    return null;
  }
  try {
    const { accepted, at } = JSON.parse(raw);
    const age = now.getTime() - new Date(at).getTime();
    if (typeof accepted !== "boolean" || Number.isNaN(age) || age > VALIDITY_DAYS * DAY_MS) {
      return null;
    }
    return { accepted };
  } catch {
    return null;
  }
}

export function formatChoiceDate(raw) {
  const { at } = JSON.parse(raw);
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Africa/Tunis" }).format(new Date(at));
}

if (typeof document !== "undefined") {
  const banner = document.getElementById("cookie-banner");
  const choice = readChoice(localStorage.getItem(CONSENT_KEY), new Date());
  if (banner && choice === null) {
    banner.hidden = false;
    banner.addEventListener("click", (event) => {
      const answer = event.target.dataset.cookies;
      if (answer) {
        localStorage.setItem(CONSENT_KEY, saveChoice(answer === "accept", new Date()));
        banner.hidden = true;
      }
    });
  }
}
