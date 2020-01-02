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
export default App;
