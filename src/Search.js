import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DisplayError from './DisplayError.js';
class Search extends Component {
  constructor(){
    super();
    this.state = {
      dataPresent: false ,
      first: []
    }
  }

  showTable(event){
    event.preventDefault();
    let data = {error_code: this.refs.error_code_show.value}
    var request = new Request('http://localhost:3000/public/table_data', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request).then(response => response.json())
    .then(data => {this.setState({first: data ,  dataPresent: true})}); //data is the data returned from app.get after converting the response to json

  }
  render() {
    return(
      <div>
      <h1> Search Error </h1>
      <form>
            <div className="d-inline-flex p-2">
            <input type='text' ref="error_code_show" className= 'form-control' placeholder="Error Code"/><br/>
            </div>
            <button onClick={this.showTable.bind(this)}> Show Record </button>
      </form>
        <ShowError first={this.state}/>
      </div>
    )
  }
}
function ShowError(props){
  let dataPresent = props.first.dataPresent ?props.first.dataPresent : null
  if(dataPresent){
    console.log(props)
    return <DisplayError first={props}/>
  }
  return <div></div>
}
export default Search;
