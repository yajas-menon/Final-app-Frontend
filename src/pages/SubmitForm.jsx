import React , {useState , useEffect}from "react";
import axios from 'axios';
import './SubmitForm.css'
import Navbar from "../components/Navbar";

const SubmitForm =() =>{
    const [formData , setFormData] = useState([]);
    const [currentQuestion , setCurrentQuestion] = useState(0);

    const [NewQuestions, setNewQuestions] = useState([]);

    useEffect(() => {
        async function fetchData() {
        try {
            const result = await axios.get('http://localhost:8000/api/auth/get/questions');
            setNewQuestions(result.data);
        } catch (error) {
            console.error('Error fetching questions: ', error);
        }
        }
        fetchData();
    });

    const handleInputChange =(e , index)=>{
        const updatedFormData = [...formData];
        updatedFormData[index]=e.target.value;
        setFormData(updatedFormData)
    };

    const handleFileUpload =(e , index)=>{
        console.log("File Uploaded ${index}:" , e.target.files[0]);
    };

    const handleSubmit =()=>{
        if(formData.every((response)=> response.trim()!== '')){
            alert("Form Submitted : with status code 200" , formData);
        }else{
            alert("Please answer all the questions beform submitting.");
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="mx-10 my-10 ">
            <h1 className="text-xl font-bold">Security Question Form</h1>
            <table>
                <tbody >
                    {NewQuestions.map((question , index)=> (
                        <tr key={index}>
                        <td>{question.text}</td>
                        <td> 
                            <input type="text" value={formData[index]|| ' '} onChange={(e)=> handleInputChange(e,index)} required/>
                        </td>
                        <td>
                            <input type="file" accept=".pdf, .doc , .docx , .txt" onChange={(e)=>handleFileUpload(e,index)}/>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                <button className="right-align" onClick={handleSubmit}>Submit</button>
        </div>
                    </div>
    );
};

export default SubmitForm ;