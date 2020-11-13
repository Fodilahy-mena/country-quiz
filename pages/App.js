import React, {useState, useEffect} from 'react'
import Winner from '../Winner.svg';
import Logo from '../Logo.svg';

const API_URL = 'https://restcountries.eu/rest/v2/all'

function App() {
    // store all of the countries in an array
    const [countries, setCountries] = useState([])
    // an object of a random country
    const [randomCountry, setRandomCountry] = useState({})
    
    // store four random country names options in an array 
    const [randomOptions, setRandomOptions] = useState([])
    // change this boolean into true if the user clicked on the right option
    const [isUserWinThenContinue, setIsUserWinThenContinue] = useState(true)
    // increment this default value of score whenever the user got a good answer
    const [goodAnswer, setGoodAnswer] = useState(0);
    // will be true if the user got wrong answer 
    //and will countinuously ask a similar question (runing the getRandomCountry() function)
    const [showNext, setShowNext] = useState(false);
    // Ask other type of questions after displaying the total score
    const [askOtherTypeQuestion, setAskOtherTypeOfQuestion] = useState(false);
    const [nameOfCountry, setNameOfCountry] = useState('');
    const [choosenCountry, setChoosenCountry] = useState('');
    const [wrongAnswer, setWrongAnswer] = useState(false)
    

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
        // check if the countries array is already exist. 
        // If so, run the getRandomCountry(); function,
        // otherwise, wait until it is loaded.
        if (countries.length) {
            getRandomCountry();
        }    
    }, [countries]); // set a parameter in order to access it in the getRandomCountry(); function 
    
    function getRandomCountry() {
        // get a random number
        const randomNumber = Math.floor(Math.random() * countries.length);
        // only get one random country object when running
        // this will be the question
        const random = countries[randomNumber];
        // get three other random countries
        const randOptOne = countries[Math.floor(Math.random() * countries.length)];
        const randOptTwo = countries[Math.floor(Math.random() * countries.length)];
        const randOptThree = countries[Math.floor(Math.random() * countries.length)];
        // mix all of four random countries together by using sort(),
        // so that the right answer will move from its place when asking other question
        const randomOptions = [random.name, randOptOne.name, randOptTwo.name, randOptThree.name];
        randomOptions.sort(() => {return 0.5 - Math.random() });
        // put the correct random country in the randomCountry variable
        setRandomCountry(random);
        setRandomOptions(randomOptions);
        setIsUserWinThenContinue(false);
    }
    
    function checkWin(e) {
        e.preventDefault();
        // compare the user's choice to the random country name
        // if they are same, icrement the good answer score
        const winCountry = randomCountry.name;
        setNameOfCountry(winCountry)
        const userAnswer = e.target.value;
        setChoosenCountry(userAnswer)
        if(winCountry === userAnswer) {
            setIsUserWinThenContinue(false);
            setGoodAnswer(prevState => prevState + 1);
        } else {
            setIsUserWinThenContinue(true)
        }
        // after clicking any of the options,
        // show a next button to go to the other questions
        setShowNext(true);
        // loop through every buttons options,
        // and compare their values (I uset textContent) to the random country name
        // whether they are same or not, all of them will haveii a specific class
        let btns, i;
        btns = document.querySelectorAll(".btn");
        for (i = 0; i < btns.length; i++) {
            if(btns[i].textContent === randomCountry.name) {
                btns[i].classList.add('true--answer')
            
            } else if(btns[i].textContent === userAnswer) {
                btns[i].classList.add('wrong--answer')
            }
          }
    }
    
    function nextQuestion(e) {
        e.preventDefault();

        getRandomCountry();
        setShowNext(false);
        // setIsUserWinThenContinue(false)
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
    // will be run after displaying the score
    function showOtherTypeOfQuestion(e) {
        e.preventDefault();

        getRandomCountry();
        setAskOtherTypeOfQuestion(prevState => !prevState)
        setShowNext(false);
        // reset the score into 0
        setGoodAnswer(0)
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
    
    if(nameOfCountry !== choosenCountry) {
        console.log("NOP, show result");
    } else {
        console.log("Yep, continue");
    }
    return (
        <>
        <div>
            <div>
                {!isUserWinThenContinue ?
                <>
                    { !askOtherTypeQuestion ?
                    <div>
                        <img className="logo" width="162px" src={Logo}/>
                        <h2>{randomCountry.capital} is the capital of?</h2> 
                    </div> : 

                    <div>
                        <img className="logo" width="162px" src={Logo}/>
                        <img className="flag" width="84px" src={randomCountry.flag} alt="Country flag" /> 
                        <h2>Which country does this flag belong to?</h2>
                    </div>}
                    
                    <form onClick={e => checkWin(e)}>
                        <button disabled={showNext} className={`btn`} value={randomOptions[0]}>{randomOptions[0]}</button>
                        <button disabled={showNext} className={`btn`} value={randomOptions[1]}>{randomOptions[1]}</button>
                        <button disabled={showNext} className={`btn`} value={randomOptions[2]}>{randomOptions[2]}</button>
                        <button disabled={showNext} className={`btn`} value={randomOptions[3]}>{randomOptions[3]}</button>
                    </form>
                    {showNext ? 
                    <button className="next--btn" onClick={nextQuestion}>Next</button>
                     : ""
                    }
                </> : 
                <> 
                    <div className="winner"> 
                        <img className="winner--img" width="236px" src={Winner}/>
                        <h2>Results</h2>
                        <p>You got <strong>{goodAnswer}</strong> good {goodAnswer <= 1 ? "answer" : "anwers"}</p>
                        <button className="try--btn" onClick={showOtherTypeOfQuestion}>Try again</button>
                    </div>
                </>
                }
            </div>
        </div>
        </>
    )
}

export default App