import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnswersPage = ({ match }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = match.params.userId;
        console.log(userId)
        const response = await axios.get(`http://localhost:8000/api/auth/answers/${userId}`);
        setAnswers(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, [match.params.userId]);

  return (
    <div className="container mt-5">
      <h1>Your Answers:</h1>
      <ul className="list-group mb-4">
        {answers && answers.length > 0 ? answers.map(answer => (
          <li key={answer.questionId} className="list-group-item d-flex justify-content-between align-items-center">
            Question ID: {answer.questionId}

            Answer: {answer.answer}

            File: {answer.fileBase64String}
          </li>
        )): <p>No answers available.</p>}
      </ul>
    </div>
  );
};

export default AnswersPage;