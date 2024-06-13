import "../styles/App.scss"
import data from "../services/data.json"
import { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Test from "./Test";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


//1.al seleccionar un respuesta, ponerle una propiedad con la respuesta seleccionada (cuando se ejecuta la handlenext)
// 2.- accedo a esa posición del array con currentquestionindex y a ese objeto le añado la propiedad con el valor de la respuesta seleccionada.
//3.- al hacer click en atrás cojo el currentquestionindex, accedo a la respuesta que ha dado el usuario y se lo resto a total.



function App() {
  
  const [test, setTest] = useState (data)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [start, setStart] = useState(false)
  const [total, setTotal] = useState(0)

  //Solo 1 variable de estado indice
  //  Para resultado variable de estado total y si escojo la opción a sumo 1, si es b sumo 2, si es c sumo 
  // luego condicionales del total. 
  
  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsTestFinished(true);
    }
    };
  
  
    const handlePrevious = () => {
      if (currentQuestionIndex > 0) {
        const previousAnswer = selectedAnswer[currentQuestionIndex];
        if (previousAnswer !== undefined) {
          setTotal(total - previousAnswer);
        }
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

    const handleAnswerChange = (answerValue) => {
      const previousAnswer = selectedAnswer[currentQuestionIndex];
      if (previousAnswer !== undefined) {
        setTotal(total - previousAnswer);
      }
      setSelectedAnswer({
        ...selectedAnswer,
        [currentQuestionIndex]: answerValue,
      });
      setTotal(total + answerValue);
      console.log(answerValue)
      console.log(previousAnswer)
      console.log(total + answerValue)
    };

    
    const currentQuestion = data[currentQuestionIndex];

    const handleStart = () => {
      setStart(true);
    };

    function results (){
      if (total <= 6) {
        return (
        <span>
        <strong>Tu tipo de piel es seca: </strong>Incluye en tu rutina ingredientes productos con activos como el ácidoh hialurónico, ceramidas y aceites naturales que aporten una hidratación profunda</span>);
      } else if (total <= 10) {
        return (
          <span>
          <strong>Tienes una piel sensible:</strong> Usa limpiadores suaves y sin fragancia. Mantén una hidratación constante con cremas hipoalergénicas y evita exfoliantes abrasivos. Elige ingredientes calmantes como la centella asiática o el aloe vera. Realiza siempre un "patch test" (en el brazo) antes de usar nuevos productos.</span>);
      } else if (total <= 14) {
        return (<span><strong>Tu piel es grasa:</strong> Usa un exfoliante químico suave con ingredientes como el ácido salicílico o el ácido glicólico. Exfolia tu piel dos o tres veces por semana para mantener los poros limpios y reducir el exceso de sebo. Esto ayudará a prevenir los brotes y a mantener una textura de piel más suave y uniforme.</span>);
      } else {
        return (<span><strong>Tu piel es mixta:</strong> La piel mixta puede beneficiarse del uso de mascarillas de arcilla una o dos veces por semana. La arcilla ayuda a absorber el exceso de grasa en la zona T (frente, nariz y barbilla) mientras hidrata y calma las áreas más secas. Opta por mascarillas que contengan ingredientes como el caolín o la arcilla de bentonita para equilibrar y purificar tu piel sin resecarla.</span>);
      }
    }

    // useEffect(() => {
    //   setSelectedAnswer(null);
    // }, [currentQuestion]);

    //crear funcion cambia total

    // function changeTotal(valueAnswer){
    //   setTotal (total + valueAnswer)
    // }

    //crear variable de resultados y una función con los condicionales que evalúe el puntaje.

  
  return (
    
    
    <div className="ppal">
    <Header/>
    <div className="main-content">

    <Routes>
      <Route path="/" element={<>
    <Welcome />
    <Link className="start" to="/test" onClick={handleStart}>Haz el test ahora</Link>
  </>}/>
     
      <Route path="/test" element={
              isTestFinished ? (
                <div className="results">
                  <h2 className="results__title">¡Has completado el test!</h2>
                  <p className="results__type">{results()}</p>
                </div>
              ) : (
                <Test 
                  dataTest={data}
                  handlePrevious={handlePrevious}
                  handleNext={handleNext}
                  currentQuestion={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  setSelectedAnswer={setSelectedAnswer}handleAnswerChange={handleAnswerChange}
                />)}/>
    </Routes>
    </div>
    <Footer/>
    </div>
  );
}

export default App;