import { useEffect, useState } from "react";

function Test({handlePrevious, handleNext, currentQuestion, selectedAnswer, handleAnswerChange}) {
  
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(selectedAnswer);

  useEffect(() => {
    setLocalSelectedAnswer(selectedAnswer);
  }, [selectedAnswer]);

  const handleChangeRadio=(ev)=>{
    const answerValue = parseInt(ev.target.value);
    console.log(answerValue)
    setLocalSelectedAnswer(answerValue);
    handleAnswerChange(answerValue);
    handleNext();
  }

  function handleClick(ev){
    
    handlePrevious()
  }

  return (
    <> 

  <form action="" className="test">
  <div>
    <label htmlFor={`question${currentQuestion.id}`}>{currentQuestion.question}</label>

    {/* INPUTS RADIO */}
    <div className="radio" id={`question${currentQuestion.id}`}>
      {currentQuestion.answers.map((answer, index) => (
        <div key={index} className="custom-radio">
          <input
            type="radio"
            id={`question${currentQuestion.id}-answer${index}`}
            name={`question${currentQuestion.id}`}
            value={index+1}
            checked={localSelectedAnswer === index + 1}
            onChange={handleChangeRadio}
          />
          <label htmlFor={`question${currentQuestion.id}-answer${index}`}>{answer}</label>
        </div>
      ))}
        </div>
      </div>
    </form>

    <input type="button" value="Atrás" className="start_button" onClick={handleClick}/>
        </>
   
  )
}

export default Test