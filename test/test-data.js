export const STATE_WITH_INITIAL_VALUES = {
    continents: [],
    countries: []
};

export const STATE_WITH_FILLED_CONTINENTS = {
    continents: [
        { "name": "Africa", "isSelected": false },
        { "name": "America", "isSelected": false },
        { "name": "Asia", "isSelected": false },
        { "name": "Europe", "isSelected": false },
        { "name": "Oceania", "isSelected": false }
    ],
    countries: []
};

export const STATE_WITH_FILLED_CONTINENTS_WITH_EUROPE_SELECTED = {
    continents: [
        { "name": "Africa", "isSelected": false },
        { "name": "America", "isSelected": false },
        { "name": "Asia", "isSelected": false },
        { "name": "Europe", "isSelected": true },
        { "name": "Oceania", "isSelected": false }
    ],
    countries: []
}

export const CONTINENTS_TEST_DATA = [
    { "name": "Africa", "isSelected": false },
    { "name": "America", "isSelected": false },
    { "name": "Asia", "isSelected": false },
    { "name": "Europe", "isSelected": false },
    { "name": "Oceania", "isSelected": false }
];

export const CONTINENTS_TEST_DATA_WITH_EUROPE_SELECTED = [
    { "name": "Africa", "isSelected": false },
    { "name": "America", "isSelected": false },
    { "name": "Asia", "isSelected": false },
    { "name": "Europe", "isSelected": true },
    { "name": "Oceania", "isSelected": false }
];

export const STATE_WITH_FILLED_COUNTRIES = {
    continents: CONTINENTS_TEST_DATA,
    countries: COUNTRIES_TEST_DATA
};

export const COUNTRIES_TEST_DATA = [
    { "name": "Russia", "flag": "🇷🇺", "code": "RU", "isSelected": false },
    { "name": "Germany", "flag": "🇩🇪", "code": "DE", "isSelected": false },
    { "name": "UK", "flag": "🇬🇧", "code": "GB", "isSelected": false },
    { "name": "France", "flag": "🇫🇷", "code": "FR", "isSelected": false },
    { "name": "Italy", "flag": "🇮🇹", "code": "IT", "isSelected": false }
]