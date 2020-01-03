import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import React, {Component} from 'react';

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
          rowData: []
      }
   }
   componentDidMount(){
     console.log("component mounted");
     var request = new Request('http://localhost:3200/public/show_database', {
       method: 'GET',
       headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'})
     });
     fetch(request).then(response => {response.json().then(data => {console.log(data); this.setState({rowData: data})})});
   }
   render(){
     return(
       <div
       className="ag-theme-balham"
       style={{
       height: '400px',
       width: '80%' ,
        marginLeft: '100px'}}>
       <AgGridReact
         columnDefs={this.state.columnDefs}
         rowData={this.state.rowData}>
       </AgGridReact>
     </div>
     )
   }
}

export default DatabaseDisplay
