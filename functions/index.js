const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

console.log("hoge");


/* Trigger: /sekki/xxxx  */
exports.returnOGP = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000');

  const date = req.path.match(/\/sekki\/([^\/\?]*)/)[1]

  fs.readFile('./ogp.html', 'utf8', function (err, templateHtml) {
    if(err) { res.status(500).send(err); }

    admin.firestore().collection('tournaments').doc(id).get().then(doc => {
      const tournament = doc.data();
      const title = xss(tournament.title) + 'のトーナメント表 | THE TOURNAMENT';
      const description = (tournament.detail && tournament.detail != '') ? xss(tournament.detail.replace(/\r?\n/g,"")) : title;
      const responseHtml = templateHtml
        .replace(/\<title>.*<\/title>/g, '<title>'+ title +'</title>')
        .replace(/(<meta id="description" .* content=")(.*)" \/>/g, '$1'+ description +'" />')
        .replace(/(<meta id="keywords" .* content=")(.*)" \/>/g, '$1'+ tournament.title +' $2" />')
        .replace(/(<meta id="og-title" .* content=")(.*)" \/>/g, '$1'+ title +'" />')
        .replace(/(<meta id="og-url" .* content=")(.*)" \/>/g, '$1'+ domain + '/tournaments/' + id +'" />')
        .replace(/(<meta id="og-description" .* content=")(.*)" \/>/g, '$1'+ description +'" />')
        .replace(/(<link id="canonical" .* href=")(.*)" \/>/g, '$1'+ domain + '/tournaments/'+ id +'" />')
        .replace(/(<link id="amp-url" rel="amphtml") \/>/g, '$1 href="'+ ampDomain + id +'.html" />');
      res.status(200).send(responseHtml);
    }).catch(error => {
      console.error(error);
      res.status(404).send(templateHtml);
    });
  })
});
