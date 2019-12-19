import React, {Component} from 'react';
import './App.css';
<<<<<<< HEAD
import PrimaryButton, { LoadingTextButton, SuccessButton, DangerButton, RoundSpinnerButton } from '@bit/lekanmedia.shared-ui.primary-button';
=======
//import 'bootstrap/dist/css/bootstrap.css';
>>>>>>> 93f1865c8f4b8f654eeab9cad493986110bf7264
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
    var request = new Request('http://localhost:3200/public/delete_row', {
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
              </div><br/><br/>
              <div className='col-2' style={{marginLeft: "535px"}}>
                <PrimaryButton onClick={this.deleteRow.bind(this)} text='Delete Record' />
              </div>
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
