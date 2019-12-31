import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';
import Tabs from './components/Tabs';
import './components/Tab.css';
import Update from './Update.js'
import Delete from './Delete.js'
import Search from './Search.js'
import Add from './Add.js'
import FlashMessage from 'react-flash-message'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class App extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      first: [],
      isAdded: false,
      key: 1,
      isRepeated: false,
      isEmpty: false
    }
  }

  addRow(event){
    event.preventDefault();
    let that = this;
    console.log(this.refs.error_code.value);
    if(this.refs.error_code.value === ""){
        that.setState({isEmpty: true,key: this.state.key+1 ,isAdded: false,isRepeated:false})
      return
    }
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
        if(data.name === 'error'){
          that.setState({isRepeated:true,isAdded: false});
        }
        else{
          that.setState({isAdded: true,isRepeated: false});
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
      <Tabs>
      <div label="New Error">
        <Add />
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
      <br/>
    </div>

    );
  }
}
function HandleAert(props){

  if(props.isAdded ){
    return(
      <div class="alert alert-success" role="alert"> Successfully Added </div>
    )
  }
  else if (props.isRepeated) {
    return(
      <div class="alert alert-danger" role="alert"> Error Code Already Exist </div>
    )
  }
  else if(props.isEmpty){
    return(
      <div class="alert alert-danger" role="alert"> Error Code Field Cannot be Empty </div>
    )
  }
  return <div> </div>
}
export default App;
