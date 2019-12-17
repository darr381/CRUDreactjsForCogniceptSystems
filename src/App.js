import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from './components/Tabs';
import './components/Tab.css';

class App extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      title: 'CorErrorClassification',
      first: []
    }
  }
  showTable(event){
    event.preventDefault();
    var request = new Request('http://localhost:3000/public/table_data', {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
    });
    fetch(request).then(response => response.json()).then(data => this.setState({first: data})); //data is the data returned from app.get after converting the response to json
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
  validate(s_num){
    if(s_num === parseInt(s_num,10)){
      return true;
    }
    else {
      return  false;
    }
  }

  render() {
    let first_array;
    let title = this.state.title;
    let first=  this.state.first[0];
    const isEnable = false;
    if(first != null){
      isEnable = this.validate(this.refs.s_num.value);
    }

    return (
      <div className='App'>
      <h1> {title} </h1>
      <form className = 'createForm'>
      <div className="col-2">
      <input type='text' ref='error_type' className= 'form-control' placeholder="Error Type"/><br/>
      </div>
      <div className="col-2">
      <input type='text' ref='error_code' className= 'form-control' placeholder="Error Code"/><br/>
      </div>
      <div className="col-2">
      <textarea ref='error_description' className= 'form-control' placeholder="Error Description"/><br/>
      </div>
      <div className="col-2">
      <input  type='text' ref='robot_tags' className= 'form-control' placeholder="Robot Tags"/><br/>
      </div>
      <div className='col-2'>
        <button onClick={this.addRow.bind(this)}>Add Row </button>
      </div>
      <div className='col-2'>
      <button onClick={this.showTable.bind(this)}>Show Database </button>
      </div>
      </form>
      <div> {JSON.stringify(first)}</div>
      <div>
      <h1>Tabs Demo</h1>
      <Tabs>
      <div label="Gator">

      </div>
      <div label="Croc">
      After 'while, <em>Crocodile</em>!
      </div>
      </Tabs>
      </div>
      </div>

    );
  }
}

export default App;
