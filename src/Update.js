import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

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
      s_num: this.refs.s_num_update.value ,
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
  render() {
    return(
      <div>
      <h1> Update </h1>
      <form>
            <div className="col-2">
            <input type='text' ref="s_num_update" className= 'form-control' placeholder="S_NUM"/><br/>
            </div>
            <div className="col-2">
            <input type='text' ref='error_type_update' className= 'form-control' placeholder="Error Type"/><br/>
            </div>
            <div className="col-2">
            <input type='text' ref='error_code_update' className= 'form-control' placeholder="Error Code"/><br/>
            </div>
            <div className="col-2">
            <textarea ref='error_description_update' className= 'form-control' placeholder="Error Description"/><br/>
            </div>
            <div className="col-2">
            <input  type='text' ref='robot_tags_update' className= 'form-control' placeholder="Robot Tags"/><br/>
            </div>
            <button onClick={this.updateRow.bind(this)}> Update record </button>

      </form>
      </div>

    );
  }
}

export default Update;
