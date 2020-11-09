import React, {useState, useEffect} from 'react'

const API_URL = 'https://restcountries.eu/rest/v2/all'


function App() {
    const [countries, setCountries] = useState([]) 
    const [randomCountry, setRandomCountry] = useState({})
    const [randomOptions, setRandomOptions] = useState([])

    const getData = () => {
            fetch(API_URL)
            .then(data => data.json())
            .then(countries => setCountries((countries)))
            .then(getRandomCountry)
    }
    
    const getRandomCountry = () => {
        // const random = countries[Math.floor(Math.random() * countries.length)];
        // console.log(random);
        // let randomOptions = [random.name];
        // while(randomOptions.length < 4 ){ 
        //     const randomOpt = this.state.countries[Math.floor(Math.random()*this.state.countries.length)];
        //     if (!randomOptions.includes(randomOpt.name)) { 
        //         randomOptions.push(randomOpt.name);
        //     }
        // }
    }
    // useEffect(() => {
    //     getData()
    // }, [])
    getData()
    return (
        <>
            <h1>Country quiz</h1>
        </>
    )
}

export default App