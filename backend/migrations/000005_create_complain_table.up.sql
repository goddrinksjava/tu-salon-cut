create table complain(
    fk_user int not null references app_user,
    fk_classroom varchar(20) not null references classroom,
    fk_label int not null references classroom_problem
);