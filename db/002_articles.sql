-- SITEWEB-10 : articles du blog (SQLite).
create table if not exists articles (
  id          integer primary key,
  slug        text not null unique,
  titre       text not null,
  resume      text not null,
  contenu     text not null,
  auteur      text not null,
  publie_le   text,                   -- null tant que l'article est un brouillon
  cree_le     text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

create index if not exists articles_publies on articles (publie_le desc) where publie_le is not null;

insert or ignore into articles (slug, titre, resume, contenu, auteur, publie_le) values
  ('refonte-site-checklist',
   'Refonte de site : la checklist avant de se lancer',
   'Les dix questions à se poser avant de refaire son site.',
   'Avant de choisir des couleurs, regardez d''où viennent vos visiteurs et ce qu''ils cherchent.',
   'Maya Haddad', '2026-10-02'),
  ('vitesse-et-referencement',
   'Pourquoi la vitesse compte pour le référencement',
   'Un site lent perd des visiteurs et des places dans les résultats de recherche.',
   'Une page qui met plus de trois secondes à s''afficher perd une grande partie de ses visiteurs.',
   'Sam Rivera', '2026-10-16'),
  ('etude-de-cas-portail-assureur',
   'Étude de cas : le portail client d''un assureur',
   'Comment un assureur a mis ses contrats et ses sinistres en ligne.',
   'Les assurés déclarent désormais un sinistre en ligne, photos comprises, en moins de cinq minutes.',
   'Lina Moreau', null);
