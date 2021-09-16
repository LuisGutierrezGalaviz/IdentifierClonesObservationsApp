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

const getCloneDataQuery = `select * from identifierclones.clones_data`;

/*pool.query(`select * from identifierclones.clones_data`, (err, res) =>{
  return console.log(res);
})*/

//If repositoryName and cloneName do not exist in clones_data table, create new entry
/*
    const insertCloneData = `select * from identifierclones.clones_data where identifier_name='${this.state.identifierName}' AND repository_name='${this.state.repositoryName}'`;
    db.query(insertCloneData, (err, res) =>{
      return console.log(res);
    })*/



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

app.listen(3001, () => {
    console.log("running on port 3001");
});