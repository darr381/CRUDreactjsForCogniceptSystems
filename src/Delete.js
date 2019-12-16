import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class Delete extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      title: 'CorErrorClassification',
      first: []
    }
  }
  deleteRow(event){
    console.log('deleteRow entered');
    event.preventDefault();
    let data = {
      s_num: this.refs.s_num_delete.value ,
    };
    var request = new Request('http://localhost:3000/public/delete_row', {
      method: 'DELETE',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    //xmlHTTPrequest
    fetch(request).then(function(response){
      response.json().then(function(data){
      });
    });
  }
  render() {
    return(
      <div>
      <h1> Delete </h1>
      <form>
            <div className="col-2">
            <input type='text' ref="s_num_delete" className= 'form-control' placeholder="S_NUM"/><br/>
            </div>
            <button onClick={this.deleteRow.bind(this)}> Delete Record </button>
      </form>
      </div>
    );
  }
}

export default Delete;
