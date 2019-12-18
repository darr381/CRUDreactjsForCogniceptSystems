import React, {Component} from 'react';
import './App.css';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.css';
import { InputText } from '@bit/primefaces.primereact.inputtext';
import { Button } from '@bit/primefaces.primereact.button';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
=======
//import 'bootstrap/dist/css/bootstrap.css';
>>>>>>> Connected to Cloud Database Server

class Update extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      title: 'CorErrorClassification',
      first: [],
      error_code: null,
      error_type: null,
      error_description: null,
      robot_tags: null
    }
  }
  updateRow (event){
    event.preventDefault();
    let data = {
      error_type: this.state.error_type,
      error_code: this.state.error_code,
      error_description: this.refs.error_description_update.value,
      robot_tags: this.state.robot_tags,
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
      <PrimereactStyle/>
      <form>
        <table style={{marginLeft: '15vw',width: '60%'}}>
          <tbody>
            <tr>
              <td ><label> Error Code</label> </td>
              <td>
                <InputText type='text' onChange={e=>{this.setState({error_code: e.target.value})}} placeholder='Error Code' tooltip='Numbers Only' className='form-control'/>
              {/*}<input type='text' ref='error_code_update' className= 'form-control' placeholder="Error Type"/> */}
              </td>
            </tr>
            <br/>
            <tr>
              <td ><label> Error Type</label> </td>
              <td> <InputText type='text' onChange={(e)=>{this.setState({error_type: e.target.value})}} placeholder='Error Type' tooltip='Conscise' className='form-control'/> {/*<input type='text' ref='error_type_update' className= 'form-control' placeholder="Error Code"/>*/} </td>
            </tr>
            <br/>
            <tr>
              <td ><label> Error Description</label> </td>
              <td> <textArea ref='error_description_update' onChange={this.changeTextarea.bind(this)}className= 'form-control' placeholder="Error Description"/> </td>
            </tr>
            <br/>
            <tr>
              <td ><label> Robot Tags</label> </td>
              <td><InputText type='text' placeholder='Robot Tags' tooltip='Tag1 , Tag2 , Tag3' onChange={(e)=>{this.setState({robot_tags: e.target.value})}} className='form-control'/> </td>
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
