import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SearchBox.css';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            modData: [],
            results: []
        }

        this.filterSearch = this.filterSearch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.selectedTextOnClick = this.selectedTextOnClick.bind(this);
        this.checkboxOnSelected = this.checkboxOnSelected.bind(this);
        this.modifyInputData = this.modifyInputData.bind(this);
        this.checkboxOnSelected = this.checkboxOnSelected.bind(this);
        this.selectedCheckedList = this.selectedCheckedList.bind(this);
    }

    /*
        This function transforms the input data in to a local variable with an additional object isChecked
        if the user hasCheckbox = true then object contains isChecked
        else then object doesn't contain isChecked
    */
    modifyInputData() {
        this.setState(() => {
            let temp = [];
            if (this.props.source && this.props.source.length > 0) {
                this.props
                    .source
                    .map(data => {
                        (this.props.hasCheckboxes)
                            ? temp.push({name: data, isChecked: false})
                            : temp.push({name: data})
                    })    

            return {
                modData: temp
            }
          }});
    }

    /* 
        This function gets triggered when ever user types in the Search Box
        if the user input then filter the search
        else no input then clear the search and keep the autocomplete results empty
   */
    onInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 0) {
                this.filterSearch();
            } else {
                this.clearFiltered();
            }
        })
    }

    /* 
        This function filters the results based on the user input in the textbox
        If the modified data is empty or undefined then load the modified data based on the user inputdata

        filter the data based on the user input
    */
    filterSearch = () => {
        if(!(this.state.modData && this.state.modData.length > 0)) {
            this.modifyInputData();
        }
        
        this.setState({
            results: this
                .state
                .modData
                .filter(word => 
                    word.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0 
                    || word.isChecked)
        })
    }

    /* 
        This Click function gets triggered when the user clicks one of the options in the autocomplete Search Box
    */
    selectedTextOnClick(text) {
        this.search.value = text;
        if(!this.props.hasCheckboxes) {
            this.clearFiltered();
            this.props.selectedTextOnClick(text);
        }
    }

    /* 
        This functions updates the isChecked object value for each entry when a User Checks or Unchecks 
        the checkbox
    */
    checkboxOnSelected(e) {
        let list = this.state.modData;

        list.map(data => {
            if(data.name.indexOf(e.target.value) >= 0) {
                data.isChecked = e.target.checked;
            }
        })

        this.setState(() => {
            return {
                modData: list
            }
        });
    }

    /* 
        This function is triggered on a Submit Click to send the selected Items to the Parent Component
    */
    selectedCheckedList() {
        let list = this.state.modData.filter(data => data.isChecked);
        this.clearFiltered();
        this.clearDropDownContent();
        this.props.selectedCheckedList(list);
    }

    /* 
        Clears the Autocomplete dropdown
    */
    clearFiltered() {
        let clear = [];
        this.setState({results: clear});
    }

    /* 
        Clears the Modified Input Data
    */
    clearDropDownContent() {
        let clear = [];
        this.setState({modData: clear})
    }

    /* 
        This function returns the HTML content for the autocomplete data based on the props hasCheckboxes
    */
    getInputDataContent(data) {
        if(this.props.hasCheckboxes) {
            return (
                <span>
                    <input checked={data.isChecked} type="checkbox" value={data.name} onChange={(e) => {this.checkboxOnSelected(e)}}/>
                    {data.name} 
                </span>
            )
        }
        else {
            return (
                <span>
                    {data.name}
                </span>
            )
        }
    }

    render() {
        const autocompleteContent = (this.state.results.map((data, index) => (
                <div
                    key={index}
                    onClick={() => {
                    this.selectedTextOnClick(data.name)
                }}>
                    {this.getInputDataContent(data)}
                </div>
            )));

        const submitButton = this.props.hasCheckboxes ? (
            <div className="center-align">
                <input type="submit" onClick={this.selectedCheckedList}/>
            </div>
        ) : ("");

        return (
            <span>
                <div className="search-box">
                    <div className="autocomplete">
                        <input
                            type="text"
                            disabled={this.props.disabled}
                            placeholder={this.props.placeholder}
                            ref={input => this.search = input}
                            onChange={this.onInputChange}/>

                        <div className="autocomplete-items">
                            {autocompleteContent}
                        </div>
                    </div>
                </div>
                    {submitButton}
            </span>
        )
    }
}

SearchBox.defaultProps = {
    hasCheckboxes: false,
    name: "searchbox",
    disabled: false,
    placeholder: "Search",
    source: []
}

SearchBox.propTypes = {
    hasCheckboxes: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    source: PropTypes.array
}

export default SearchBox;