import React from 'react';
import './App.css';
import Axios from 'axios';

class ObservationsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryName: '',
      githubLinkToSrcFunction: '',

      //Declaration of variable clone
      identifierName: '',
      dataTypeIsPrimitive: false,
      dataType: '',
      inlineInitialization: false,
      cloneValueAfterFirstAssignment: '',
      cloneValueUpdatedAfterAssignment: false,
      isLocalVariable: false,
      isFunctionArgument: false,

      //Statements containing variable clone
      containedInForLoop: false,
      containedInWhileLoop: false,
      containedInDoWhileLoop: false,
      containedInIfThen: false,
      containedInIfThenElse: false,
      containedInSwitch: false,
      containedInTryBlock: false,
      containedInCatchArgument: false,
      containedInCatchBlock: false,
      usedInReturnStatement: false,

      //Expressions containing variable clone
      containedInFunctionCalls: '',
      containedInMathEquation: '',

      //Method Information
      methodName: '',
      methodReturnType: '',
      methodBehaviorSummary: '',
      functionSource: ''
    };
  }

  handleRepositoryNameChange = (event) => {
    this.setState({repositoryName: event.target.value});
  }
  handleGithubLinkChange = (event) => {
    this.setState({githubLinkToSrcFunction: event.target.value});
  }

  handleIdentifierNameChange = (event) => {
    this.setState({identifierName: event.target.value});
  }
  handlePrimitiveChange = (event) => {
    this.setState({dataTypeIsPrimitive: event.target.checked});
  }
  handleDataTypeChange = (event) => {
    this.setState({dataType: event.target.value});
  }
  handleInlineInitializationChange = (event) => {
    this.setState({inlineInitialization: event.target.checked});
  }
  handleValueAfterFirstAssignmentChange = (event) => {
    this.setState({cloneValueAfterFirstAssignment: event.target.value});
  }
  handleUpdatedAfterAssignmentChange = (event) => {
    this.setState({cloneValueUpdatedAfterAssignment: event.target.checked});
  }
  handleIsLocalVariableChange = (event) => {
    this.setState({isLocalVariable: event.target.checked});
  }
  handleIsFunctionArgumentChange = (event) => {
    this.setState({isFunctionArgument: event.target.checked});
  }

  handleContainedInForLoopChange = (event) => {
    this.setState({containedInForLoop: event.target.checked});
  }
  handleContainedInWhileLoopChange = (event) => {
    this.setState({containedInWhileLoop: event.target.checked});
  }
  handleContainedInDoWhileLoopChange = (event) => {
    this.setState({containedInDoWhileLoop: event.target.checked});
  }
  handleContainedInIfThenChange = (event) => {
    this.setState({containedInIfThen: event.target.checked});
  }
  handleContainedInIfThenElseChange = (event) => {
    this.setState({containedInIfThenElse: event.target.checked});
  }
  handleContainedInSwitchChange = (event) => {
    this.setState({containedInSwitch: event.target.checked});
  }
  handleContainedInTryBlockChange = (event) => {
    this.setState({containedInTryBlock: event.target.checked});
  }
  handleContainedInCatchArgumentChange = (event) => {
    this.setState({containedInCatchArgument: event.target.checked});
  }
  handleContainedInCatchBlockChange = (event) => {
    this.setState({containedInCatchBlock: event.target.checked});
  }
  handleUsedInReturnChange = (event) => {
    this.setState({usedInReturnStatement: event.target.checked});
  }

  handleContainedInFunctionCallsChange = (event) => {
    this.setState({containedInFunctionCalls: event.target.value});
  }
  handleContainedInMathEquationChange = (event) => {
    this.setState({containedInMathEquation: event.target.value});
  }

  handleMethodNameChange = (event) => {
    this.setState({methodName: event.target.value});
  }
  handleMethodReturnTypeChange = (event) => {
    this.setState({methodReturnType: event.target.value});
  }
  handleMethodBehaviorSummaryChange = (event) => {
    this.setState({methodBehaviorSummary: event.target.value});
  }
  handleFunctionSourceChange = (event) => {
    this.setState({functionSource: event.target.value});
  }

  buildCloneObservationString(){
    let cloneObservationStr = `Repository Name: ${this.state.repositoryName}\n`;
    cloneObservationStr += (`Identifier Name: ${this.state.identifierName}\n`);
    this.state.dataTypeIsPrimitive ? cloneObservationStr += (`Primitive Data Type\n`) : cloneObservationStr += (`Non-Primitive Data Type\n`);
    cloneObservationStr += (`Data Type: ${this.state.dataType}\n`);
    this.state.inlineInitialization ? cloneObservationStr += (`Inline Initialization Statement\n`) : cloneObservationStr += (`Non-Inline Initialization Statement\n`);
    cloneObservationStr += (`Variable value after first assignment: ${this.state.cloneValueAfterFirstAssignment}\n`);
    this.state.cloneValueUpdatedAfterAssignment ? cloneObservationStr += (`Variable updated after first assignment\n`) : cloneObservationStr += (`Variable was not updated after first assignment\n`);
    this.state.isLocalVariable ? cloneObservationStr += (`Clone is a Local Variable\n`) : cloneObservationStr += (``);
    this.state.isFunctionArgument ? cloneObservationStr += (`Clone is a Function Argument\n`) : cloneObservationStr += (``);
    this.state.containedInForLoop ? cloneObservationStr += (`Clone is contained in a For-Loop\n`) : cloneObservationStr += (``);
    this.state.containedInWhileLoop ? cloneObservationStr += (`Clone is contained in a While-Loop\n`) : cloneObservationStr += (``);
    this.state.containedInDoWhileLoop ? cloneObservationStr += (`Clone is contained in a Do-While-Loop\n`) : cloneObservationStr += (``);
    this.state.containedInIfThen ? cloneObservationStr += (`Clone is contained in an If-Then block\n`) : cloneObservationStr += (``);
    this.state.containedInIfThenElse ? cloneObservationStr += (`Clone is contained in an If-Then-Else block\n`) : cloneObservationStr += (``);
    this.state.containedInSwitch ? cloneObservationStr += (`Clone is contained in a Switch block\n`) : cloneObservationStr += (``);
    this.state.containedInTryBlock ? cloneObservationStr += (`Clone is contained in a Try block\n`) : cloneObservationStr += (``);
    this.state.containedInCatchArgument ? cloneObservationStr += (`Clone is contained in the argument of a Catch statement\n`) : cloneObservationStr += (``);
    this.state.containedInCatchBlock ? cloneObservationStr += (`Clone is contained in a Catch block\n`) : cloneObservationStr += (``);
    this.state.usedInReturnStatement ? cloneObservationStr += (`Clone is used in the return statement\n`) : cloneObservationStr += (``);
    cloneObservationStr += (`Method calls containing the clone: ${this.state.containedInFunctionCalls}\n`);
    cloneObservationStr += (`Math Equations containing the clone: ${this.state.containedInMathEquation}\n`);
    cloneObservationStr += (`Method Name: ${this.state.methodName}\n`);
    cloneObservationStr += (`Method Return Type: ${this.state.methodReturnType}\n`);
    cloneObservationStr += (`Method Behavior Summary: ${this.state.methodBehaviorSummary}\n\n`);
    cloneObservationStr += (`Function Source Code: \n ${this.state.functionSource}`);

    return cloneObservationStr;
  }

  handleSubmit = async() => {
    console.log(this.state);
    let identifierName = this.state.identifierName;
    let repositoryName = this.state.repositoryName;

    //If there doesn't exist a repo name and clone name in clones_data, make a new entry
    let getCloneDataResponse = await Axios.post('http://localhost:3001/api/getCloneData', {identifierName: identifierName, repositoryName: repositoryName});
    console.log(getCloneDataResponse.data);
    let cloneData = getCloneDataResponse.data;
    let cloneId;
    if(cloneData.length === 0){
      let newCloneDataResponse = await Axios.post('http://localhost:3001/api/insertNewCloneData', {identifierName: identifierName, repositoryName: repositoryName});
      let newCloneData = newCloneDataResponse.data;
      console.log(newCloneData);
      cloneId = newCloneData["insertId"];
    } else {
      let cloneDataJson = cloneData[0];
      cloneId = cloneDataJson["id"];
    }
    console.log(cloneId);

    //Next, make a new entry in the clone_observations table for the current clone observation
    let cloneObservation = this.buildCloneObservationString();
    console.log(cloneObservation);
    let newCloneObservationResponse = await Axios.post('http://localhost:3001/api/insertNewCloneObservation', {cloneId: cloneId, observation: cloneObservation, functionSource: this.state.functionSource, githubLinkSrcFunction: this.state.githubLinkToSrcFunction});
    console.log(newCloneObservationResponse);

    //Reset fields that constantly change upon submission of observation
    this.setState({
      githubLinkToSrcFunction: "",
      dataTypeIsPrimitive: false,
      dataType: '',
      inlineInitialization: false,
      cloneValueAfterFirstAssignment: '',
      cloneValueUpdatedAfterAssignment: false,
      isLocalVariable: false,
      isFunctionArgument: false,
      containedInForLoop: false,
      containedInWhileLoop: false,
      containedInDoWhileLoop: false,
      containedInIfThen: false,
      containedInIfThenElse: false,
      containedInSwitch: false,
      containedInTryBlock: false,
      containedInCatchArgument: false,
      containedInCatchBlock: false,
      usedInReturnStatement: false,
      containedInFunctionCalls: '',
      containedInMathEquation: '',
      methodName: '',
      methodReturnType: '',
      methodBehaviorSummary: '',
      functionSource: ''
    });
    console.log(this.state);
  }

  render(){
    return (
      <div className="wrapper">
        <h1>Identifier Clones Objective Observations Template</h1>
        <p>
          <strong>Overview:</strong> This template will be used to gather objective observations
        describing identifier clones found in source code. 
        Apply this template to each function outputted by IdentClones tool.
        </p>

        <div className="formField">
            <div className="formFieldTitle">Repository name: </div>
            <input type="text" value={this.state.repositoryName} onChange={this.handleRepositoryNameChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Github link to src function: </div>
            <input type="text" style={{width: "35rem"}} value={this.state.githubLinkToSrcFunction} onChange={this.handleGithubLinkChange}/>
        </div>

        {/* Declaration of variable clone */}
        <div className="formField">
            <div className="formFieldTitle">Identifier name: </div>
            <input type="text" value={this.state.identifierName} onChange={this.handleIdentifierNameChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone's data type is primitive: </div>
            <input type="checkbox" checked={this.state.dataTypeIsPrimitive} onClick={this.handlePrimitiveChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Data type: </div>
            <input type="text" value={this.state.dataType} onChange={this.handleDataTypeChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Inline initialization: </div>
            <input type="checkbox" checked={this.state.inlineInitialization} onClick={this.handleInlineInitializationChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Variable value after first assignment: </div>
            <input type="text" style={{width: "35rem"}} value={this.state.cloneValueAfterFirstAssignment} onChange={this.handleValueAfterFirstAssignmentChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Variable updated after assignment: </div>
            <input type="checkbox" checked={this.state.cloneValueUpdatedAfterAssignment} onClick={this.handleUpdatedAfterAssignmentChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone is a local variable: </div>
            <input type="checkbox" checked={this.state.isLocalVariable} onClick={this.handleIsLocalVariableChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone passed in as function argument: </div>
            <input type="checkbox" checked={this.state.isFunctionArgument} onClick={this.handleIsFunctionArgumentChange} />
        </div>
        
        {/* Statements containing variable clone */}
        <div className="formField">
            <div className="formFieldTitle">Clone contained in for-loop: </div>
            <input type="checkbox" checked={this.state.containedInForLoop} onClick={this.handleContainedInForLoopChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in while-loop: </div>
            <input type="checkbox" checked={this.state.containedInWhileLoop} onClick={this.handleContainedInWhileLoopChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in do-while-loop: </div>
            <input type="checkbox" checked={this.state.containedInDoWhileLoop} onClick={this.handleContainedInDoWhileLoopChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in if-then block: </div>
            <input type="checkbox" checked={this.state.containedInIfThen} onClick={this.handleContainedInIfThenChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in if-then-else block: </div>
            <input type="checkbox" checked={this.state.containedInIfThenElse} onClick={this.handleContainedInIfThenElseChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in switch block: </div>
            <input type="checkbox" checked={this.state.containedInSwitch} onClick={this.handleContainedInSwitchChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in try block: </div>
            <input type="checkbox" checked={this.state.containedInTryBlock} onClick={this.handleContainedInTryBlockChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in catch argument: </div>
            <input type="checkbox" checked={this.state.containedInCatchArgument} onClick={this.handleContainedInCatchArgumentChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone contained in catch block: </div>
            <input type="checkbox" checked={this.state.containedInCatchBlock} onClick={this.handleContainedInCatchBlockChange} />
        </div>
        <div className="formField">
            <div className="formFieldTitle">Clone used in return statement: </div>
            <input type="checkbox" checked={this.state.usedInReturnStatement} onClick={this.handleUsedInReturnChange} />
        </div>
        
        {/* Expressions containing variable clone */}
        <div className="formField">
            <div className="formFieldTitle">Input Function Calls including clone: </div>
            <input type="text" style={{width: "35rem"}} value={this.state.containedInFunctionCalls} onChange={this.handleContainedInFunctionCallsChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Input Math Equations including clone: </div>
            <input type="text" value={this.state.containedInMathEquation} onChange={this.handleContainedInMathEquationChange}/>
        </div>

        {/* Method Information */}
        <div className="formField">
            <div className="formFieldTitle">Method Name: </div>
            <input type="text" value={this.state.methodName} onChange={this.handleMethodNameChange}/>
        </div>
        <div className="formField">
            <div className="formFieldTitle">Method Return Type: </div>
            <input type="text" value={this.state.methodReturnType} onChange={this.handleMethodReturnTypeChange}/>
        </div>
        <div className="formField">
            <div>Method Behavior Summary:</div>
            <textarea id="methodBehaviorSummary" value={this.state.methodBehaviorSummary} name="methodBehaviorSummary"  rows="6" cols="80" onChange={this.handleMethodBehaviorSummaryChange}/>
        </div>
        <div className="formField">
            <div>Function Source Code:</div>
            <textarea id="functionSource" value={this.state.functionSource} name="functionSource"  rows="6" cols="80" onChange={this.handleFunctionSourceChange}/>
        </div>

        <button onClick={this.handleSubmit} >Submit Observations</button>
      </div>
    )
  }
}

export default ObservationsForm;
