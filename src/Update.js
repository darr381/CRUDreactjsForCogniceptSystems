import React, {Component} from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';

class Update extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      title: 'CorErrorClassification',
      first: []
    }
  }
  updateRow (event){
    event.preventDefault();
    let data = {
      error_type: this.refs.error_type_update.value,
      error_code: this.refs.error_code_update.value,
      error_description: this.refs.error_description_update.value,
      robot_tags: this.refs.robot_tags_update.value,
    };
    var request = new Request('http://localhost:3000/public/update_row', {
      method: 'PATCH',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    //xmlHTTPrequest
    fetch(request).then(function(response){
      response.json().then(function(data){
      });
    });
  }
  changeTextarea(){
    this.refs.error_description_update.style.height = 'auto';
    this.refs.error_description_update.style.height = this.refs.error_description_update.scrollHeight + 'px';
  }
  render() {
    return(
      <div>
      <h1> Update </h1>
      <form>
        <table style={{marginLeft: '15vw',width: '60%'}}>
          <tbody>
            <tr>
              <td ><label> Error Code</label> </td>
              <td> <input type='text' ref='error_code_update' className= 'form-control' placeholder="Error Type"/> </td>
            </tr>
            <br/>
            <tr>
              <td ><label> Error Type</label> </td>
              <td> <input type='text' ref='error_type_update' className= 'form-control' placeholder="Error Code"/> </td>
            </tr>
            <br/>
            <tr>
              <td ><label> Error Description</label> </td>
              <td> <textArea ref='error_description_update' onChange={this.changeTextarea.bind(this)}className= 'form-control' placeholder="Error Description"/> </td>
            </tr>
            <br/>
            <tr>
              <td ><label> Robot Tags</label> </td>
              <td><input  type='text' ref='robot_tags_update' className= 'form-control' placeholder="Robot Tags"/> </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <button onClick={this.updateRow.bind(this)}> Update record </button>
            {/*}<div className="d-inline-flex p-2">
            </div>
            <div className="d-inline-flex p-2">
            <br/>
            </div>
            <div className="d-inline-flex p-2">
            <br/>
            </div>
            <div className="d-inline-flex p-2">
            <br/>
            </div>*/}
      </form>
      </div>

    );
  }
}

export default Update;
