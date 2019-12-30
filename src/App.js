import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import Tabs from './components/Tabs';
import './components/Tab.css';
import Update from './Update.js'
import Delete from './Delete.js'
import Search from './Search.js'
import PrimaryButton, { LoadingTextButton, SuccessButton, DangerButton, RoundSpinnerButton } from '@bit/lekanmedia.shared-ui.primary-button';
import { InputText } from '@bit/primefaces.primereact.inputtext';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import FlashMessage from 'react-flash-message'

class App extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      first: [],
      isAdded: false,
      key: 1,
      isRepeated: false
    }
  }

  addRow(event){
    let that = this;
    event.preventDefault();
    let data = {
      error_type: this.refs.error_type.value,
      error_code: this.refs.error_code.value,
      error_description: this.refs.error_description.value,
      robot_tags: this.refs.robot_tags.value,
    };
    var request = new Request('http://localhost:3200/public/new_row', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });
    //xmlHTTPrequest
    fetch(request).then(function(response){
      response.json().then(data => {
        if(data.name =='error'){
          that.setState({isAdded: false});
          that.setState({isRepeated:true});
        }
        else{
          that.setState({isRepeated: false});
          that.setState({isAdded: true});
        }
      });
    });
    that.refs.error_code.value = ""
    that.refs.robot_tags.value = ""
    that.refs.error_type.value = ""
    that.refs.error_description.value = ""
    this.setState({key: this.state.key+1})
  }
  changeTextarea(){
    this.refs.error_description.style.height = 'auto';
    this.refs.error_description.style.height = this.refs.error_description.scrollHeight + 'px';
  }
  render() {
    return (
      <div className='App'>
      <PrimereactStyle />
      <div>
      <Tabs>
      <div label="New Error">
      <form>
      <h1> New Error </h1>
      <div className='row'>
        <div className='col-6'>
        <div className='row'>
          <div className='col-6'>
            <label> Error Code</label>
          </div>
          <div className='col-6'>
            <input type='text' ref='error_code' className= 'form-control' placeholder="Error Code"/>
          </div>
        </div>
        <br/><br/>
        <div className='row'>
          <div className='col-6'>
            <label> Error Type</label>
          </div>
          <div className='col-6'>
            <input type='text' ref='error_type' className= 'form-control' placeholder="Error Type"/>
          </div>
        </div>
          <br/><br/>
          <div className='row'>
            <div className='col-6'>
            <label> Robot Tags</label>
            </div>
            <div className='col-6'>
            <input  type='text' ref='robot_tags' className= 'form-control' placeholder="Robot Tags"/>
            </div>
          </div>
          <br/><br/>
        </div>
        <div className='col-6'>
          <div className='col-11'>
          <label> Error Description</label>
          <textArea style={{height: '200px'}} onChange={this.changeTextarea.bind(this)} ref='error_description' className= 'form-control ' placeholder="Error Description"/>
          </div>
          <br/>
        </div>
      </div>
      <div className='col-3' style={{marginLeft: "500px"}}>
      <PrimaryButton onClick={this.addRow.bind(this) } text='Add Row' />
      </div>
      </form>
      {/* <div className="d-inline-flex p-12">
      </div>
       <div className="d-inline-flex p-2">
       </div>
       <div className="d-inline-flex p-2">
       </div>
       <div className='d-inline-flex p-2'>
       </div> */}
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
      <br/>
      <HandleAert key={this.state.key} isAdded={this.state.isAdded} isRepeated={this.state.isRepeated}/>
    </div>

    );
  }
}
function HandleAert(props){

  if(props.isAdded ){
    return(
      <FlashMessage duration={1000}>
            <strong style={{color: 'green'}}>Successfully Added</strong>
      </FlashMessage>
    )
  }
  else if (props.isRepeated) {
    return(
      <FlashMessage duration={1000}>
            <strong style={{color: 'red'}}>Error Code Exists</strong>
      </FlashMessage>
    )
  }
  return <div> </div>
}
export default App;
