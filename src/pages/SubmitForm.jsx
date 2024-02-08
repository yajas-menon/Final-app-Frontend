import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmitForm.css";
import { BASE_URL } from "../utils/apiConst";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const SubmitForm = () => {
  const [formData, setFormData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const locate = useLocation();
  const [NewQuestions, setNewQuestions] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2500)
  }, [])

  const ApiCall = async () => {
    const response = await fetch("http://127.0.0.1:5000/make_request", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    if (response.ok) {
      console.log("it worked")
    }
  }

  async function fetchData() {
    try {
      const config = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios({
        ...config,
        url: `${BASE_URL}/api/auth/get/questions?template_id=${locate?.state?.template_id}&vendor_id=${locate?.state?.vendor_id}`,
      })
        .then((res) => {
          setNewQuestions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios({
        ...config,
        url: `${BASE_URL}/api/auth/getUsers?id=${sessionStorage.getItem(
          "user_id"
        )}`,
      })
        .then((res) => {
          console.log(res.data.data);
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e, index, id) => {
    const updatedFormData = [...formData];
    if (updatedFormData[index]?.answer) {
      updatedFormData[index].answer = e.target.value;
      updatedFormData[index].question_id = id;
    } else {
      let obj = {
        answer: e.target.value,
        question_id: id,
      };
      updatedFormData?.push(obj);
    }
    setFormData(updatedFormData);
    console.log(formData)
  };

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => reject(err);
    });
  }

  const handleFileUpload = async (e, index) => {
    console.log(e.target.files[0]);
    let file = "";
    await getBase64(e.target.files[0]).then((data) => {
      file = data;
    });
    const updatedFormData = [...formData];
    updatedFormData[index].file = file;
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    let x = JSON.parse(sessionStorage.getItem("questions"));
    if (x?.length > 0) {
      x = [...x, ...formData];
    } else {
      x = formData;
    }
    let questions = x;
    // return;
    const config = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${BASE_URL}/api/auth/addAnswers/${sessionStorage.getItem(
        "user_id"
      )}`,
      data: questions,
    };
    await axios(config)
      .then((res) => {
        console.log(res);
        fetchData();
        alert("Successfully Updated Details");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function base64ToArrayBuffer(_base64Str) {
    var binaryString = _base64Str;
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  function showDocument(_base64Str, _contentType) {
    console.log(_base64Str);
    var byte = base64ToArrayBuffer(_base64Str);
    var blob = new Blob([byte], { type: _contentType });
    window.open(URL.createObjectURL(blob), "_blank");
  }

  return (
    <div>
      <Navbar />
      {loading ? (<Loader />) : (
        <div className="container mt-4">
          <p className="text-gray-600 mb-4 font-bold mt-6">
            Please fill the answers for each of the questions and upload the documents if required
          </p>
          <h1 className="title">Security Question Form</h1>
          <table>
            <tbody>
              {NewQuestions.map((question, index) => (
                <tr key={index}>
                  <td>{question.text}</td>
                  <td>
                    <input
                      type="text"
                      value={
                        formData[index]?.answer ||
                        user?.questions?.find(
                          (s) => s.question_id == question?._id
                        )?.answer ||
                        ""
                      }
                      onChange={(e) => handleInputChange(e, index, question?._id)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      accept=".pdf, .doc , .docx , .txt"
                      onChange={(e) => handleFileUpload(e, index)}
                      onDone
                      className="border-none text-sm text-grey-500
                    file:mr-5 file:py-2 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:cursor-pointer hover:file:bg-amber-50
                    hover:file:text-amber-700
        "
                    />
                  </td>
                  <td>
                    {user?.questions?.find(
                      (s) => s.question_id == question?._id
                    ) ? (
                      <button
                        onClick={() => {
                          const semicolonIndex = user?.questions
                            ?.find((s) => s.question_id == question?._id)
                            ?.file.indexOf(";");
                          const semicolonIndex1 = user?.questions
                            ?.find((s) => s.question_id == question?._id)
                            ?.file.indexOf(",");
                          const result = user?.questions
                            ?.find((s) => s.question_id == question?._id)
                            ?.file.slice(5, semicolonIndex);
                          console.log(result);
                          showDocument(
                            user?.questions
                              ?.find((s) => s.question_id == question?._id)
                              ?.file.slice(
                                semicolonIndex1 + 1,
                                user?.questions?.find(
                                  (s) => s.question_id == question?._id
                                )?.file?.length
                              ),
                            result
                          );
                        }}
                      >
                        View
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onSubmit={ApiCall} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

    </div>
  );
};

export default SubmitForm;
