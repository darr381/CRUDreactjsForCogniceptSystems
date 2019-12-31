import React, {Component} from 'react'
//import 'bootstrap/dist/css/bootstrap.css';
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

class DisplayError extends Component{

  constructor(props){ //any data passed to a class object is stored inside props , to receive it i need props in the constructor and super parameters
    //not called whent his class is called the 2nd time or more
    super(props)
    this.state={
      first: this.props.first.first.first[0]
      }
  }

  render(){
    let error_code= null;
    let error_type=null;
    let error_description = null;
    let robot_tags = null;
    if(this.props.first.first.first[0] != null){
       error_code = this.props.first.first.first[0].error_code //this.state.first.error_code
       error_type = this.props.first.first.first[0].error_type//this.state.first.error_type
       error_description = this.props.first.first.first[0].error_description//this.state.first.error_description
       robot_tags = this.props.first.first.first[0].robot_tags//this.state.first.robot_tags
    }

    // console.log(robot_tags.map(tags => {
    //   return tags
    // }))
    let tag ;
    if(this.props.first.first.first[0] != null){
      tag =
      <div className='row'>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <label> Error Code</label>
            </div>
            <div className='col-6'>
              <div> {error_code}</div>
            </div>
          </div><br/>
          <div className='row'>
            <div className='col-6'>
              <label> Error Type</label>
            </div>
            <div className='col-6'>
              {error_type}
            </div>
          </div><br/>
          <div className='row'>
            <div className='col-6'>
              <label> Robot Tags</label>
            </div>
            <div className='col-6'>
              {robot_tags.map((tags)=>{return(<div>{tags}</div>) })}
            </div>
          </div><br/>
        </div>
        <div className='col-6'>
          <label> Error Description</label><br/>
          {error_description}
        </div>
      </div>
    }
    else{
      tag =
            <div class="alert alert-danger" role="alert">
              Eror Code Does not exist
            </div>
    }
    return (
      <div>
        {tag}
      </div>
    )
  }
}

export default DisplayError
