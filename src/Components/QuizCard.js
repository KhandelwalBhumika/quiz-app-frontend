import './style.css';

import React, { useState } from 'react';  

const QuizCard = (props) => {

  const [optionTick, setOptionTick] = useState("");

  const handleClick =(e) => {
    setOptionTick(e.target.value)
    props.setAnswer(props._id, e.target.value)
  }

  return (
    <>          
         <div className="align-items-top col-4" id='container'>
                <div className="card-body p-2" style={{backgroundColor: 'white'}}>
                        
                            <h3 className="card-text"><strong>Question:</strong> {props.question_text}</h3>
                            <p className="card-text"><strong> <input onClick={handleClick} type= "radio" name={props._id}  value={props.option_a}/> Option A: </strong>{props.option_a} </p>
                            <p className="card-text"><strong> <input onClick={handleClick} type= "radio" name={props._id}  value={props.option_b} /> Option B: </strong>{props.option_b} </p>
                            <p className="card-text"><strong> <input onClick={handleClick} type= "radio" name={props._id}  value={props.option_c} /> Option C: </strong>{props.option_c} </p>
                            <p className="card-text"><strong> <input onClick={handleClick} type= "radio" name={props._id}  value={props.option_d} /> Option D: </strong> {props.option_d}</p>

                            { props.correct_option && props.correct_option.length > 0 && <p>
                              Correct Ans: <span  style={{color: 'greenyellow', fontStyle: 'bold'}}>{props.correct_option}</span>
                            </p> }
                            { props.correct_option && props.correct_option.length > 0 && <p>
                              Your ans is  { props.correct_option === optionTick ? <span  style={{color: 'greenyellow', fontStyle: 'bold'}}>Correct</span> : <span  style={{color: 'red', fontStyle: 'bold'}}>Incorrect</span>}
                            </p> }
                </div>
        </div>
        
    </>
  )
}

export default QuizCard;





