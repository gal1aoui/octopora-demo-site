-- SITEWEB-8 : pages vues par jour, sans cookie ni identifiant de visiteur (SQLite).
create table if not exists audience_quotidienne (
  jour    text not null,
  chemin  text not null,
  source  text not null default '',
  vues    integer not null default 0 check (vues >= 0),
  primary key (jour, chemin, source)
);

create index if not exists audience_quotidienne_par_chemin on audience_quotidienne (chemin, jour);
