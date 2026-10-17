-- SITEWEB-5 : demandes de devis reçues par le site (SQLite).
create table if not exists demandes_devis (
  id            integer primary key,
  nom           text not null,
  email         text not null,
  entreprise    text,
  besoin        text not null check (besoin in ('site', 'application', 'refonte', 'autre')),
  budget        text,
  message       text not null,
  consentement  integer not null check (consentement = 1),
  recue_le      text not null default (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  traitee       integer not null default 0
);

-- La boîte de réception de l'équipe commerciale : les demandes pas encore traitées, les plus anciennes d'abord.
create index if not exists demandes_devis_a_traiter on demandes_devis (recue_le) where traitee = 0;
