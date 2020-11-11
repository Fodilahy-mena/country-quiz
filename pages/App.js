import React, {useState, useEffect} from 'react'

const API_URL = 'https://restcountries.eu/rest/v2/all'


function App() {
    const [countries, setCountries] = useState([]) 
    const [randomCountry, setRandomCountry] = useState('')
    const [randomOptions, setRandomOptions] = useState([])
    const [userWin, setUserWin] = useState(false)
    const [goodAnswer, setGoodAnswer] = useState(0)
    const [showNext, setShowNext] = useState(false)
    const [showResult, setShowResult] = useState(false);
    const [buttonBackground, setButtonBackground] = useState('')
    


    async function getData() {
        const response = await fetch(API_URL);
        const responseJson = await response.json();
        setCountries(responseJson);
        const data = responseJson;
        return data
        
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (countries.length) {
            getRandomCountry();
        }    
    }, [countries]);
    
    function getRandomCountry() {
        const randomNumber = Math.floor(Math.random() * countries.length);
        const random = countries[randomNumber];
        const randOptOne = countries[Math.floor(Math.random() * countries.length)];
        const randOptTwo = countries[Math.floor(Math.random() * countries.length)];
        const randOptThree = countries[Math.floor(Math.random() * countries.length)];
        const randomOptions = [random.name, randOptOne.name, randOptTwo.name, randOptThree.name];
        randomOptions.sort(() => {return 0.5 - Math.random() });
        setRandomCountry(random);
        setRandomOptions(randomOptions);
        setUserWin(false);
    }
    
    function checkWin(e) {
        if(randomOptions[0] === e.target.value) {
            setButtonBackground('green');
        } else {
            setButtonBackground('red');
        }
        if(randomOptions[1] === e.target.value) {
            setButtonBackground('green');
        } else {
            setButtonBackground('red');
        }
        if(randomOptions[2] === e.target.value) {
            setButtonBackground('green');
        } else {
            setButtonBackground('red');
        }

        if(randomOptions[4] === e.target.value) {
            setButtonBackground('green');
        } else {
            setButtonBackground('red');
        }
        
        e.preventDefault();
        const winCountry = randomCountry.name;
        const userAnswer = e.target.value;
        if(winCountry === userAnswer) {
            setUserWin(true);
            setGoodAnswer(prevState => prevState + 1);
        } else {
            setUserWin(false)
        }
        setShowNext(true);
    }
    
    function nextQuestion(e) {
        e.preventDefault();
        console.log('next')
        getRandomCountry();
        setShowNext(false);
    }

    function handleShowResult(e) {
        e.preventDefault();
        setShowResult(true)
    }
    
    return (
        <>
        <div>
            <div>
                <h1>Country quiz</h1>
                { showResult ?
                    <>
                        <h2>
                            Results
                        </h2>
                        <p>
                            You have got <strong>{goodAnswer}</strong> good {goodAnswer <= 1 ? 'answer' : 'answers'}
                        </p>
                        <button onClick={nextQuestion}>Try again</button>
                    </>
                : !userWin ? (
                    <>
                    <div>
                        <h2>{randomCountry.capital} is the capital of?</h2> 
                    </div>
                    <fieldset>
                        <form onClick={e => checkWin(e)}>
                            <button disabled={showNext} className={`btn ${buttonBackground}`} value={randomOptions[0]}>{randomOptions[0]}</button>
                            <button disabled={showNext} className={`btn ${buttonBackground}`} value={randomOptions[1]}>{randomOptions[1]}</button>
                            <button disabled={showNext} className={`btn ${buttonBackground}`} value={randomOptions[2]}>{randomOptions[2]}</button>
                            <button disabled={showNext} className={`btn ${buttonBackground}`} value={randomOptions[3]}>{randomOptions[3]}</button>
                        </form>
                        {showNext ? <button onClick={nextQuestion}>Next</button> : ''}
                    </fieldset>
                    </>
                ) : userWin ? (
                    <>
                    <div>
                        <img width="100px" src={randomCountry.flag} alt="Country flag" /> 
                    </div>
                    <fieldset>
                        <form onClick={e => checkWin(e)}>
                            <button disabled={showNext} className="btn" value={randomOptions[0]}>{randomOptions[0]}</button>
                            <button disabled={showNext} className="btn" value={randomOptions[1]}>{randomOptions[1]}</button>
                            <button disabled={showNext} className="btn" value={randomOptions[2]}>{randomOptions[2]}</button>
                            <button disabled={showNext} className="btn" value={randomOptions[3]}>{randomOptions[3]}</button>
                        </form>
                        {showNext ? <button onClick={handleShowResult}>Result</button> : ''}
                    </fieldset>
                    </>
                ) : (
                    <>
                        <div>
                            <h2>{randomCountry.capital} is the capital of?</h2> 
                        </div>
                        <fieldset>
                            <form onClick={e => checkWin(e)}>
                                <button disabled={showNext} className="btn" value={randomOptions[0]}>{randomOptions[0]}</button>
                                <button disabled={showNext} className="btn" value={randomOptions[1]}>{randomOptions[1]}</button>
                                <button disabled={showNext} className="btn" value={randomOptions[2]}>{randomOptions[2]}</button>
                                <button disabled={showNext} className="btn" value={randomOptions[3]}>{randomOptions[3]}</button>
                            </form>
                            {showNext ? <button onClick={handleShowResult}>Result</button> : ''}
                        </fieldset>
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default App