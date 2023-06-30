import React from "react";
import { useState } from "react";
import "./QuizGame.css";

function QuizGame() {
 
  const questions = [
    {
      question: "Who is the first Prime Minister of India?",
      answers: [
        { text: "Jawaharlal Nehru", correct: true },
        { text: "Narendra Modi", correct: false },
        { text: "Dr. Manmohan Singh", correct: false },
        { text: "Rajendra Prasad", correct: false }
      ]
    },
    // Add the remaining questions here
    {
      question: "How many colours are present in a rainbow?",
      answers: [
        { text: "5", correct: false },
        { text: "6", correct: false },
        { text: "7", correct: true },
        { text: "8", correct: false }
      ]
    },
    {
      question: "Synonym of the word 'happy' is:",
      answers: [
        { text: "melancholy", correct: false },
        { text: "Joy", correct: true },
        { text: "not happy", correct: false },
        { text: "overpowered", correct: false }
      ]
    },
    {
      question: "What is the largest flower in the world?",
      answers: [
        { text: "Hibiscus", correct: false },
        { text: "Sunflower", correct: false },
        { text: "Rafflesia", correct: true },
        { text: "Lotus", correct: false }
      ]
    },
    {
      question: "4/2(5*6)+10 = ?",
      answers: [
        { text: "60", correct: false },
        { text: "75", correct: false },
        { text: "50", correct: false },
        { text: "70", correct: true }
      ]
    }

  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="quiz">
        <h2 id="question">{currentQuestion.question}</h2>
        <div id="answer-buttons">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => handleAnswerClick(answer.correct)}
            >
              {answer.text}
            </button>
          ))}
        </div>
        <button id="next-btn" onClick={handleNextQuestion}>Next</button>
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div className="quiz">
        <h2>Your Score</h2>
        <p>You scored {score} out of {questions.length}!</p>
        <button id="restart-btn" onClick={restartQuiz}>Restart</button>
      </div>
    );
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="app">
      <h1>Easy Quiz Game</h1>
      {quizCompleted ? renderScore() : renderQuestion()}
    </div>
  );
};

export default QuizGame;
  


