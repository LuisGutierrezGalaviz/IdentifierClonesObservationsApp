import React from 'react';
import './App.css';
import Axios from 'axios';

class MemoSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isGroundLevelMemo: false,
        memoDetails: "",
        cloneObservationIds: "",
        cloneMemoIds: ""
    };
  }

  handleIsGroundLevelMemoChange = (event) => {
    
    this.setState({isGroundLevelMemo: event.target.checked});
  }
  handleMemoDetailsChange = (event) => {
    this.setState({memoDetails: event.target.value});
  }
  handleCloneObservationIdsChange = (event) => {
    this.setState({cloneObservationIds: event.target.value});
  }
  handleCloneMemoIdsChange = (event) => {
    this.setState({cloneMemoIds: event.target.value});
  }

  handleSubmit = async() => {
    console.log(this.state);
    let memoDetails = this.state.memoDetails;

    let newCloneMemoResponse = await Axios.post('http://localhost:3001/api/insertNewMemo', {memo: memoDetails});
    console.log(newCloneMemoResponse.data);
    let cloneMemoData = newCloneMemoResponse.data;
    let memoId = cloneMemoData["insertId"];
    if(this.state.isGroundLevelMemo) {
        let cloneObservationIds = this.state.cloneObservationIds.split(",");
        cloneObservationIds.forEach(async (observationId) => {
            let observationIdInt = parseInt(observationId);
            let newObservationToMemoResponse = await Axios.post('http://localhost:3001/api/insertNewObservationToMemo', {memoId: memoId, observationId: observationIdInt});
            console.log(newObservationToMemoResponse.data);
        });
    } else {
        let cloneChildMemoIds = this.state.cloneMemoIds.split(",");
        cloneChildMemoIds.forEach(async (childMemoId) => {
            let childMemoIdInt = parseInt(childMemoId);
            let newParentMemoToChildMemoResponse = await Axios.post('http://localhost:3001/api/insertNewPMemoToCMemo', {parentMemoId: memoId, childMemoId: childMemoIdInt});
            console.log(newParentMemoToChildMemoResponse.data);
        });
    }
  }

  displayInputReferenceIds() {
    if(this.state.isGroundLevelMemo){
        return (
            <div className="formField">
                <div className="formFieldTitle">Enter Clone Observation Ids catptured by this memo (comma separated): </div>
                <input type="text" value={this.state.cloneObservationIds} onChange={this.handleCloneObservationIdsChange}/>
            </div>
        ); 
    } else {
        return (
            <div className="formField">
                <div className="formFieldTitle">Enter Child Memo Ids catptured by this memo (comma separated): </div>
                <input type="text" value={this.state.cloneMemoIds} onChange={this.handleCloneMemoIdsChange}/>
            </div>
        );
    }
  }

  render(){
    return (
      <div className="wrapper">
        <h1>Identifier Clones Memo Submission Form</h1>
        <p>
          <strong>Overview:</strong> This form will be used to record two types of memos.
        The first type of memo describes a set of ground level observations made on identifier clones.
        The second type of memo describes a set of lower level memos (parent and child memo relationship). 
        </p>

        <div className="formField">
            <div className="formFieldTitle">Ground Level Memo (represents ground level observations/codings): </div>
            <input type="checkbox" onClick={this.handleIsGroundLevelMemoChange}/>
        </div>
        {this.displayInputReferenceIds()}
        <div className="formField">
            <div>Memo Details:</div>
            <textarea id="memoDetails" name="memoDetails"  rows="10" cols="100" onChange={this.handleMemoDetailsChange}/>
        </div>

        <button onClick={this.handleSubmit}>Submit Memo</button>
      </div>
    )
  }
}

export default MemoSubmission;
