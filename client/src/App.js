import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import ObservationsForm from './ObservationsForm';
import MemoSubmission from './MemoSubmission';
import EditCloneObservationsPage from './EditCloneObservationsPage';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={ObservationsForm} exact/>
             <Route path="/memos" component={MemoSubmission} exact/>
             <Route path="/editCodings" component={EditCloneObservationsPage} exact/> 
            </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;