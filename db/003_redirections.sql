-- SITEWEB-14 : redirections des adresses de l'ancien site (2019) vers le nouveau.
create table if not exists redirections (
  ancienne  text primary key,          -- chemin normalisé : minuscules, sans extension ni barre finale
  nouvelle  text not null,
  code      integer not null default 301 check (code in (301, 302, 410))
);

insert or replace into redirections (ancienne, nouvelle, code) values
  ('/accueil', '/', 301),
  ('/nos-services', '/#services', 301),
  ('/creation-site-internet', '/services/sites-vitrines', 301),
  ('/developpement-mobile', '/services/applications-mobiles', 301),
  ('/nos-realisations', '/references', 301),
  ('/actualites', '/blog', 301),
  ('/contactez-nous', '/devis', 301),
  ('/promo-ete-2019', '/', 410);
