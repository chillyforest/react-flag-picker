export const createContinentsList = (source) =>
    source.map(c => ({ "name": c.continent, "isSelected": false }));


export const createCountriesList = (source, sContinent) => {
    return (
        source.filter(x => x.continent === sContinent)
            .map(data => data.countries
                .map((c) => { c.isSelected = false; return c; })
            )[0]
    )
}

