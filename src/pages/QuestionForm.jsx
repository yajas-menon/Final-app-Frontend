
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function QuestionForm() {
  const [questions, setQuestions] = useState([{ text: '', vendor_id: '', template_id: '' }]);
  const [isOpen, setIsOpen] = useState(false);
  const [template, setTemplate] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const handleTemplateChange = (event) => {
    setSelectedTemplateId(event.target.value);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('http://localhost:8000/api/auth/get/Template');
        setTemplate(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, []);


  function addNewQuestionField() {
    setQuestions([...questions, { text: '', vendor_id: '', template_id: '' }])
  }

  function handleSubmit(e) {
    e.preventDefault();
    Promise.all(questions.filter(Boolean).map((questionObj, i) => axios.post('http://localhost:8000/api/auth/questions', questionObj)))
      .then(() => {
        alert('Vendor is Created , Thank You!');
        window.location.href('/Dashboard');
        setQuestions([{ text: '', vendor_id: '', template_id: '' }]);
      })
      .catch(console.error);
  }

  return (
    <div>
      <Navbar />

      <div className='mx-10 my-10 display-flex align-items '>
        <h2 className="text-xl font-bold mb-2">Questions</h2>
        <p className="text-gray-600 mb-4">Please fill the Security Questions</p>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className='flex-col '>

          <select id="templateId" name="templateId" className="bg-gray-50 max-w-xs border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleTemplateChange}>
            <option value="" selected disabled hidden>Choose a Vendor Id...</option>
            {template.map(index => (
              <option key={index} >{index.vendorid}</option>
              ))}
          </select>
          <select id="templateId" name="templateId" className="bg-gray-50  max-w-xs my-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleTemplateChange}>
            <option value="" selected disabled hidden>Choose a Template Name...</option>
            {template.map(index => (
              <option key={index} >{index.templatename}</option>
              ))}
          </select>
              </div>
          {questions.map((questionObj, i) => (
            <div key={i}>
              <input
                name="text"
                value={questionObj.text}
                onChange={e => setQuestions(questions.map((obj, j) => j === i ? { ...obj, text: e.target.value } : obj))}
                placeholder="Enter question..."
                className="border rounded p-2 mb-4"
                required
              />
              <input
                name="vendorid"
                value={questionObj.vendor_id}
                onChange={e => setQuestions(questions.map((obj, j) => j === i ? { ...obj, vendor_id: e.target.value } : obj))}
                placeholder="Enter vendor Id..."
                className="border rounded p-2 mb-4"
                required
              />
              <input
                name="templateid"
                value={questionObj.template_id}
                onChange={e => setQuestions(questions.map((obj, j) => j === i ? { ...obj, template_id: e.target.value } : obj))}
                placeholder="Enter template Id..."
                className="border rounded p-2 mb-4"
                required
              />
            </div>
          ))}
          <button onClick={addNewQuestionField} className="w-full bg-black text-white p-2 rounded-md">Add question</button>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-full my-10 rounded-md ">Save all questions</button>
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
