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
              headerName: "Error Code", field: "error_code"
            }, {
              headerName: "Error Type", field: "error_type"
            }, {
              headerName: "Error Description", field: "Error Description"
            } , {
              headerName: "Robot Tags", field: "robot_tags"
            } , {
              headerName: "resolution" , field: "resolution"
            } , {
              headerName: "uuid" , field: "uuid"
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
       width: '805px' }}>
       <AgGridReact
         columnDefs={this.state.columnDefs}
         rowData={this.state.rowData}>
       </AgGridReact>
     </div>
     )
   }
}

export default DatabaseDisplay
