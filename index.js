const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

/// <PUSH-NOTIFICATION>
/**
 * GENERARE LE CHIAVI
 * [a] Il metodo `generateVAPIDKeys` Genera le chiavi pubbliche private.
 * [b] Facendo il `console.log` di `vapidKeys`, nel terminale vengono
 *     printate le chiavi che bisogna copiarle per creare l' oggetto
 *     `vapidKeys` che ha come props `publicKey` e `privateKey`
 *     con il loro rispettivo valore delle chiavi
 * NOTE: una volta ottenute le 2 chiavi le righe [a] e [b]
 *       si devono disattivare
 */
// const vapidKeys = webpush.generateVAPIDKeys(); // [a]
// console.log('vapidKeys', vapidKeys); // [b]

const vapidKeys = {
  publicKey:
    'BGHQnh1L4ae5m8T0uKazybR_3TtT6L8AKfDxxnAguyyDIjAA0YiOal-DJ6XWEyE0s2iqoR2EaR0DHcv0XbaMKeY',
  privateKey: 'fRod1wMMk1syQoVgsCb5Taltfo3JzAPDNUAkrB8Aaqo'
};

/// settare email (mittente o destinatario?)
webpush.setVapidDetails(
  'mailto:test@test.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

/**
 * Subscribe Route
 * [a] Get pushSubscription object
 * [b] Send 201 - resource created
 * [c] Create payload
 * [d] Pass object into sendNotification
 */
app.post('/subscribe', (req, res) => {
  const subscription = req.body; // [a]

  res.status(201).json({}); // [b]

  const payload = JSON.stringify({ title: 'Push Test' }); // [c]

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
}); // [d]
// </PUSH-NOTIFICATION>

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
