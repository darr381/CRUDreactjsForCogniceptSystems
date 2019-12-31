import React, {Component} from 'react';
import './Delete.css'
import FlashMessage from 'react-flash-message'
import Popup from "reactjs-popup";
import ReactDOM from "react-dom";
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

class Delete extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      showAlert: false,
      first: [],
      error_code: "",
      error_type: "",
      error_description: "",
      robot_tags: [],
      isFound: true,
      key_found: 1,
      key_deleted: 1,
      isDeleted: false,
      open: false
    }
    this.deleteRow = this.deleteRow.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.finalDelete = this.finalDelete.bind(this);
  }
  finalDelete(event){
    this.closeModal();
    this.deleteRow(event);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  deleteRow(event){
    let that = this
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
      if(data.name == 'Data not found'){
        that.setState({isDeleted: false,showAlert: true, key_deleted: that.state.key_deleted+1, key_found: 1, isFound: false})
      }
      else{
        that.setState({isDeleted: true,showAlert:true,key_deleted: that.state.key_deleted+1, key_found: 1, isFound: false})
      }});
    });
  }
  findRow(event){
    event.preventDefault();

    let data = {error_code: this.state.error_code}
    var request = new Request('http://localhost:3200/public/table_data', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request).then(response => response.json())
    .then(data => {console.log(data);if(data.length>0){this.setState({first: data ,
                                  dataPresent: true,
                                  error_code: data[0].error_code,
                                  error_type: data[0].error_type,
                                  error_description: data[0].error_description,
                                  robot_tags: data[0].robot_tags,
                                  isFound: true,
                                  key_deleted: 1,
                                  key_found: this.state.key_found+1,
                                  error_description: data[0].error_description});}
                                else{
                                  this.setState({isFound:false,key_found: this.state.key_found+1,first: [],
                                                 error_code: "",
                                                 error_type: "",
                                                 error_description: "",
                                                 robot_tags: [],
                                                 error_description: "",
                                                 key_deleted: 1
                                               })
                                }
                                }); //data is the data returned from app.get after converting the response to json

  }
  render() {
    let alert = this.state.showAlert
    let found_results;
    let delete_results;
    if( this.state.key_found == 1 ){
      found_results = <div></div>
    }
    else if(this.state.isFound == false){
      found_results = <div class="alert alert-danger" role="alert">
                        Eror Code Does not exist
                       </div>
    }
    else{
        found_results =
        <div className='row'>
          <div className='col-6'>
            <div className='row'>
              <div className='col-6'>
              <label> Error Code</label>
              </div>
              <div className='col-6'>
              <div> {this.state.error_code}</div>
              </div>
            </div><br/>
            <div className='row'>
              <div className='col-6'>
              <label> Error Type</label>
              </div>
              <div className='col-6'>
              {this.state.error_type}
              </div>
            </div><br/>
            <div className='row'>
              <div className='col-6'>
              <label> Robot Tags</label>
              </div>
              <div className='col-6'>
              {this.state.robot_tags.map((tags)=>{return(<div>{tags}</div>) })}
              </div>
            </div><br/>
          </div>
          <div className='col-6'>
            <label> Error Description</label><br/>
            {this.state.error_description}
          </div>
        </div>
    }
    if(this.state.key_deleted == 1){
      delete_results = <div></div>
    }
    else if(this.state.isDeleted == false){
      delete_results = <div class="alert alert-danger" role="alert">
                        Eror Code Does not exist
                       </div>
    }
    else{
      delete_results = <div class="alert alert-success" role="alert">
                          Successfully Deleted
                       </div>
    }
    return(

      <div>
      <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal}>
        <a className="close" onClick={this.closeModal}> &times; </a>
        <div className='content'>
          <h1><strong> Confirmation </strong></h1><br/>
          <div className='row'>
            <div className='col-11'> Are you sure you want to delete ?</div>
          </div><br/><br/>
          <div className='row'>
            <div className='col-6'>
              <button className='form-control button' onClick={this.finalDelete} style={{backgroundColor:'#d9534f', color:'white'}}> Yes </button>
            </div>
            <div className='col-6'>
              <button className='form-control button' onClick={this.closeModal}> No </button>
            </div>
          </div>
        </div>
      </Popup>
      <Col xs="12" md="10" style={{marginLeft: '8vw'}}>
        <Card>
          <CardHeader>
            Delete Record
          </CardHeader>
          <CardBody>
            <div className='row'>
              <div className='col-4'>
                <label> Error Code</label>
              </div>
              <div className='col-4'>
                <input type='text' ref="error_code_delete" onClick={(e)=>{e.target.value=""; this.setState({error_code: e.target.value})}}className= 'form-control' placeholder="Error Code" onChange={e=>{this.setState({error_code: e.target.value})}}/><br/>
              </div><br/>
              <div className='col-3'>
                <button className='btn btn-success btn-md' onClick={this.findRow.bind(this)}> Search </button>
              </div>
              <br/>
            </div>
            <div className='row mx-auto'>
              <div className='col'>
                <button className='btn btn-danger btn-md' onClick={this.openModal}> Delete </button>
              </div>
            </div>
            <br/>{found_results}{delete_results}<br/>
          </CardBody>
        </Card>
      </Col>

        {/*<HandleAert key={this.state.key} showAlert={this.state.showAlert} isDeleted={this.state.isDeleted} /> */}

      </div>
    );
  }
}
function HandleAert(props){
  if(props.showAlert ){
    if(props.isDeleted)
    return(
        <FlashMessage duration={2000}>
              <strong style={{color: 'green'}}>Successfully Deleted</strong>
        </FlashMessage>
    )
    else{
      return (<FlashMessage duration={2000}>
            <strong style={{color: 'red'}}>Error Code Not Found</strong>
      </FlashMessage>)
    }
  }
  return <div> </div>
}

export default Delete;
