import {useState, useEffect} from 'react';
import Winner from '../Winner.svg';
import Logo from '../Logo.svg';
const API_URL = 'https://restcountries.eu/rest/v2/all'

function useCountryQuiz() {
    // store all of the countries in an array
    const [countries, setCountries] = useState([])
    // an object of a random country
    const [randomCountry, setRandomCountry] = useState({})
    
    // store four random country names options in an array 
    const [randomOptions, setRandomOptions] = useState([])
    // change this boolean into true if the user clicked on the right option
    const [isUserWinThenContinue, setIsUserWinThenContinue] = useState(false)
    // increment this default value of score whenever the user got a good answer
    const [goodAnswer, setGoodAnswer] = useState(0);
    // will be true if the user got wrong answer 
    //and will countinuously ask a similar question (runing the getRandomCountry() function)
    const [showNext, setShowNext] = useState(false);
    const [randomNumber, setRandomNumber] = useState(0);
    
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
        setRandomNumber(Math.floor(Math.random() * countries.length));
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
        // setIsUserWinThenContinue(false);
    }
    
    
    function checkWin(e) {
        e.preventDefault();
        // compare the user's choice to the random country name
        // if they are same, icrement the good answer score
        const winCountry = randomCountry.name;
        // e.target.value is sometimes undefined so we take the e.target.textContent
        // instead of having some bugs
        const userAnswer =  e.target.textContent;
        
        if(winCountry === userAnswer) {
            setGoodAnswer(prevState => prevState + 1);
            setIsUserWinThenContinue(true);
        } else {
            setIsUserWinThenContinue(false);
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
        getRandomCountry();
        setShowNext(false);
        setIsUserWinThenContinue(false)
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
    function tryAgain(e) {
        e.preventDefault();
        getRandomCountry();
        
        setIsUserWinThenContinue(false)
        setShowNext(false);
        // reset the score into 0
        setGoodAnswer(0);
        // remove the class of the button so that the specific mark of 
        // wrong answer or right answer will no longer work unless the user 
        // click either of the buttons
        // Note: this only happens when running another question 
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

    function handleResult() {
        if(isUserWinThenContinue) {
            // if user's anwer is correct, continue asking an other question 
            nextQuestion();
        } else {
            // otherwise, set the random country into null so that it will show
            // the result after clicking the next button
            setRandomCountry(null);
           
        }
    }
    // return/export any variables or functions that will be necessary
    // for the CountryQuiz component
    return [isUserWinThenContinue, 
        // askOtherTypeQuestion, 
        Logo,
        randomCountry,
        showNext,
        randomOptions,
        nextQuestion,
        Winner,
        goodAnswer,
        tryAgain,
        checkWin,
        randomNumber,
        handleResult];
}

export default useCountryQuiz