import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/sass/3-modules/_searchBox.sass';

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
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleRemoveItemOnClick = this.handleRemoveItemOnClick.bind(this);
    }
    
    componentDidMount = () => document.addEventListener('click', this.handleClickOutside);

    componentWillUnmount = () => document.removeEventListener('click', this.handleClickOutside);

    /**
     * Set the wrapper ref
     */
    setWrapperRef = (node) => this.wrapperRef = node;


    /**
     * Close the dropdown if clicked on outside of element
     */
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isDropdownExpanded) {
            this.manageDropDownOptions(false);
        }
    }

    /** 
     *   This function gets triggered when ever user types in the Search Box
     */
    onInputChange = (e) => {
        e.stopPropagation();
        this.setState({ query: this.search.value });
    }

    /*
     *   This functions handles and items selected based on props multiple
     */
    itemOnSelection = (evt) => {
        evt.stopPropagation();
        (this.props.multiple) ? this.handleMultiSelection(evt) : this.handleSelection(evt);
    }

    /*
     *   This functions handles the multiple items selected
     */
    handleMultiSelection = (evt) => {
        let list = this.props.source;
        let element = evt.target.querySelector("input");

        (!element) ? element = evt.target : element.checked = !element.checked;
        list.filter(x => x.name.indexOf(element.value) >= 0).map(y => y.isSelected = element.checked);

        this.sendSelectedValueToParent(list);
        this.updateSelectedItem(element.value);
    }

    /*
     *   This functions handles the item selected
     */
    handleSelection = (evt) => {
        this.sendSelectedValueToParent(evt.target.textContent);
        this.updateSelectedItem(evt.target.textContent);
        this.setIsDropDownOptions(!this.state.isDropdownExpanded);
    }

    /*
     *   This functions handles when an selected items are removed on clicking the (x) symbol
     */
    handleRemoveItemOnClick = (evt, item) => {
        evt.stopPropagation();

        let list = this.props.source;
        list.filter(x => x.name.indexOf(item) >= 0).map(y => y.isSelected = false);

        this.sendSelectedValueToParent(list, true);
        this.updateSelectedItem();

        if (this.getIsSelectedItemsFromAList(list).length === 0) {
            this.setIsDropDownOptions(false);
        }
    }

    /*
     *  Utility function send the selected data to the parent based on props multiple
     *  If multiple then send the Selected List
     *  else send the selected text and 
     *      if the item is checked then Unselected = false
     *      else if the item is unchecked then Unselected = true
     */
    sendSelectedValueToParent = (data, isUnSelected = false) => (this.props.multiple)
        ? this.props.selectedCheckedList(data)
        : this.props.selectedTextOnClick(data, isUnSelected);

    /*
     *   Clears the Autocomplete dropdown search box
     */
    clearFilteredSearch = () => this.setState({ query: "" }, () => this.search.value = "");

    /*
     *   Utility funtion to update the State Variable SelectedItem
     */
    updateSelectedItem = (item) => this.setState({ selectedItem: item });

    /*
     *   Utility funtion to update the State Variable isDropdownExpanded
     */
    setIsDropDownOptions = (value) => this.setState({ isDropdownExpanded: value }, () => this.clearFilteredSearch());

    /*
     *   Utility funtion to return the filtered list of isSelected = true
     */
    getIsSelectedItemsFromAList = (list) => (list && list.filter(data => data.isSelected)) || [];

    /*
     *   Utility funtion to return the filtered list of based on the user typehead in the Search box
     */
    filterSearch = (data) => (data && (data.isSelected || data.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0));

    /*
     *   Render function
     */
    render() {
        const selectedItems = this.getIsSelectedItemsFromAList(this.props.source);
        const isAnyItemSelected = (selectedItems && selectedItems.length > 0);

        const selectBox = (isAnyItemSelected) ?
            (selectedItems && selectedItems.map((data, index) => (
                <div className="dropdown-label" key={index}>
                    {data.name}
                    <i className="icon fa fa-close"
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
            <div className="search-box" ref={this.setWrapperRef}>
                <div className="dropdown-container" onClick={() => this.setIsDropDownOptions(!this.state.isDropdownExpanded)}>
                    <div className="dropdown-button">
                        <div className={`dropdown-autocomplete-item ${(isAnyItemSelected) ? "selected-item" : ""}`}>
                            {selectBox}
                        </div>
                        <i className="icon fa fa-chevron-circle-down"></i>
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

export default connect(null, {})(SearchBox);