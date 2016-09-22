var db = require('odbc')()
var cn = process.env.ODBC_CONNECTION_STRING
// var cn = 'Driver={FreeTDS};Server=DB_SERVER_NAME.database.windows.net;Port=1433;Database=DB_NAME;Uid=USER_NAME@DB_NAME;Pwd=PASSWORD;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;TDS_Version=8.0'

db.open(cn, function (err) {
  if (err) return console.log(err)

  db.query('select 1', function (err, data) {
    if (err) console.log(err)

    console.log(data)

    db.close(function () {
      console.log('done')
    })
  })
})
