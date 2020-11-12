import React, {useState, useEffect} from 'react'

const API_URL = 'https://restcountries.eu/rest/v2/all'

function App() {

    const [countries, setCountries] = useState([]) 
    const [randomCountry, setRandomCountry] = useState('')
    const [randomOptions, setRandomOptions] = useState([])
    const [isUserWin, setUserWin] = useState(false)
    const [goodAnswer, setGoodAnswer] = useState(0)
    const [showNext, setShowNext] = useState(false)
    const [showOtherQuestion, setShowOtherQuestion] = useState(false);
    

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

        let btns, i;
        btns = document.querySelectorAll(".btn");
        for (i = 0; i < btns.length; i++) {
            if(btns[i].textContent === randomCountry.name) {
                btns[i].classList.add('true--answer')
            
            } else {
                btns[i].classList.add('wrong--answer')
            }
          }
    }
    
    function nextQuestion(e) {
        e.preventDefault();

        getRandomCountry();
        setShowNext(false);
        
        let btns, i;
        btns = document.querySelectorAll(".btn");
        for (i = 0; i < btns.length; i++) {
            if(btns[i].textContent === randomCountry.name) {
                btns[i].classList.remove('true--answer')
            } else {
                btns[i].classList.remove('wrong--answer')
            }
          }
    }

    function showOtherTypeOfQuestion(e) {
        e.preventDefault();

        getRandomCountry();
        setShowOtherQuestion(prevState => !prevState)
        setShowNext(false)

        let btns, i;
        btns = document.querySelectorAll(".btn");
        for (i = 0; i < btns.length; i++) {
            if(btns[i].textContent === randomCountry.name) {
                btns[i].classList.remove('true--answer')
            
            } else {
                btns[i].classList.remove('wrong--answer')
            }
          }
    }
    
    return (
        <>
        <div>
            <div>
                <h1>Country quiz</h1>
                    {isUserWin ? 
                    <>
                        <h2>Result</h2>
                        <p>You got <strong>{goodAnswer}</strong> good {goodAnswer <= 1 ? "answer" : "anwers"}</p>
                        <button onClick={showOtherTypeOfQuestion}>Try again</button>
                    </> :

                    <>
                    {!showOtherQuestion ?
                    <div>
                        <h2>{randomCountry.capital} is the capital of?</h2> 
                    </div> : 

                    <div>
                        <img width="100px" src={randomCountry.flag} alt="Country flag" /> 
                        <h2>Which country does this flag belong to?</h2>
                    </div>}
                    <fieldset>
                        <form onClick={e => checkWin(e)}>
                            <button disabled={showNext} className={`btn`} value={randomOptions[0]}>{randomOptions[0]}</button>
                            <button disabled={showNext} className={`btn`} value={randomOptions[1]}>{randomOptions[1]}</button>
                            <button disabled={showNext} className={`btn`} value={randomOptions[2]}>{randomOptions[2]}</button>
                            <button disabled={showNext} className={`btn`} value={randomOptions[3]}>{randomOptions[3]}</button>
                        </form>
                        {showNext ? <button onClick={nextQuestion}>Next</button> : ''}
                    </fieldset>
                    </>
                    }
                    
            </div>
        </div>
        </>
    )
}

export default App