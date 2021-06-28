import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function QuestionBox(props) {
  
  // ------------ build question Object Array ----------------------
  let questionArray = []
    
  for (var i = 0; i < 20; i++ ) {
    questionArray.push(
      {
      "question": props.questionData[i].question,
      "answers": [
        { "answer": props.questionData[i].correct_answer, "value": true },
        { "answer": props.questionData[i].incorrect_answers[0], "value": false },
        { "answer": props.questionData[i].incorrect_answers[1], "value": false },
        { "answer": props.questionData[i].incorrect_answers[2], "value": false },
      ]} 
    )
  }
  // -------------------------------------------------------------------


  // ------------------- Shuffle Answer Logic --------------------------
  function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  for (var j = 0; j < 20; j++ ) {
    shuffle(questionArray[j].answers);
  }
  // -------------------------------------------------------------------

  // ------------------- Current & Next Question Logic -----------------
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionArray.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  // ----------------------------------------------------------------------

  return (
    <Container 
      style={{ width: "80vw" }}
      className="questionBox rounded-3 bg-dark border border-success border-3">
        {showScore ? (
          <div>
            <Row className="text-light">
              <Col>
                <h2>You Scored {score} out of {questionArray.length}</h2>
              </Col>
              <Col>
                <Button className="px-6" variant="primary">
                  <Link 
                    to={{pathname:"/"}} 
                    className="beginButton">
                      Start-Over
                  </Link>
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row className="mb-3 text-light">
              <Col className="text-center h2 text-success border-bottom pb-2">Question {currentQuestion + 1} of 20</Col>
            </Row>
            <Row className="text-light">
              <Col>
                <h2 dangerouslySetInnerHTML={{__html: questionArray[currentQuestion].question}} />
              </Col>
              <Col>
                {questionArray[currentQuestion].answers.map((answerOption) => (
                  <Button onClick={() => handleAnswerOptionClick(answerOption.value)} dangerouslySetInnerHTML={{__html: answerOption.answer}} block>
                  </Button>
                ))}
              </Col>              
            </Row>
          </div>
        )}
    </Container>
  )
}

export default QuestionBox
