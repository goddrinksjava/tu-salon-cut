create table app_user(
    id serial primary key,
    email varchar(30),
    hashed_password varchar(60),
    fk_app_role varchar(20) not null references app_role,
    email_validated_at timestamp,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);