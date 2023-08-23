import path from 'path';
import loadApp from './expressApp';
import db from './knex';
import { promises } from 'fs';
import { Knex } from 'knex';

const port = process.env.PORT ?? 4000;

interface Migration {
  up: (knex: Knex) => PromiseLike<any>;
  down?: (kenx: Knex) => PromiseLike<any>
};

async function main() {
  try {
    await db.migrate.latest();

    console.log('Migrations ran successfully');

    const app = loadApp();
    app.listen(port, function () {
      console.info(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the app:', error);
  }
}

main();
