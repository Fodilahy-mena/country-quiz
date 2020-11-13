import React from 'react';
import useCountryQuiz from './useCountryQuiz';

function CountryQuiz() {
    
    const [isUserWinThenContinue,
        askOtherTypeQuestion,
        Logo,
        randomCountry,
        showNext,
        randomOptions,
        nextQuestion,
        Winner,
        goodAnswer,
        showOtherTypeOfQuestion,
        checkWin] = useCountryQuiz();
    
    return (
        <>
            <div>
                <div>
                    {!isUserWinThenContinue 
                    ?
                    <>
                        { !askOtherTypeQuestion 
                        ?
                        <div>
                            <img className="logo" width="162px" src={Logo}/>
                            <h2 className="question1">{randomCountry.capital} is the capital of?</h2> 
                        </div> 
                        : 
                        <div>
                            <img className="logo" width="162px" src={Logo}/>
                            <img className="flag" width="84px" src={randomCountry.flag} alt="Country flag" /> 
                            <h2 className="question2">Which country does this flag belong to?</h2>
                        </div>}
                        
                        <form onClick={e => checkWin(e)}>
                            <button disabled={showNext} className={`btn`} value={randomOptions[0]}><span className="A"></span><span>{randomOptions[0]}</span><span className="after--icon"></span></button>
                            <button disabled={showNext} className={`btn`} value={randomOptions[1]}><span className="B"></span><span>{randomOptions[1]}</span><span className="after--icon"></span></button>
                            <button disabled={showNext} className={`btn`} value={randomOptions[2]}><span className="C"></span><span>{randomOptions[2]}</span><span className="after--icon"></span></button>
                            <button disabled={showNext} className={`btn`} value={randomOptions[3]}><span className="D"></span><span>{randomOptions[3]}</span><span className="after--icon"></span></button>
                        </form>
                        {showNext 
                        ? 
                        <button className="next--btn" onClick={nextQuestion}>Next</button>
                        :
                        ""
                        }
                    </> 
                    : 
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

export default CountryQuiz