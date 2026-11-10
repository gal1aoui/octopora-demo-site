// SITEWEB-14 : les anciennes adresses du site (2019) redirigent vers les nouvelles pages.
export const REDIRECTS = {
  "/accueil": { to: "/", code: 301 },
  "/nos-services": { to: "/#services", code: 301 },
  "/nos-realisations": { to: "/references", code: 301 },
  "/actualites": { to: "/blog", code: 301 },
  "/contactez-nous": { to: "/devis", code: 301 },
};

export function normalizePath(path) {
  const clean = path
    .split("?")[0]
    .toLowerCase()
    .replace(/\/+$/, "")
    .replace(/\.(php|html?)$/, "");
  return clean || "/";
}

export function resolveRedirect(path, rules = REDIRECTS) {
  return rules[normalizePath(path)] ?? null;
}
