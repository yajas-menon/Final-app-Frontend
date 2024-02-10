import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmitForm.css";
import { BASE_URL } from "../utils/apiConst";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const SubmitForm = () => {
  const [formData, setFormData] = useState([]);
  const locate = useLocation();
  const [NewQuestions, setNewQuestions] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

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
    if (updatedFormData[index]?.comment) {
      updatedFormData[index].comment = e.target.value;
      updatedFormData[index].question_id = id;
    } else {
      let obj = {
        comment: e.target.value,
        question_id: id,
        RequestID: params.requestId,
        Question: NewQuestions?.find((s) => s._id == id)?.text,
      };
      updatedFormData?.push(obj);
    }
    setFormData(updatedFormData);
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

  const handleFileUpload = async (e, index, question_id) => {
    let file = "";
    await getBase64(e.target.files[0]).then((data) => {
      file = data;
    });
    const updatedFormData = [...formData];
    if (updatedFormData[index]?.EvidenceBinary) {
      updatedFormData[index].EvidenceBinary = file;
    } else {
      let obj = {
        Question: NewQuestions?.find((s) => s._id == question_id)?.text,
        RequestID: params.requestId,
        question_id: question_id,
        EvidenceBinary: file.split(",")[1],
      };
      updatedFormData.push(obj);
    }
    console.log(updatedFormData);
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

    //Api for ML Model
    let url = "http://127.0.0.1:5000/make_request";
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: url,
      data: formData,
    };

    await axios(config)
      .then(async (res) => {
        console.log(res);
        questions?.forEach((item, index) => {
          item.answer = res.data?.find(
            (s) => s.Question == item?.Question
          )?.answer;
          item.Question = "";
        });

        console.log(questions);
        return;
        const config1 = {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          url: `${BASE_URL}/api/auth/addAnswers/${sessionStorage.getItem(
            "user_id"
          )}`,
          data: questions,
        };

        await axios(config1)
          .then(async (res) => {
            console.log(res);
            await fetchData();
            alert("Successfully Updated Details");
          })
          .catch((err) => {
            console.log(err);
          });
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
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <p className="text-gray-600 mb-4 font-bold mt-6 mx-10">
            Please fill the answers for each of the questions and upload the
            documents if required
          </p>
          <hr className="divide-y divide-solid divide-inherit mt-4 mx-10 " />
          {/* <h1 className="mx-10 font-bold text-2xl">Security Question Form</h1> */}
          <table className="mx-10 my-6">
            <tbody>
              {NewQuestions.map((question, index) => (
                <tr key={index}>
                  <td>{question.text}</td>
                  <td>
                    <input
                      type="text"
                      value={
                        formData[index]?.comment ||
                        user?.questions?.find(
                          (s) => s.question_id == question?._id
                        )?.comment ||
                        ""
                      }
                      onChange={(e) =>
                        handleInputChange(e, index, question?._id)
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      accept=".pdf, .doc , .docx , .txt"
                      onChange={(e) =>
                        handleFileUpload(e, index, question?._id)
                      }
                      onDone
                      className="border-none text-sm text-grey-500
                    file:mr-5 file:py-2 file:px-6
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:cursor-pointer hover:file:bg-amber-50
                    hover:file:text-amber-700"
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

          <button
            className="align-middle mx-10 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
