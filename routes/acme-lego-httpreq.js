const express = require('express');
const router = express.Router();

var user = process.env.SELFHOSTDE_USER;
var password = process.env.SELFHOSTDE_PASSWORD;
var recordId = process.env.SELFHOSTDE_TXTRECORDID;

if (!user || !password || !recordId) {
  throw 'You need to provide Selfhost.de credentials'
}

function updateSelfhost(content) { return new Promise((resolve, reject) => {
  let url = `https://selfhost.de/cgi-bin/api.pl?username=${user}&password=${password}&rid=${recordId}&content=${content}`
  fetch(url)
    .then(response => response.text())
    .then(result => {
      if (result !== "200 OK") {
        reject({ message: "Failed to update selfhost.de with following message: " + result });
      }
      else {
        resolve();
      }
    })
    .catch(error => {
      reject(error);
    });
})};


router.post('/present', function(req, res, next) {
  updateSelfhost(req.body.value)
    .then(() => { res.send('Successfully updated TXT entry'); })
    .catch(error => { next(error); })
});

router.post('/cleanup', function(req, res, next) {
  updateSelfhost('None')
    .then(() => { res.send('Successfully reset TXT entry'); })
    .catch(error => { next(error); })
});
  
module.exports = router;
