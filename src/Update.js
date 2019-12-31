import React, {Component} from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import FlashMessage from 'react-flash-message'

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
      isUpdated: false,
      key: 1
    }
  }
  updateRow (event){
    event.preventDefault();
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
      });
    });
    this.setState({first: [],
                   error_code: "",
                   error_type: "",
                   error_description: "",
                   robot_tags: "",
                   isUpdated: true})
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
                                  isUpdated: false
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
  changeTextarea(){
    this.refs.error_description_update.style.height = 'auto';
    this.refs.error_description_update.style.height = this.refs.error_description_update.scrollHeight + 'px';
  }
  render() {
     let flashMessage ;let update_results;
     if(this.state.isUpdated){
       update_results =
                 <FlashMessage duration={1000} key={this.state.key}>
                   <strong style={{color: 'green'}}>Successfully Updated</strong>
                 </FlashMessage>
     }
     else{
       update_results=<div> </div>
     }
    if(!this.state.isFound){
     flashMessage =
          <FlashMessage duration={1000} key={this.state.key}>
            <strong style={{color: 'red'}}>Error Code Not Found</strong>
          </FlashMessage>
    }
    else{
      flashMessage = <div></div>
    }


    return(
      <div>
        <div className='row'>
          <div> <label style={{marginLeft: '550px'}}>Update Error</label> </div>
        </div>
          <div className='row'>
            <div className='col-6'>
            <form>
              <div className='row'>
                <div className='col-6'>
                  <label> Error Code</label>
                </div>
                <div className='col-6'>
                  <input type='text' onChange={e=>{this.setState({error_code: e.target.value})}} placeholder='Error Code' className='form-control' value={this.state.error_code} />
                  {flashMessage}
                </div>
              </div>      {/*<input type='text' ref='error_code_update' className= 'form-control' placeholder="Error Type"/> */}
              <div className='row'>
                <div className='col-6'></div>
                <div className='col-6'>
                    <button className='form-control' style={{width: '170px', marginLeft:'50px'}} onClick={this.findRow.bind(this)}>Find record </button>
                </div>
              </div><br/>
              </form>
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
                  <input type='text' placeholder='Robot Tags' onChange={(e)=>{this.setState({robot_tags: e.target.value})}} className='form-control' value={this.state.robot_tags}/>
                </div>
              </div>

              <div className='col-6' style={{marginLeft: '330px',width:'190px'}}>
              <button className='form-control' onClick={this.updateRow.bind(this)}> Update record </button>
              {update_results}
              </div>
              </form>
            </div>
            <div className='col-6'>
              <label> Error Description</label>
              <textArea ref='error_description_update' onChange={this.changeTextarea.bind(this)}className= 'form-control' placeholder="Error Description" value={this.state.error_description}/>
            </div>
          </div>
      </div>

    );
  }
}

export default Update;
