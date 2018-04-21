# Flag Picker App Implementation Using React

## Components

### FlagPicker
> Encapsulates the whole application with 2 search boxes and display functionality 

### SearchBox 
> Consists of Textbox with respective autocomplete options. 
  ```
  props for the component are as follows: 
    1.  Source - recieves source data as array of data to be loading as autocomplete 
    2.  hasCheckboxes - multiple selection of autocomplete data feature
    3.  name - to differentiate each search component, unique name
    4.  disabled - disable the component
    5.  placeholder - placeholder for the textbox
    6.  selectedTextOnClick - returns the selected text from the search box
    7.  selectedCheckedList - returns the list of multiple items selected if hasCheckBoxes = true 
```

### DisplayFlags 
> Component to display the flag
 ``` 
  props for the component are as follows:  
    1.  countryCode 
    2.  countryName
    3.  style - flag styling flat or shine
    4.  size - size of the flag 16, 24, 32, 48, 64
  
Reference: Used the flag features of http://countryflags.io/#quick_start
  ```

## Demo Application
The [source code](https://github.com/vivekkeswaran/react-flag-picker) is published on GitHub. [Demo Application](https://enigmatic-flag-picker-app.herokuapp.com/) is hosted in Heroku.
