import React, {Component} from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import DisplayError from './DisplayError.js';
import PrimaryButton, { LoadingTextButton, SuccessButton, DangerButton, RoundSpinnerButton } from '@bit/lekanmedia.shared-ui.primary-button';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      dataPresent: false ,
      first: [],
      key: 1
    }
  }

  showTable(event){
    event.preventDefault();
    let data = {error_code: this.refs.error_code_show.value}
    var request = new Request('http://localhost:3200/public/table_data', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json' , 'Accept': 'application/json'}),
      body: JSON.stringify(data)
    });
    fetch(request).then(response => response.json())
    .then(data => {this.setState({first: data ,  dataPresent: true, key: this.state.key+1});}); //data is the data returned from app.get after converting the response to json

  }
  render() {
    return(
      <div>
      <h1> Search Error </h1>
      <form>
            <div className="d-inline-flex p-2">
            <input type='text' ref="error_code_show" className= 'form-control' placeholder="Error Code"/><br/>
            </div><br/><br/>
            <div className='col-2' style={{marginLeft: "535px"}}>
              <PrimaryButton onClick={this.showTable.bind(this) } text='Show Record' />
            </div>
      </form>
        <ShowError first={this.state} key={this.state.key}/>
      </div>
    )
  }
}
function ShowError(props){
  let dataPresent = props.first.dataPresent ? props.first.dataPresent : null
  if(dataPresent ){
    return <DisplayError first={props}/>
  }
  return <div> </div>
}
export default Search;
