import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { UpdateCountriesToDisplayFlags } from '../../actions/flagPickerActions';

import './SearchBox.css';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            isDropdownExpanded: false,
            selectedItem: ""
        }

        this.filterSearch = this.filterSearch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.itemOnSelection = this.itemOnSelection.bind(this);
        this.manageDropDownOptions = this.setIsDropDownOptions.bind(this);
        this.updateSelectedItem = this.updateSelectedItem.bind(this);
    }

    componentWillReceiveProps(props) {
        if (this.getIsSelectedItems(props.source).length === 0) {
            this.setIsDropDownOptions(false);
        }
    }

    /*
        This function gets triggered when ever user types in the Search Box
        if the user input then filter the search
        else no input then clear the search and keep the autocomplete results empty
   */
    onInputChange = (e) => {
        e.stopPropagation();
        this.setState({ query: this.search.value });
    }

    /*
        This function filters the results based on the user input in the textbox
        If the modified data is empty or undefined then load the modified data based on the user inputdata

        filter the data based on the user input
    */
    filterSearch = (data) => {
        return (data &&
            (data.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0 || data.isSelected)
        )
    }

    /*
        This functions updates the isChecked object value for each entry when a User Checks or Unchecks
        the checkbox
    */
    itemOnSelection(evt) {
        evt.stopPropagation();
        (this.props.multiple) ? this.handleMultiSelection(evt) : this.handleSelection(evt, true);
    }

    handleMultiSelection(evt) {
        let list = this.props.source;
        let element = evt.target.querySelector("input");

        if (!element) {
            element = evt.target;
        } else {
            element.checked = !element.checked;
        }

        list.filter(x => x.name.indexOf(element.value) >= 0).map(y => y.isSelected = element.checked);

        this.props.selectedCheckedList(list);
        this.updateSelectedItem(element.value);
    }

    handleSelection(evt) {
        this.props.selectedTextOnClick(evt.target.textContent);
        this.updateSelectedItem(evt.target.textContent);
        this.setIsDropDownOptions(!this.state.isDropdownExpanded);
    }

    /*
        Clears the Autocomplete dropdown search box
    */
    clearFilteredSearch() {
        this.search.value = "";
        this.setState({ query: this.search.value });
    }

    handleRemoveItemOnClick(evt, item) {
        evt.stopPropagation();

        let list = this.props.source;
        list.filter(x => x.name.indexOf(item) >= 0).map(y => y.isSelected = false);

        this.props.UpdateCountriesToDisplayFlags(list);

        if (this.getIsSelectedItems(list).length === 0) {
            this.setIsDropDownOptions(false);
        }

        this.updateSelectedItem();
    }

    updateSelectedItem(item) {
        this.setState({ selectedItem: item });
    }

    setIsDropDownOptions(value) {
        this.setState((prevState) => ({
            isDropdownExpanded: value
        }), () => this.clearFilteredSearch());
    }

    getIsSelectedItems(list) {
        return (list && list.filter(data => data.isSelected)) || [];
    }

    render() {
        const selectedItems = this.getIsSelectedItems(this.props.source);
        const isAnyItemSelected = (selectedItems && selectedItems.length > 0);

        const selectBox = (isAnyItemSelected) ?
            (selectedItems && selectedItems.map((data, index) => (
                <div className="dropdown-label" key={index}>
                    {data.name}
                    <i className="fa fa-close"
                        onClick={(evt) => this.handleRemoveItemOnClick(evt, data.name)}></i>
                </div>
            ))) : (<div className="dropdown-label">{"Select"}</div>);

        const searchBox = (
            <input
                type="search"
                placeholder={this.props.placeholder}
                className="dropdown-search"
                ref={input => this.search = input}
                onChange={(evt) => this.onInputChange(evt)}
                onClick={(evt) => this.onInputChange(evt)} />
        );

        const autoCompleteItems = (
            this.props.source && this.props.source.filter(this.filterSearch).map((data, index) => (
                <li name="dropdown-items"
                    key={index}
                    value={data.name}
                    onClick={(evt) => this.itemOnSelection(evt)}>
                    {
                        (this.props.multiple)
                            ? (
                                <span>
                                    <input checked={data.isSelected}
                                        type="checkbox"
                                        value={data.name} /> {data.name}
                                </span>
                            )
                            : (
                                <span>{data.name}</span>
                            )
                    }
                </li>
            ))
        );

        return (
            <div className="search-box">
                <div className="dropdown-container" onClick={() => this.setIsDropDownOptions(!this.state.isDropdownExpanded)}>
                    <div className="dropdown-button">
                        <div className={`dropdown-item ${(isAnyItemSelected) ? "selected-item" : ""}`}>
                            {selectBox}
                        </div>
                        <i className="fa fa-chevron-circle-down"></i>
                    </div>
                    <div className={`dropdown-list ${(!this.state.isDropdownExpanded) ? "toggle" : ""} `}>
                        {searchBox}
                        <ul className="dropdown-list-items">
                            {autoCompleteItems}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    multiple: false,
    name: "searchbox",
    disabled: false,
    placeholder: "Search",
    source: []
}

SearchBox.propTypes = {
    multiple: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    source: PropTypes.array
}

export default connect(null, { UpdateCountriesToDisplayFlags })(SearchBox);