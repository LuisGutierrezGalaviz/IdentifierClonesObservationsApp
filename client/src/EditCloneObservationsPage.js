import React from 'react';
import './App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class EditCloneObservationsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cloneIdentifierName: "",
      repositoryName: "",

      cloneObservations: []
    };
  }

  handleRepositoryNameChange = (event) => {
    this.setState({repositoryName: event.target.value});
  }
  handleCloneIdentifierNameChange = (event) => {
    this.setState({cloneIdentifierName: event.target.value});
  }

  handleCloneObservationChange = (idx) => (event) => {
    console.log(idx);
    let observationsCopy = [...this.state.cloneObservations];
    let observationItem = {...observationsCopy[idx]};
    observationItem.observation = event.target.value;
    observationsCopy[idx] = observationItem;
    this.setState({cloneObservations: observationsCopy});
    console.log(this.state);
  }
  handleFunctionSourceChange = (idx) => (event) => {
    let observationsCopy = [...this.state.cloneObservations];
    let observationItem = {...observationsCopy[idx]};
    observationItem.function_source = event.target.value;
    observationsCopy[idx] = observationItem;
    this.setState({cloneObservations: observationsCopy});
    console.log(this.state);
  }
  handleGithubLinkChange = (idx) => (event) => {
    let observationsCopy = [...this.state.cloneObservations];
    let observationItem = {...observationsCopy[idx]};
    observationItem.github_src_link = event.target.value;
    observationsCopy[idx] = observationItem;
    this.setState({cloneObservations: observationsCopy});
    console.log(this.state);
  }

  requestCloneObservations = async() => {
    let repositoryName = this.state.repositoryName;
    let cloneIdentifierName = this.state.cloneIdentifierName;

    let getCloneCodingsResponse = await Axios.post('http://localhost:3001/api/getCloneCodings', {repositoryName: repositoryName, cloneIdentifierName: cloneIdentifierName});
    console.log(getCloneCodingsResponse);
    let cloneCodings = getCloneCodingsResponse.data;
    this.setState({cloneObservations: cloneCodings});
  }

  updateCloneObservation = async(idx) => {
    console.log("Updating Clone Observation - " + idx);
    let observationId = this.state.cloneObservations[idx].id;
    let observation = this.state.cloneObservations[idx].observation;
    let function_source = this.state.cloneObservations[idx].function_source;
    let github_src_link = this.state.cloneObservations[idx].github_src_link;

    let updateCloneObservationResponse = await Axios.post('http://localhost:3001/api/updateCloneCoding', {observationId: observationId, observation: observation, function_source: function_source, github_src_link:github_src_link});
    console.log(updateCloneObservationResponse);
  }

  render(){
    return (
      <div className="wrapper">
        <Link to={"./"}>Submit New Codings</Link>

        <h1>Edit Clone Codings/Observations</h1>
        <p>
          <strong>Overview:</strong> Use this page to edit codings/observations you have submitted for a specific clone.
          Start by entering the repository name and clone identifier name for which you want to view and edit observations/codings.
        </p>

        <div className="formField">
            <div className="formFieldTitle">Repository name: </div>
            <input type="text" style={{width: "20rem"}} value={this.state.repositoryName} onChange={this.handleRepositoryNameChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone Identifier name: </div>
            <input type="text" style={{width: "20rem"}} value={this.state.cloneIdentifierName} onChange={this.handleCloneIdentifierNameChange}/>
        </div>
        <button onClick={this.requestCloneObservations}>Get Codings</button>
        <br></br><br></br>

        {this.state.cloneObservations.map((cloneObservation, index) => {
          return (
            <div>
              <h3>ObservationId - {cloneObservation.id}</h3>
              <h4 style={{marginBlockStart: "0.25rem", marginBlockEnd: "0.25rem"}}>Clone Observation</h4>
              <textarea id="cloneObservation" name="observation"  rows="16" cols="100" onChange={this.handleCloneObservationChange(index)}>{cloneObservation.observation}</textarea>
              <h4 style={{marginBlockStart: "0.25rem", marginBlockEnd: "0.25rem"}}>Function Source Code</h4>
              <textarea id="functionSource" name="functionSource"  rows="16" cols="100" onChange={this.handleFunctionSourceChange(index)}>{cloneObservation.function_source}</textarea>
              <br></br>
              <h4 style={{marginBlockStart: "0.25rem", marginBlockEnd: "0.25rem"}}>Github Link to function</h4>
              <input type="text" style={{width: "50rem"}} value={cloneObservation.github_src_link} onChange={this.handleGithubLinkChange(index)}/>
              <br></br><br></br>
              <button onClick={() => this.updateCloneObservation(index)}>Update Observation</button>
              <hr></hr>
            </div>
          )
        })}
      </div>
    )
  }
}

export default EditCloneObservationsPage;
