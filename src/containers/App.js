import React from 'react';
import './App.css';
import CountryCardHolder from '../components/CountryCardHolder';
import TopArea from '../components/TopArea';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {connect} from 'react-redux'
import {searchField} from '../actions'


const mapStatesToProps = (state) => {

  return{
    searchedValue: state.searchedTextState,
    searchedValue2: state.searchedTextState2
  }

}

const mapDispathToProps = dispath => {

  return {
    onSearchFunction : event => dispath(searchField(event.target.value))
  }

}

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {dataArray: []};
    this.state = {globalObject: {}};
    this.state = {countriesArray: []};
    this.state = {countriesArrayRecieved: []};
    this.state = {searched: ''}
    this.state = {done: false}
    this.state = {sorted: false}
    this.state = {countryRank: {}}
  }

  componentDidMount(){
    fetch('https://api.covid19api.com/summary')
    //fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      //.then(data => JSON.parse({data}))
      //.then(dataObject => this.setState({dataArray: data}))
      //.then(dataObject => console.log({dataObject}))
      .then(data => {
        for (let [key, value] of Object.entries(data)) {
         /* 
         if (key === "Global"){
          console.log(`This is ${key}: ${value}`)
          this.setState({globalObject: value})
          console.log(this.state.globalObject)
         
          }
          */
        

         if (key === "Countries"){
          //console.log(`This is ${key}: ${value}`)
          this.setState({countriesArray: value})
          this.setState({countriesArrayRecieved: value})
          this.setState({done: true})
         }

         if (key === "Date"){
          console.log(`This is ${key}: ${value}`)
         }
        }
      }).finally(this.setState({done: true}))
  }

  onSearch = (event) =>{
    console.log(event.target.value)
    let stringz = event.target.value
    this.setState({searched: stringz})
    
    
    let searchedCounrtyArray = this.state.countriesArrayRecieved.filter((eachCounrtyObj, i) => {
      return `${eachCounrtyObj["Country"]}`.toLowerCase().includes(stringz.toLowerCase());
    })
    
    

    this.setState({countriesArray: searchedCounrtyArray})
    //this.setState({sorted: false})
    this.setState({sorted: true})
    //console.log(`hello brother: ${searchedCounrtyArray}`)
    
  }

  onClickHighestOverall = (event) => {

    let totalCases = this.state.countriesArrayRecieved.sort(function (obj1, obj2) {
      return obj2["TotalConfirmed"] - obj1["TotalConfirmed"]
    })

    this.setState({countriesArray: totalCases})
    this.setState({sorted: true})

    var dict = []; 

    totalCases.forEach ((country, rank) => {
      dict.push({
        key:   country["Country"],
        value: rank + 1
        })
      });

      let dictionary = Object.assign({}, ...dict.map((x) => ({[x.key]: x.value})));

      this.setState({countryRank : dictionary})

   
  }

  onClickHigestDaily = (event) => {

    let totalCases = this.state.countriesArrayRecieved.sort(function (obj1, obj2) {
      return obj2["NewConfirmed"] - obj1["NewConfirmed"]
    })

    this.setState({countriesArray: totalCases})
    this.setState({sorted: true})

    // We are making an array of dictonary, the dict has the country name and its rank.
    // The key is the name of the country and the rank is the rank
    // We will then convert this array into a dictonary that has the country name and its rank
    // We search for the country (key) and get the value (rank)
    var dict = []; 

    totalCases.forEach ((country, rank) => {
      dict.push({
        key:   country["Country"],
        value: rank + 1
        })
      });

      let dictionary = Object.assign({}, ...dict.map((x) => ({[x.key]: x.value})));

      this.setState({countryRank : dictionary})   
  }

  render(){
    
    if (this.state.countriesArray === undefined){
      return(
        <div className="App">
          <TopArea
            onSearchFunction = {this.onSearch}
            onClick1 = {this.onClickHighestOverall}
            onClick2 = {this.onClickHigestDaily}
          ></TopArea>

          <div className ="main">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      );
    }
    else {

      return (
        <div className="App">

      
          <TopArea
            //onSearchFunction = {this.onSearch}
            onSearchFunction = {this.props.onSearchFunction}
            onClick1 = {this.onClickHighestOverall}
            onClick2 = {this.onClickHigestDaily}
          ></TopArea>

          <div className = "dropDownDiv">
            <DropdownButton
                  className = "dropDownButt"
                  alignRight
                  title="Sort By"
                  id="dropdown-menu-align-left"
            >
              <Dropdown.Item onSelect={this.onClickHigestDaily}>Highest Daily</Dropdown.Item>
              <Dropdown.Item onSelect={this.onClickHighestOverall}>Overall Cases</Dropdown.Item>
            </DropdownButton>
          </div>
            

          <CountryCardHolder
            dataRecieved = {this.state.countriesArray}
            sorted = {this.state.sorted}
            countryRank = {this.state.countryRank}
          >
          </CountryCardHolder>
        </div>
      );
    }
    
  }
  
}

export default connect(mapStatesToProps, mapDispathToProps)(App);
