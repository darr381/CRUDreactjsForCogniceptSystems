import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class DatabaseDisplay extends Component {
   constructor(props){
     super(props);
     this.state= {
          columnDefs: [
            {
              headerName: "Error Code", field: "error_code", sortable: true , filter: true, resizable: true
            }, {
              headerName: "Error Type", field: "error_type", sortable: true, filter: true, resizable: true
            }, {
              headerName: "Error Description", field: "error_description", sortable: true, filter: true, resizable: true
            } , {
              headerName: "Robot Tags", field: "robot_tags", sortable: true, filter: true, resizable: true
            } , {
              headerName: "resolution" , field: "resolution", sortable: true, filter: true, resizable: true,width: 220
            }
          ],
          rowData: [],
          error_code: "",
          robot_tags: []
      }
        this.isExternalFilterPresent.bind(this);
      this.doesExternalFilterPass.bind(this);
      this.externalFilterChanged.bind(this);
      this.onGridReady.bind(this);
   }
   onGridReady = params=>{
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    }
    isExternalFilterPresent() {
      if(error_code_filter ==="" && robot_tags_filter ==="") return false;
      else return true
    }
    doesExternalFilterPass(node ) {
      console.log(JSON.stringify(node.data.robot_tags).split(","))
      console.log(robot_tags_filter.toUpperCase())
      var tags = JSON.stringify(node.data.robot_tags).replace(/"/g,"")
      console.log(tags)
      if(node.data.error_code.toUpperCase().includes(error_code_filter.toUpperCase()) && error_code_filter != ""){
        console.log('error code match found')
        return true
      }
      else if(tags.toUpperCase().includes(robot_tags_filter.toUpperCase()) && robot_tags_filter!=""){
        console.log('robot tag match found')
        return true
      }
      return false
    }
    externalFilterChanged(newValue,input) {
      if(input =='error_code'){
        error_code_filter=this.refs.error_code.value;
      }
      else if(input=='robot_tags'){
        robot_tags_filter = this.refs.robot_tags.value
      }
      this.gridApi.onFilterChanged();
    }
   componentDidMount(){
     var request = new Request('http://localhost:3200/public/show_database', {
       method: 'GET',
       headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'})
     });
     fetch(request).then(response => {response.json().then(data => {this.setState({rowData: data})})});
   }
   render(){
     return(
       <div
         className="ag-theme-balham"
         style={{
         height: '400px',
         width: '80%' ,
         marginLeft: '100px'}}>
         <div className='row'>
          <div className='col-6'>
          <input type='text' placeholder='Error Code' ref='error_code' onChange={(e)=>{this.externalFilterChanged(e.target.value,'error_code');}} className='form-control' onClick={(e)=>{e.target.value='';this.externalFilterChanged(e.target.value,'error_code');}}/>
          </div>
          <div className='col-6'>
            <input type='text'  placeholder='Tag1,Tag2,Tag3...' ref='robot_tags' onChange={(e)=>{this.externalFilterChanged(e.target.value,'robot_tags');}} className='form-control' onClick={(e) =>{e.target.value='';this.externalFilterChanged(e.target.value,'robot_tags')}}/>
          </div>
         </div><br/><br/>
         <AgGridReact
           columnDefs={this.state.columnDefs}
           rowData={this.state.rowData}
           animateRows={true}
           isExternalFilterPresent={this.isExternalFilterPresent}
           doesExternalFilterPass={this.doesExternalFilterPass}
           onGridReady={this.onGridReady}>
         </AgGridReact>
       </div>
     )
   }
}
var error_code_filter = ""
var robot_tags_filter = ""
export default DatabaseDisplay
