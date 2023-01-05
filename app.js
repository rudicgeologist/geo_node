const express = require('express')
const app = express()
const port = 3000
const dba = require('./db_adapter.js');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/get_holes', (req, res) => { 
  dba.GetHoles().then(holes => {
    console.log(holes);
    res.send(holes)
  })
})

app.get('/get_holesD', (req, res) => { 

  console.log(req.query.place_id)

  dba.GetHolesD(req.query.place_id).then(holesD => {
    console.log(holesD);
    res.send(holesD)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})