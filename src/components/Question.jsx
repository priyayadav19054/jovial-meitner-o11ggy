import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Answer from "./Answer";
import Check from "./Check";
import "../all_css/questioncss.css";
// import backgroundImage from "../assets/backgroundimage.png";
import girlImage from "../assets/questionimage.png";
import Footer from "../components/Footer";
import { FaVolumeUp } from "react-icons/fa";

// import "./App.css";
// import GetPost from './GetPost';

var all_questions = [
  "What is your age?",
  "What is your Gender?",
  "What do you do for a living?"
  // "Are you self-Employed?",
  // "Do you work remotely?",
  // "Have you had a mental health disorder in the past?",

  // "What is your age?",
  // "What is your Gender?",
  // "What do you do for a living?",

  // "What is your age?",
  // "What is your Gender?",
  // "What do you do for a living?",

  // "What is your age?",
  // "What is your Gender?",
  // "What do you do for a living?",
];
var answers = [];

function Questionnaire() {
  const { speak } = useSpeechSynthesis();

  const [questions, setQuestions] = useState([
    { id: 1, text: "What is your age?", answer: "" },
    { id: 2, text: "What is your Gender?", answer: "" },
    { id: 3, text: "What do you do for a living?", answer: "" }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState([""]);
  const [currAnswer, setCurrAnswer] = useState("");
  const [sendData, setSendData] = useState(false);
  const [dataToShow, setDataToShow] = useState("");

  function handleAnswerChange(event) {
    const newAnswer = event.target.value;
    setCurrAnswer(newAnswer);

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex].answer = newAnswer;
      return updatedQuestions;
    });
  }

  function handleNextQuestion() {
    answers.push(currAnswer);

    // console.log("Handle Next Questions:", answers);
    setAnswer((prevAnswers) => [...prevAnswers, currAnswer]);
    setCurrAnswer("");

    // console.log("current question number is: ", currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    // console.log("answers array: ", answer);
    // console.log("currentQuestionIndex: ", currentQuestionIndex);
  }

  function addAnswer(msg) {
    const gotData = JSON.stringify(msg);
    setCurrAnswer(gotData);
    console.log("got data in add answer is ", gotData);
    setAnswer((prevAnswers) => [...prevAnswers, gotData]);
    setCurrAnswer("");

    // console.log("answer array is: ", answer);

    // console.log("add answer called1: ", currentQuestionIndex);
    // setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    // console.log("add answer called2: ", currentQuestionIndex);
  }

  function backendData(msg) {
    console.log("backend data value in frontend is", msg);
    setSendData(true);
    setDataToShow(msg);
  }

  return (
    <div>
      {sendData === false ? (
        <div className="questionparent">
          {questions.map((question, index) => {
            if (index === currentQuestionIndex) {
              return (
                <div key={question.id} className="questionbox">
                  <p>{answer}</p>
                  <Answer onChecked={addAnswer} />

                  <img src={girlImage} alt="My Image" />

                  <p className="questiontext">
                    {question.text}{" "}
                    <button
                      title="Speak"
                      onClick={() => speak({ text: question.text })}
                      className="speakButton"
                    >
                      <FaVolumeUp className="speakIcon" />
                    </button>
                  </p>

                  {/* <input type="text" value={question.answer} onChange={handleAnswerChange} /> */}
                  {/* {console.log("current question index", currentQuestionIndex)} */}

                  {/* {currentQuestionIndex === questions.length - 1 && (
                <script>
                  console.log("all answers are: ", answers);
                  console.log("current answer is: ", currAnswer);
                </script>
              )} */}

                  {currentQuestionIndex === questions.length - 1 && (
                    <Check
                      all_questions={all_questions}
                      all_answers={answers}
                      last_answer={currAnswer}
                      onChecked={backendData}
                    />
                  )}

                  {/* <img src={backgroundImage} alt="My Image" /> */}
                </div>
              );
            }
            return null;
          })}
          {/* <Footer /> */}
        </div>
      ) : (
        <div className="questionparent">
          <div className="questionbox">
            <p>{dataToShow}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
