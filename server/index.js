
const Database = require('./src/database')
const config = require('./src/config');
const app = require('./src/server')
const admin = require('firebase-admin');


async function main() {
  await Database.instance.connect();
  admin.initializeApp({
    credential: admin.credential.cert('./src/serviceAccountKeys.json')
  });
  app.get('', (req, res) => {
    res.send('Hi there, server running...');
  })
  app.listen(config.PORT, config.HOST, () => { console.log(`Server started on ${config.HOST}:${config.PORT}`); })
}

main()