import { Knex } from 'knex';
import Classroom from './classroom';
import ClassroomComplaint from './classroomComplaint';
import ClassroomProblem from './classroomProblem';
import User from './user';

declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<
      // Interface used for return type and "where", "having", etc.
      User,
      // Inserting defaults to "base" type
      // "email" and "hashed_password" are required.
      // "created_at" and "updated_at" optional.
      // "id" can't be provided.
      Pick<User, 'email' | 'hashed_password'> &
        Partial<Pick<User, 'created_at' | 'updated_at'>>,
      // This wil allow updating all fields except "id".
      Partial<Omit<User, 'id'>>
    >;

    classrooms: Knex.CompositeTableType<
      Classroom,
      Partial<Omit<Classroom, 'id'>>,
      Partial<Omit<Classroom, 'id'>>
    >;

    classroom_problems: Knex.CompositeTableType<
      ClassroomProblem,
      Partial<Omit<ClassroomProblem, 'id'>>,
      Partial<Omit<ClassroomProblem, 'id'>>
    >;

    classroom_complaints: Knex.CompositeTableType<
      ClassroomComplaint,
      Pick<
        ClassroomComplaint,
        'fk_user' | 'fk_classroom' | 'fk_classroom_problem'
      > &
        Partial<Pick<ClassroomComplaint, 'created_at' | 'updated_at'>>,
      Partial<Omit<ClassroomComplaint, 'id'>>
    >;
  }
}
