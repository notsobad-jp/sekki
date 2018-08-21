const fs = require('fs');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sekkiJSON = require('./sekki.json');

var serviceAccount = require('./cert.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


/* Trigger: /sekki/xxxx  */
exports.returnOGP = functions.https.onRequest((req, res) => {
  // res.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000');

  const id = req.path.match(/\/sekki\/([^\/\?]*)/)[1]
  var sekki = sekkiJSON[id];

  fs.readFile('./template.html', 'utf8', function (err, templateHtml) {
    if(err) { res.status(500).send(err); }
    var title = sekki.kou + '（'+ sekki.kou_kana +'）- '+ sekki.sekki + ' | Tab Sekki';
    var description = sekki.sekki + "「" + sekki.kou + '」（'+ sekki.kou_kana + '）' + sekki.meaning;
    var keywords = sekki.sekki + "," + sekki.kou + "," + sekki.kou_kana;

    const responseHtml = templateHtml
      .replace(/{{id}}/g, id)
      .replace(/{{title}}/g, title)
      .replace(/{{description}}/g, description)
      .replace(/{{keywords}}/g, keywords);

    res.status(200).send(responseHtml);
  });
});
