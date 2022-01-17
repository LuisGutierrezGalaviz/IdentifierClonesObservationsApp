const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "buffy",
  connectionLimit: 10
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/api/getCloneData", (req, res) => {
  const identifierName = req.body.identifierName;
  const repositoryName = req.body.repositoryName;

  const getCloneDataEntry = "SELECT * FROM identifierclones.clones_data WHERE identifier_name=? AND repository_name=?";
  db.query(getCloneDataEntry, [identifierName, repositoryName], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
})

app.post("/api/getCloneCodings", (req, res) => {
  const repositoryName = req.body.repositoryName;
  const cloneIdentifierName = req.body.cloneIdentifierName;

  const getCloneId = "SELECT id FROM identifierclones.clones_data WHERE identifier_name=? AND repository_name=?";
  const getCloneObservations = "SELECT id, observation, function_source, github_src_link FROM identifierclones.clones_observations WHERE clone_id=?";
  db.query(getCloneId, [cloneIdentifierName, repositoryName], (err, result) => {
    console.log(err);
    console.log(result);

    let cloneId = result[0].id;
    console.log(cloneId);

    db.query(getCloneObservations, [cloneId], (err, result) => {
      console.log(err);
      console.log(result);

      res.send(result);
    })
  })
})

app.post("/api/updateCloneCoding", (req, res) => {
  const observationId = req.body.observationId;
  const observation = req.body.observation;
  const function_source = req.body.function_source;
  const github_src_link = req.body.github_src_link;

  const updateCloneObservation = "UPDATE identifierclones.clones_observations SET observation=?, function_source=?, github_src_link=? WHERE id=?";
  db.query(updateCloneObservation, [observation, function_source, github_src_link, observationId], (err, result) => {
    console.log(err);
    console.log(result);

    res.send(result);
  })
})

app.post('/api/insertNewCloneData', (req, res) => {
  const identifierName = req.body.identifierName;
  const repositoryName = req.body.repositoryName;
  
  const insertCloneDataEntry = "INSERT INTO identifierclones.clones_data (identifier_name, repository_name) VALUES (?,?)";
  db.query(insertCloneDataEntry, [identifierName, repositoryName], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
})

app.post('/api/insertNewCloneObservation', (req, res) => {
  const cloneId = req.body.cloneId;
  const observation = req.body.observation;
  const functionSource = req.body.functionSource;
  const githubLinkSrcFunction = req.body.githubLinkSrcFunction;

  const insertCloneObservationEntry = "INSERT INTO identifierclones.clones_observations (clone_id, observation, function_source, github_src_link) VALUES (?,?,?,?)";
  db.query(insertCloneObservationEntry, [cloneId, observation, functionSource, githubLinkSrcFunction], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
})

app.post('/api/insertNewMemo', (req, res) => {
  const memoDetails = req.body.memo;
  const memoLevel = req.body.memoLevel;
  console.log(memoDetails);
  console.log(memoLevel);
  const insertMemoEntry = "INSERT INTO identifierclones.clones_memos (memo,memo_level) VALUES (?,?)";
  db.query(insertMemoEntry, [memoDetails, memoLevel], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
})

app.post('/api/insertNewObservationToMemo', (req, res) => {
  const memoId = req.body.memoId;
  const observationId = req.body.observationId;
  const insertMemoEntry = "INSERT INTO identifierclones.observations_to_memos (observation_id, memo_id) VALUES (?,?)";
  db.query(insertMemoEntry, [observationId, memoId], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
})

app.post('/api/insertNewPMemoToCMemo', (req, res) => {
  const parentMemoId = req.body.parentMemoId;
  const childMemoId = req.body.childMemoId;
  const insertMemoEntry = "INSERT INTO identifierclones.parentmemo_to_childmemo (parentmemo_id, childmemo_id) VALUES (?,?)";
  db.query(insertMemoEntry, [parentMemoId, childMemoId], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
})

app.listen(3001, () => {
    console.log("running on port 3001");
});