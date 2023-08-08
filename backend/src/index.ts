import loadApp from './expressApp';
import db from './knex';

const port = process.env.PORT ?? 4000;

async function main() {
  try {
    await db.migrate.latest();
    console.log('Migrations ran successfully');
    await db.seed.run();
    console.log('Seeds ran successfully');

    const app = loadApp();
    app.listen(port, function () {
      console.info(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the app:', error);
  }
}

main();
