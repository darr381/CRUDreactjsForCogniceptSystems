import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Popup from "reactjs-popup";
import './App.css';
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
import ReactFileReader from 'react-file-reader';


class DatabaseDisplay extends Component {
   constructor(props){
     super(props);
     this.state= {
          isUpdated: "false",
          data:"",
          openAlert:false,
          open:false,
          columnDefs: [
            {
              headerName: "Error Code", field: "error_code", sortable: true , filter: true,width:150
            }, {
              headerName: "Error Type", field: "error_type", sortable: true, filter: true,width:150
            }, {
              headerName: "Error Description", field: "error_description", sortable: true, filter: true,width:150
            } , {
              headerName: "Robot Tags", field: "robot_tags", sortable: true, filter: true,width:150
            } , {
              headerName: "timestamp" , field: "resolution", sortable: true, filter: true,width:150
            }
          ],
          newColumns: [],
          rowSelection: 'single',
          rowData: [],
          error_code: "",
          robot_tags: [],
          error_code:"",
          error_description:"",
          error_type:"",
          robot_tags:"",
          resolution:"",
          key: 1
      }
        this.isExternalFilterPresent.bind(this);
      this.doesExternalFilterPass.bind(this);
      this.externalFilterChanged.bind(this);
      this.onGridReady.bind(this);
      this.openModal=this.openModal.bind(this);
      this.closeModal= this.closeModal.bind(this);
      this.updateDatabase = this.updateDatabase.bind(this);
      this.openAlertModal=this.openAlertModal.bind(this);
      this.closeAlertModal= this.closeAlertModal.bind(this);
      this.updateDatabase = this.updateDatabase.bind(this);
      this.onCellClicked = this.onCellClicked.bind(this);
      this.updateRowNode = this.updateRowNode.bind(this);
      this.normalFunction = this.normalFunction.bind(this);
      this.handleFiles = this.handleFiles.bind(this);
   }
   onGridReady = params=>{
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    }
    isExternalFilterPresent() {
      if(error_code_filter ==="" && robot_tags_filter ==="") return false;
      else return true;
    }
    doesExternalFilterPass(node ) {
      var tags = JSON.stringify(node.data.robot_tags).replace(/"/g,"")
      var tag_array = robot_tags_filter.split(" ")
      tag_array = tag_array.map(tag=>tag.toUpperCase())
      var robot_tag_database = node.data.robot_tags.map(tag=>tag.toUpperCase())
      if(tag_array.includes("")){tag_array.pop()}
      if(node.data.error_code.toUpperCase().includes(error_code_filter.toUpperCase()) && error_code_filter != ""){
        return true
      }
      else if(tag_array.every(val=>robot_tag_database.includes(val)) && robot_tags_filter!="" ) {
        return true
      }
      return false
    }
    externalFilterChanged(newValue) {
      if(newValue==""){
        robot_tags_filter=""
        error_code_filter=""
      }
      else if(newValue.includes(" ")){
        robot_tags_filter = newValue
        error_code_filter =""
      }
      else{
        error_code_filter=newValue
        robot_tags_filter=""
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
   editModal(event){
     event.preventDefault()
     this.setState({isUpdated: "false"})
     var rowToUpdate = this.gridApi.getSelectedNodes()
     if(rowToUpdate ==""){
       this.openAlertModal()
       return
     }
     this.openModal()
   }
   onCellClicked(){
     var rowNode = this.gridApi.getSelectedNodes()
     rowNode = rowNode[0].data

     this.setState({error_code: rowNode.error_code, error_type: rowNode.error_type,error_description: rowNode.error_description,robot_tags:rowNode.robot_tags,data: rowNode,resolution: rowNode.resolution})
   }
   updateDatabase(){
     let that = this
     var rowToUpdate = this.gridApi.getSelectedNodes()
     var id = rowToUpdate[0].id
     var rowNode = this.gridApi.getRowNode(id.toString());
     let data = {
       error_code: this.state.error_code,
       error_type: this.state.error_type,
       error_description: this.state.error_description,
       robot_tags: this.state.robot_tags,
     }
    var request = new Request('http://localhost:3200/public/update_database', {
      method: 'PATCH',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request).then(function(response){
      response.json().then(function(data){
        if(data.message == "Data updated"){
          that.setState({isUpdated: "true"})
        }else{
          that.setState({isUpdated: "failed"})
        }
      });
    });
    setTimeout(()=>{this.updateRowNode()},200)
   }
   updateRowNode(){
     let that = this
     var rowToUpdate = this.gridApi.getSelectedNodes()
     var id = rowToUpdate[0].id
     var rowNode = this.gridApi.getRowNode(id.toString());
     let data = {
       error_code: this.state.error_code,
       error_type: this.state.error_type,
       error_description: this.state.error_description,
       robot_tags: this.state.robot_tags,
       resolution: this.state.resolution
     }
     var request = new Request('http://localhost:3200/public/get_row', {
       method: 'POST',
       headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
       body: JSON.stringify(data)
     });
     fetch(request).then(function(response){
       response.json().then(function(data){
         that.setState({resolution: data[0].resolution,data:data[0]},()=>that.normalFunction())
       });
     });
       data.resolution = this.state.resolution
       rowNode.setData(data)
       this.setState({key: this.state.key+1})
       this.closeModal();

   }
   normalFunction(){
     console.log("normal function called")
   }
   openModal() {
     this.setState({ open: true });
   }
   closeModal() {
     this.setState({ open: false });
   }
   openAlertModal(){
     this.setState({openAlert:true});
   }
  closeAlertModal(){
     this.setState({openAlert:false})
  }
  handleFiles= files =>{
    let that = this //because s more functions are called, this changes when the scope chnages, so we need to store it in a new var
    var error_code_index; var error_type_index;var error_description_index;var robot_tags_index;var csvRow;
    const csv=require('csvtojson')
    var reader = new FileReader();
    reader.onload = function(e) {
    // Use reader.result
      csv({
          noheader:true,
          output: "csv"
      })
      .fromString(reader.result)
      .then((csvRow)=>{
          csvRow[0] = csvRow[0].map(val=>val.toUpperCase())
          error_code_index = csvRow[0].indexOf('ERROR CODE')
          error_type_index= csvRow[0].indexOf('ERROR TYPE')
          robot_tags_index = csvRow[0].indexOf('ROBOT TAGS')
          error_description_index = csvRow[0].indexOf('ERROR DESCRIPTION')
          csvRow.shift()
          csvRow.forEach((row)=>{
            let data = {
              error_code: row[error_code_index],
              error_type: row[error_type_index],
              robot_tags: row[robot_tags_index],
              error_description: row[error_description_index]
            }
            var request = new Request('http://localhost:3200/public/new_row', {
              method: 'POST',
              headers: new Headers({'Content-Type': 'application/json'}),
              body: JSON.stringify(data)
            });
            //xmlHTTPrequest
            fetch(request).then(function(response){
              response.json().then(data => {
                if(data.name === 'error'){
                  alert("please upload again")
                }
                else{
                  var request2 = new Request('http://localhost:3200/public/show_database', {
                    method: 'GET',
                    headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'})
                  });
                  fetch(request2).then(response => {response.json().then(data => {that.setState({rowData: data})})});
                }
              });
            });
          })
      })
    }
  reader.readAsText(files[0]); //to read the file that is uploaded
  }
   render(){
     let flashMessage;
     if(this.state.isUpdated == "true"){
       flashMessage = <div className='alert alert-success'>Successfully Updated </div>
     }
     else if(this.state.isUpdated == "failed"){
       flashMessage = <div className='alert alert-danger'> Failed to Update </div>
     }
     else{
       flashMessage = <div></div>
     }
     return(
       <div>
        <div className='col-8'>
         <div className='d-flex justify-content-center' >
          <div className = 'col-6' style={{marginLeft: '100px'}}>
            <input type='text' placeholder='Error Code OR Tag1,Tag2,Tag3...' ref='filter_params' onChange={(e)=>{this.externalFilterChanged(e.target.value);}} className='form-control' onClick={(e)=>{e.target.value='';this.externalFilterChanged(e.target.value);}}/>
          </div>
          <div className='col-6'>
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
              <button className='btn btn-success'>Upload</button>
            </ReactFileReader>
          </div>
        </div>
          {/*<div className='col-6'>
            <input type='text'  placeholder='Tag1,Tag2,Tag3...' ref='robot_tags' onChange={(e)=>{this.externalFilterChanged(e.target.value,'robot_tags');}} className='form-control' onClick={(e) =>{e.target.value='';this.externalFilterChanged(e.target.value,'robot_tags')}}/>
          </div>*/}
         </div><br/>
         <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal} >
           <a className="close" style={{cursor:"pointer"}}onClick={this.closeModal}> &times; </a>
           <div className='content' >
             <h1><strong> Update </strong></h1><br/>
             <form>
               <div className='row'>
                 <div className='col-6'>
                   <label style={{fontSize:"20px"}}> Error Type</label>
                 </div>
                 <div className='col-5'>
                   <input type='text' onChange={(e)=>{this.setState({error_type: e.target.value})}} placeholder='Error Type' className='form-control' value={this.state.error_type} />
                 </div>
               </div><br/>
               <div className='row'>
                 <div className='col-6'>
                   <label style={{fontSize:"20px"}}> Robot Tags</label>
                 </div>
                 <div className='col-5'>
                   <input type='text' placeholder='tag1 tag2 tag3...' onChange={(e)=>{this.setState({robot_tags: e.target.value.split(",")})}} className='form-control' value={this.state.robot_tags}/>
                 </div>
               </div><br/>
               <div className='row'>
                 <div className='col-6'>
                   <label style={{fontSize:"20px"}}> Error Description</label>
                 </div>
                 <div className='col-5'>
                   <textarea ref='error_description_update' className= 'form-control' placeholder="Error Description" value={this.state.error_description} onChange={(e)=>{this.setState({error_description:e.target.value})}}/>
                 </div>
               </div><br/>
             </form><br/>
             <div className='row'>
               <div className='col-6'>
                 <button className='btn btn-danger' onClick={this.updateDatabase}> Update </button>
               </div>
               <div className='col-6'>
                 <button className='btn btn-success' onClick={this.closeModal}> Close </button>
               </div>
             </div>
           </div><br/>
          </Popup>
         <Popup open={this.state.openAlert} closeOnDocumentClick onClose={this.closeAlertModal}>
           <a className="close" style={{cursor:"pointer"}}onClick={this.closeAlertModal}> &times; </a>
           <div className='content'>
             <div className='d-flex justify-content-center'>
                <div className='col-12'><h2><strong>Please select a row first</strong></h2> </div>
             </div><br/>
             <div className='d-flex justify-content-center'>
               <div className='col-4'>
                 <button className='btn btn-success' onClick={this.closeAlertModal}> Close </button><br/>
               </div>
             </div>
           </div>
         </Popup>
         <div className='d-flex justify-content-end'>
          <Preview props={this.state.data} key= {this.state.key}/>
         </div>
         <div
           className="ag-theme-balham"
           style={{
           height: '400px',
           width: '60%' ,
           marginLeft: '40px'}}>
           <AgGridReact
             columnDefs={this.state.columnDefs}
             rowData={this.state.rowData}
             rowSelection={this.state.rowSelection}
             animateRows={true}
             isExternalFilterPresent={this.isExternalFilterPresent}
             doesExternalFilterPass={this.doesExternalFilterPass}
             onGridReady={this.onGridReady}
             onCellClicked= {this.onCellClicked}>
           </AgGridReact></div><br/>
           <div className='col-8'>
            <div className='d-flex justify-content-center' >
             <div className = 'col-6'>
              <button className= "btn btn-success" onClick={this.editModal.bind(this)} > Edit </button> <br/><br/>
              {flashMessage}
             </div>
            </div>
           </div>
         <br/>
       </div>
     )
   }
}
function Preview (props){
  if(props.props !=""){
    return <Col xs="4" md="4" style={{ position: 'absolute'}}>
              <Card>
                <CardHeader>
                  Search Error
                </CardHeader>
                <CardBody>
                  <div className='row'>
                    <div className="col-6">
                      <label>Error Code</label>
                    </div>
                    <div className='col-6'>
                      {props.props.error_code}
                    </div>
                  </div><br/>
                  <div className='row'>
                    <div className="col-6">
                      <label>Error Type</label>
                    </div>
                    <div className='col-6'>
                      {props.props.error_type}
                    </div>
                  </div><br/>
                  <div className='row'>
                    <div className="col-6">
                      <label>Robot Tags</label>
                    </div>
                    <div className='col-6'>
                      {props.props.robot_tags.map(val=>{return val+" "})}
                    </div>
                  </div><br/>
                  <div className='row'>
                    <div className="col-6">
                      <label>Timestamp</label>
                    </div>
                    <div className='col-6'>
                      {props.props.resolution}
                    </div>
                  </div><br/>
                  <div className='row'>
                    <div className="col-6">
                      <label>Error Description</label>
                    </div>
                    <div className='col-6'>
                      {props.props.error_description}
                    </div>
                  </div><br/>
                </CardBody>
              </Card>
            </Col>
  }
  else{
    return <div></div>
  }
}
var error_code_filter = ""
var robot_tags_filter = ""
export default DatabaseDisplay
