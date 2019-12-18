import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css';

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
            <table style={{marginLeft: '15vw',width: '60%'}}>
              <tbody>
                <tr>
                  <td ><label> Error Code</label> </td>
                  <td>{error_code} </td>
                </tr>
                <br/>
                <tr>
                  <td ><label> Error Type</label> </td>
                  <td> {error_type} </td>
                </tr>
                <br/>
                <tr>
                  <td ><label> Error Description</label> </td>
                  <td> {error_description} </td>
                </tr>
                <br/>
                <tr>
                  <td ><label> Robot Tags</label> </td>
                  <td> {robot_tags.map((tags)=>{return(<div>{tags}</div>) })}</td>
                </tr>
              </tbody>
            </table>
    }
    else{
      tag = <div> Error Code Does Not Exist</div>
    }
    return (
      <div>
        {tag}
      </div>
    )
  }
}

export default DisplayError
