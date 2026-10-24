// Mesure d'audience sans cookie : on compte des pages vues par jour, sans identifiant de visiteur.
export function dayInTunis(now) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Africa/Tunis" }).format(now);
}

export function buildHit({ url, referrer = "", doNotTrack = false, now }) {
  if (doNotTrack) {
    return null;
  }
  const { pathname } = new URL(url);
  let source = null;
  if (referrer) {
    source = new URL(referrer).hostname;
  }
  return { jour: dayInTunis(now), chemin: pathname, source };
}

if (typeof document !== "undefined") {
  const hit = buildHit({
    url: location.href,
    referrer: document.referrer,
    doNotTrack: navigator.doNotTrack === "1",
    now: new Date(),
  });
  if (hit) {
    navigator.sendBeacon("/audience", JSON.stringify(hit));
  }
}
