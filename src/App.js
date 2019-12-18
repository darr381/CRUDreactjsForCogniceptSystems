import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import Tabs from './components/Tabs';
import './components/Tab.css';
import Update from './Update.js'
import Delete from './Delete.js'
import Search from './Search.js'

class App extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      first: []
    }
  }

  addRow(event){
    event.preventDefault();
    let data = {
      error_type: this.refs.error_type.value,
      error_code: this.refs.error_code.value,
      error_description: this.refs.error_description.value,
      robot_tags: this.refs.robot_tags.value,
    };
    var request = new Request('http://localhost:3000/public/new_row', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    //xmlHTTPrequest
    fetch(request).then(function(response){
      response.json().then(function(data){
      });
    });
  }
  changeTextarea(){
    this.refs.error_description.style.height = 'auto';
    this.refs.error_description.style.height = this.refs.error_description.scrollHeight + 'px';
  }
  render() {
    return (
      <div className='App'>
      <div>
      <Tabs>
      <div label="New Error">
      <h1> New Error </h1>
      <form className = 'createForm'>
      <table style={{marginLeft: '15vw',width: '60%'}}>
        <tbody>
          <tr>
            <td ><label> Error Code</label> </td>
            <td><input type='text' ref='error_code' className= 'form-control' placeholder="Error Code"/> </td>
          </tr>
          <br/>
          <tr>
            <td ><label> Error Type</label> </td>
            <td> <input type='text' ref='error_type' className= 'form-control' placeholder="Error Type"/> </td>
          </tr>
          <br/>
          <tr>
            <td ><label> Error Description</label> </td>
            <td> <textArea onChange={this.changeTextarea.bind(this)} ref='error_description' className= 'form-control ' placeholder="Error Description"/> </td>
          </tr>
          <br/>
          <tr>
            <td ><label> Robot Tags</label> </td>
            <td><input  type='text' ref='robot_tags' className= 'form-control' placeholder="Robot Tags"/> </td>
          </tr>
        </tbody>
      </table>
      <br/>

      {/* <div className="d-inline-flex p-12">
      </div>
       <div className="d-inline-flex p-2">
       </div>
       <div className="d-inline-flex p-2">
       </div>
       <div className='d-inline-flex p-2'>
       </div> */}
      <button onClick={this.addRow.bind(this)}>Add Row </button>
      </form>

      </div>
      <div label="Search Error">
        <Search />
      </div>
      <div label="Update Error">
          <Update />
      </div>
      <div label="Delete Error">
        <Delete />
      </div>
      </Tabs>
      </div>
      </div>

    );
  }
}

export default App;
