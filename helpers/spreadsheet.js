
let {google} = require('googleapis');
let authentication = require("../config/spread_sheet");
var sheets = google.sheets('v4');


function readSheet(auth){

  return new Promise((resolve,reject)=>{
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: '1e27OIX-r0NyMUkckjPxu9n62DvHSIRE7nEgcW2sZWw0',
      range: 'Sheet1' //Change Sheet1 if your worksheet's name is something else
    }, (err, response) => {
      if (err) {
          reject(err);
          return;
      }
      var rows = response.data.values||0;
      if (!rows.length) {
        resolve('data not found')
        } else {
          var arr=[];
        for (var i = 0;i<rows.length;i++) {
          var row = rows[i];
          // pushin into array
          arr.push({"index":row[0],"timestamp":row[1],"hash":row[2],"prevHash":row[3],"data":row[4]});
        }
        resolve({blockchain:arr});
      }
    });
  });
  }


//function to add sheets
function addSheet(auth) {
  sheets.spreadsheets.create({
    auth: auth,
    resource: {
        properties:{
            title: "AngelHack"
        }
    }
  }, (err, response) => {
    if (err) {
      reject(err);
      return;
    } else {
        resolve("Added");
    }
  });
}



// function to write into sheets
function updateSheet(auth,values){
  return new Promise((resolve,reject)=>{
    sheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: '1e27OIX-r0NyMUkckjPxu9n62DvHSIRE7nEgcW2sZWw0',
      range: 'Sheet1', //Change Sheet1 if your worksheet's name is something else
      valueInputOption: "USER_ENTERED",
      resource: {
        values: values
        }
    },(err, response) => {
      if (err) {
        reject(err);
        return;
      }
      else {
          resolve('appended to blockchain');
          }
      });
});
}

// authentication.authenticate()
// .then((auth)=>{
//   return updateSheet(auth,[["dfd;f;","fdfkdlk","sdsdsdsd"]])
// })
// .then(msg=>console.log(msg))
// .catch(err=>console.log(err));
module.exports={
  readSheet,updateSheet,addSheet
}
