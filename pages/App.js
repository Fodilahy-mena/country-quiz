import React, {useState, useEffect} from 'react'

const API_URL = 'https://restcountries.eu/rest/v2/all'


function App() {
    const [countries, setCountries] = useState({}) 
    const [randomCountry, setRandomCountry] = useState({})
    const [randomOptions, setRandomOptions] = useState([])
    const [userWin, setUserWin] = useState('')
    const [goodAnswer, setGoodAnswer] = useState(0)


    function getData() {
        fetch(API_URL)
        .then(data => data.json())
        .then(countries => {
            setCountries(countries); 
        })
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getRandomCountry();
    }, [countries])
    // console.log(randomCountry)
    function getRandomCountry() {
        const index = Math.floor(Math.random() * countries.length);
        const random = countries[index];
        console.log(random)
        console.log('countries', countries)
        // const randOptOne = countries[Math.floor(Math.random() * countries.length)];
        // const randOptTwo = countries[Math.floor(Math.random() * countries.length)];
        // const randOptThree = countries[Math.floor(Math.random() * countries.length)];
        // const randomOptions = [random.name, randOptOne.name, randOptTwo.name, randOptThree.name];
        // randomOptions.sort(() => {return 0.5 - Math.random() });
        // setRandomCountry({randomCountry: random});
        // setRandomOptions({randomOptions: randomOptions});
        // setUserWin({userWin: ''});
    }
    
    
    
    function checkWin(e) {
        const winCountry = randomCountry.name;
        const userAnswer = e.target.value;
        if(winCountry === userAnswer) {
            setUserWin({userWin: "Win"});
            setGoodAnswer({goodAnswer: goodAnswer + 1});

        } else {
            setUserWin({userWin: "Lose"})
        }
        setTimeout(() => {
            getRandomCountry();
            setUserWin({userWin: ''})
            
        }, 1000);
    }
    
    // getData()
    
    
    return (
        <>
        <div>
            <div>
                <h1>Country quiz</h1>
                <button onClick={getRandomCountry}>Random</button>
                <div>
                    <img src={randomCountry.flag} alt="Country flag" />
                </div>
                <h2>
                    {userWin === 'Win' ? 'You guess right! ' : ''}
                    {userWin === 'Lose' ? 'You guess wrong. ' : ''} 
                    Score:{goodAnswer}
                </h2>
            </div>
            <fieldset>
                <form onClick={e => checkWin(e)}>
                    <button value={randomOptions[0]}>{randomOptions[0]}</button>
                    <button value={randomOptions[1]}>{randomOptions[1]}</button>
                    <button value={randomOptions[2]}>{randomOptions[2]}</button>
                    <button value={randomOptions[3]}>{randomOptions[3]}</button>
                </form>
            </fieldset>
        </div>
        </>
    )
}

export default App