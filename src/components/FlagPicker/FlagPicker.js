import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayFlag from '../DisplayFlag/DisplayFlag';
import SearchBox from '../SearchBox/SearchBox';
import './FlagPicker.css';

import { connect } from 'react-redux';
import {
    fetchContinents,
    fetchCountries,
    UpdateSelectedContinent,
    UpdateCountriesToDisplayFlags
} from '../../actions/flagPickerActions';

class FlagPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            countriesData: [],
            selectedContinent: "",
            selectedCountries: [],
            showCountrySection: false
        }

        this.selectedContinentText = this.selectedContinentText.bind(this);
        this.selectedCountriesList = this.selectedCountriesList.bind(this);
    }

    componentWillMount() {
        this.props.fetchContinents();
    }

    /*
        This function gets triggered on Selection of Continent in the first Search Box and
        Load the country information from the function getCountriesFromJSON with the continent value
    */
    selectedContinentText(text) {
        this.props.fetchCountries(text);
        this.props.UpdateSelectedContinent(text);
    }

    /*
        Loads the selected countries to Display the flags
    */
   selectedCountriesList(data) {
        this.props.UpdateCountriesToDisplayFlags(data);
    }

    render() {
        const continentSection = (
            <SearchBox
                name="continent"
                placeholder="Search Continent"
                source={this.props.continents}
                selectedTextOnClick={this.selectedContinentText} />
        );

        const countrySection = (
            <SearchBox
                name="country"
                placeholder="Search Country"
                source={this.props.countries}
                selectedCheckedList={this.selectedCountriesList}
                multiple={true} />
        );

        const displayFlagSection = (
            this.props.selectedCountriesToDisplayFlag.map(data => {
                return <DisplayFlag
                    countryCode={data.code}
                    countryName={data.name}
                    id={data.code}
                    key={data.code} />
            })
        );

        return (
            <div className="flagpicker-container">
                <div className="section-1">
                    {continentSection}
                </div>
                <div className="section-2">
                    {this.props.isContinentSelected && countrySection}
                </div>
                <div className="section-3">
                    {displayFlagSection}
                </div>
            </div>
        )
    }
}

FlagPicker.propTypes = {
    fetchContinents: PropTypes.func.isRequired,
    fetchCountries: PropTypes.func,
    UpdateSelectedContinent: PropTypes.func,
    continents: PropTypes.array.isRequired,
    countries: PropTypes.array,
    isContinentSelected: PropTypes.bool
}

const mapStateToProps = (state) => ({
    continents: state.flagPicker.continents,
    countries: state.flagPicker.countries,
    isContinentSelected: (state.flagPicker.continents.filter(c => c.isSelected).length > 0),
    selectedCountriesToDisplayFlag: state.flagPicker.countries.filter(c => c.isSelected)
});

export default connect(mapStateToProps, { fetchContinents, fetchCountries, UpdateSelectedContinent, UpdateCountriesToDisplayFlags })(FlagPicker);