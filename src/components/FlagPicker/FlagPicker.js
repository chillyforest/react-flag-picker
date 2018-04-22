import React, {Component} from 'react';
import Data from '../../asset/continents.json';
import DisplayFlag from '../DisplayFlag/DisplayFlag';
import SearchBox from '../SearchBox/SearchBox';

class FlagPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            continents: [],
            countries: [],
            countriesWithCode: [],
            selectedContinent: "",
            selectedCountries: []
        }

        this.selectedContinentText = this.selectedContinentText.bind(this);
        this.displayFlags = this.displayFlags.bind(this);
    }

    componentDidMount() {
        this.getContinentsFromJSON();
    }

    /* 
        Load the JSON continent information
    */
    getContinentsFromJSON() {
        let con = [];
        Data.forEach(c => {
            con.push(c.continent);
        });

        this.setState({continents: con});
    }

    /* 
        Load the JSON country information based on the continent value
    */
    getCountriesFromJSON(continent) {
        let con = [];
        let conWithCode = [];
        Data.filter(x => x.continent === continent)
            .forEach(c => c.countries.forEach(data => {
                con.push(data.name);
                conWithCode.push(data);
            }));

        this.setState({countries: con, countriesWithCode: conWithCode});
    }

    /* 
        This function gets triggered on Selection of Continent in the first Search Box and
        Load the country information from the function getCountriesFromJSON with the continent value
    */
    selectedContinentText(text) {
        this.setState({selectedContinent: text});
        this.getCountriesFromJSON(text);
    }

    /* 
        Loads the selected countries to Display the flags
    */
    displayFlags(data) {
        let filter = [];
        let dataList = [];
        data.forEach (x => {
            dataList.push(x.name);
        })

        filter = this
            .state
            .countriesWithCode
            .filter(val => (dataList.indexOf(val.name) >= 0));

        this.setState({selectedCountries: filter});
    }

    render() {
        return (
            <div>
                <SearchBox
                    name="continent"
                    disabled={false}
                    placeholder="Search Continent"
                    source={this.state.continents}
                    selectedTextOnClick={this.selectedContinentText}/>

                <SearchBox
                    name="country"
                    disabled={(this.state.countries.length === 0)}
                    placeholder="Search Country"
                    source={this.state.countries}
                    selectedCheckedList={this.displayFlags}
                    hasCheckboxes={true}/> 

                    {
                        this.state.selectedCountries.map(data => { 
                            return <DisplayFlag countryCode={data.code} countryName={data.name} id={data.code} key={data.code}/>
                        })
                    }

            </div>
        )
    }
}

export default FlagPicker;