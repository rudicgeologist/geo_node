const express = require('express')
const app = express()
const port = process.env.PORT || 3000
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

app.get('/get_holeDepths', (req, res) => { 

  console.log(req.query.hole_id)

  dba.GetHoleDepths(req.query.hole_id, req.query.hole_depth_id).then(holeDepths => {
    console.log(holeDepths);
    res.send(holeDepths)
  })
})


app.get('/save_holeDepth', (req, res) => { 

  // console.log(req.query.hole_id)

  dba.SaveHoleDepth(req.query.hole_id, req.query.hole_depth_id, req.query.depth_, req.query.desription_).then(holeDepths => {
    console.log(holeDepths);
    res.send(holeDepths)
  })
})

app.get('/save_media_to_object', (req, res) => { 

  console.log('save_media_to_object');

  dba.SaveMediaToObject(
    req.query.url, 
    req.query.media_type, 
    req.query.object_type, 
    req.query.object_id
  ).then(resSM => {
    console.log(resSM);
    res.send(resSM);
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
