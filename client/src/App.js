import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import ObservationsForm from './ObservationsForm';
import MemoSubmission from './MemoSubmission';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={ObservationsForm} exact/>
             <Route path="/memos" component={MemoSubmission} exact/>
            </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;