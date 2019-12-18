import React, {Component} from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import FlashMessage from 'react-flash-message'

class Delete extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      showAlert: false,
      first: [],
      key: 1
    }
  }
  deleteRow(event){
    this.setState({showAlert: false})
    event.preventDefault();
    let data = {
      error_code: this.refs.error_code_delete.value
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
    this.setState({showAlert: true})
      this.setState({key: this.state.key+1})
  }
  render() {
    let aler = this.state.showAlert
    return(
      <div>
        <h1> Delete Record</h1>
        <form>
              <div className="d-inline-flex p-2">
              <input type='text' ref="error_code_delete" className= 'form-control' placeholder="Error Code"/><br/>
              </div>
              <button onClick={this.deleteRow.bind(this)}> Delete Record </button>
        </form>
          <HandleAert key={this.state.key} props={this.state.showAlert} />
      </div>
    );
  }
}
function HandleAert(props){
  console.log(props)
  if(props.props ){

    console.log('falsh');
    return(
      <FlashMessage duration={1000}>
        <strong>Successfully Deleted</strong>
      </FlashMessage>
    )
  }
  return <div> </div>
}

export default Delete;
