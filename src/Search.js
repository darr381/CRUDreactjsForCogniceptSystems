import React, {Component} from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import DisplayError from './DisplayError.js';
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

class Search extends Component {
  constructor(){
    super();
    this.state = {
      dataPresent: false ,
      first: [],
      key: 1
    }
  }

  showTable(event){
    event.preventDefault();
    let data = {error_code: this.refs.error_code_show.value}
    var request = new Request('http://localhost:3200/public/table_data', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request).then(response => {response.json()
    .then(data => {this.setState({first: data ,  dataPresent: true, key: this.state.key+1});})}); //data is the data returned from app.get after converting the response to json
  }
  render() {
    return(
      <div>
      <Col xs="12" md="10" style={{marginLeft: '8vw'}}>
        <Card>
          <CardHeader>
            Search Error
          </CardHeader>
          <CardBody>
            <form>
              <div className='row'>
                <div className='col-4'>
                  <label> Error Code</label>
                </div>
                <div className="col-4">
                  <input type='text' ref="error_code_show" onClick={(e) => {e.target.value = ""}} className= 'form-control' placeholder="Error Code"/><br/>
                </div>
                <div className='col-2'>
                  <button className='btn btn-success btn-sm' onClick={this.showTable.bind(this) }> Show Record </button>
                </div>
              </div>
            </form>
            <br/>
            <ShowError first={this.state} key={this.state.key}/>
          </CardBody>
        </Card>
      </Col>
      </div>
    )
  }
}
function ShowError(props){
  let dataPresent = props.first.dataPresent ? props.first.dataPresent : null
  if(dataPresent ){
    return <DisplayError first={props}/>
  }
  return <div> </div>
}
export default Search;
