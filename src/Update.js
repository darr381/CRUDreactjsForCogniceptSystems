import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
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

class Update extends Component { //function App() {
  constructor(){
    super();
    this.state = {
      first: [],
      error_code: "",
      error_type: "",
      error_description: "",
      robot_tags: "",
      isFound: true,
      isUpdated: "false",
      key: 1
    }
  }
  updateRow (event){
    event.preventDefault();
    let that = this;
    let data = {
      error_type: this.state.error_type,
      error_code: this.state.error_code,
      error_description: this.refs.error_description_update.value,
      robot_tags: this.state.robot_tags
    };
    var request = new Request('http://localhost:3200/public/update_row', {
      method: 'PATCH',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    //xmlHTTPrequest
    fetch(request).then(function(response){
      response.json().then(function(data){
        console.log(data)
          if(data.message =="Update Failed"){
            that.setState({isUpdated: "failed",key: that.state.key+1});
          }
          else{
            that.setState({isUpdated: "true", key: that.state.key+1});
          }
      });
    });
    this.setState({first: [],
                   error_code: "",
                   original_error_code:"",
                   error_type: "",
                   error_description: "",
                   robot_tags: "",
                   })
  this.refs.error_description_update.value = ""
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
    .then(data => {;if(data.length>0){this.setState({first: data ,
                                  dataPresent: true,
                                  error_code: data[0].error_code,
                                  error_type: data[0].error_type,
                                  error_description: data[0].error_description,
                                  robot_tags: data[0].robot_tags,
                                  isFound: true,
                                  isUpdated: "false"
                                  });this.refs.error_description_update.value=data[0].error_description;}
                                else{
                                  this.setState({isFound:false, key: this.state.key+1,first: [], isUpdated:false,
                                                 error_code: "",
                                                 error_type: "",
                                                 error_description: "",
                                                 robot_tags: ""})
                                this.refs.error_description_update.value = ""}
                                }); //data is the data returned from app.get after converting the response to json

  }
  // changeTextarea(){
  //   this.refs.error_description_update.style.height = 'auto';
  //   this.refs.error_description_update.style.height = this.refs.error_description_update.scrollHeight + 'px';
  // }
  render() {
     let flashMessage ;let update_results;
     if(this.state.isUpdated=="false"){
       update_results = <div></div>
     }
     else if(this.state.isUpdated == "true"){
       update_results =
                        <div class="alert alert-success" role="alert">
                          Successfully Update
                        </div>
     }
     else if(this.state.isUpdated=="failed"){
       update_results=
                       <div class="alert alert-danger" role="alert">
                         Failed To Update
                       </div>
     }
    if(!this.state.isFound){
     flashMessage =
                    <div class="alert alert-danger" role="alert">
                      Eror Code Does not exist
                    </div>
    }
    else{
      flashMessage = <div></div>
    }


    return(
      <div>
      <Col xs="12" md="10" style={{marginLeft: '8vw'}}>
        <Card>
          <CardHeader>
            Find Error
          </CardHeader>
            <CardBody>
              <form >
                <div className='row'>
                  <div className='col-4'>
                    <label> Error Code</label>
                  </div>
                  <div className='col-4'>
                    <input type='text' onChange={e=>{this.setState({error_code: e.target.value})}} placeholder='Error Code' className='form-control' value={this.state.error_code} />
                  </div><br/>
                  <div className='col-3'>
                    <button className='btn btn-success btn-md'  onClick={this.findRow.bind(this)}>Search </button>
                  </div>
                  <br/>
                </div>
              </form><br/><br/>
              {flashMessage}
            </CardBody>
        </Card>
      </Col>
      <Col xs="12" md="10" style={{marginLeft: '8vw'}}>
        <Card>
          <CardHeader>
            <strong>Update</strong>
          </CardHeader>
          <CardBody>
            <form>
              <div className='row'>
                <div className='col-6'>
                  <label> Error Type</label>
                </div>
                <div className='col-6'>
                  <input type='text' onChange={(e)=>{this.setState({error_type: e.target.value})}} placeholder='Error Type' className='form-control' value={this.state.error_type} />
                </div>
              </div><br/>
              <div className='row'>
                <div className='col-6'>
                  <label> Robot Tags</label>
                </div>
                <div className='col-6'>
                  <input type='text' placeholder='tag1,tag2,tag3...' onChange={(e)=>{this.setState({robot_tags: e.target.value})}} className='form-control' value={this.state.robot_tags}/>
                </div>
              </div><br/>
              <div className='row'>
                <div className='col-6'>
                  <label> Error Description</label>
                </div>
                <div className='col-6'>
                  <textarea ref='error_description_update' className= 'form-control' placeholder="Error Description" value={this.state.error_description} onChange={(e)=>{this.setState({error_description:e.target.value})}}/>
                </div>
              </div><br/>
              <div className='col-6' style={{marginLeft: '330px',width:'190px'}}>
                <button className='btn btn-success btn-md' onClick={this.updateRow.bind(this)}> Submit </button><br/><br/>
              </div>
              {update_results}
              </form>

              </CardBody>
            </Card>
          </Col>
      </div>

    );
  }
}

export default Update;
