import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmitForm.css";
import { BASE_URL } from "../utils/apiConst";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const SubmitForm = () => {
  const [formData, setFormData] = useState([]);
  let user1 = useSelector((state) => state.userData);
  let images = ["image/png", "image/jpeg", "image/jpg"];
  const locate = useLocation();
  const [NewQuestions, setNewQuestions] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const goBackToDashboard = () => {
    navigate("/Dashboard");
  };

  async function fetchData() {
    setLoading(1);
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
          console.log(res.data);
          setNewQuestions(res.data);
        })
        .catch((err) => {
          setLoading(0);
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
          setLoading(0);
        })
        .catch((err) => {
          console.log(err);
          setLoading(0);
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
      // console.log(data)
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
        EvidenceBinary: file,
      };
      updatedFormData.push(obj);
    }
    setFormData(updatedFormData);
  };

  const MainApi = async (questions) => {
    return new Promise(async (resolve, reject) => {
      const config1 = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${BASE_URL}/api/auth/addAnswers/${sessionStorage.getItem(
          "user_id"
        )}?template_id=${locate?.state?.template_id}&vendor_id=${
          locate?.state?.vendor_id
        }&requestID=${params.requestId}`,
        data: questions,
      };

      await axios(config1)
        .then(async (res) => {
          console.log(res);
          await fetchData();
          alert("Successfully Updated Details");
          setLoading(0);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          setLoading(0);
          reject(err);
        });
    });
  };

  const ImageAPI = async (questions, questions1, x) => {
    return new Promise(async (resolve, reject) => {
      let url = "http://127.0.0.1:5000/make_request_jpg";
      const config = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: url,
        data: questions,
      };
      await axios(config)
        .then(async (res) => {
          questions1?.forEach((item, index) => {
            item.Answer = res.data?.find(
              (s) => s.Question == item?.Question
            )?.Answer;
            item.status = "ACTIVE";
            item.RequestID = user?.questions?.find(
              (s) => s.question_id == item?.question_id
            )
              ? user?.questions?.find((s) => s.question_id == item?.question_id)
                  ?.RequestID
              : params.requestId;
            item.template_id = locate?.state?.template_id;
          });
          if (x) {
            await MainApi(questions1)
              .then((res1) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const pdfAPI = async (questions, questions1, x) => {
    return new Promise(async (resolve, reject) => {
      let url = "http://127.0.0.1:5000/make_request";
      const config = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: url,
        data: questions,
      };
      await axios(config)
        .then(async (res) => {
          console.log(res);
          questions1?.forEach((item, index) => {
            item.Answer = res.data?.find(
              (s) => s.Question == item?.Question
            )?.Answer;
            item.RequestID = user?.questions?.find(
              (s) => s.question_id == item?.question_id
            )
              ? user?.questions?.find((s) => s.question_id == item?.question_id)
                  ?.RequestID
              : params.requestId;
            item.status = "ACTIVE";
            item.template_id = locate?.state?.template_id;
          });
          if (x) {
            await MainApi(questions1)
              .then((res1) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const handleSubmit = async () => {
    setLoading(1);
    let questions = formData;

    let y = JSON.parse(JSON.stringify(questions));

    let imageData = [];
    let pdfData = [];
    let imageData1 = [];
    let pdfData1 = [];
    y?.forEach((item, key) => {
      let semicolonIndex = item.EvidenceBinary?.indexOf(":");
      let colonIndex = item.EvidenceBinary?.indexOf(";");
      let slicedValue = item.EvidenceBinary?.slice(
        semicolonIndex + 1,
        colonIndex
      );
      if (images.includes(slicedValue)) {
        let newItem = JSON.parse(JSON.stringify(item));
        imageData1.push(newItem);
        item.EvidenceBinary = item?.EvidenceBinary?.split(",")[1];
        imageData.push(item);
      } else {
        let newItem = JSON.parse(JSON.stringify(item));
        pdfData1.push(newItem);
        item.EvidenceBinary = item?.EvidenceBinary?.split(",")[1];
        pdfData.push(item);
      }
    });

    if (imageData?.length > 0 && pdfData?.length > 0) {
      await Promise.allSettled([
        ImageAPI(imageData, imageData1, 1),
        pdfAPI(pdfData, pdfData1, 1),
      ]);
    } else if (pdfData?.length > 0) {
      await pdfAPI(pdfData, pdfData1, 1).catch((err) => {
        console.log(err);
      });
    } else if (imageData?.length > 0) {
      await ImageAPI(imageData, imageData1, 1).catch((err) => {
        console.log(err);
      });
    }
  };

  function showDocument(_base64Str, _contentType) {
    var byte = atob(_base64Str);
    var blob = new Blob(
      [new Uint8Array([...byte].map((char) => char.charCodeAt(0)))],
      { type: _contentType }
    );
    window.open(URL.createObjectURL(blob), "_blank");
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <p className="text-gray-600 mb-4 font-bold mt- mx-10">
            Please fill the answers for each of the questions and upload the
            documents if required
          </p>
          <hr className="divide-y divide-solid divide-inherit mt-4 mx-10 " />

          <table className="mx-10 my-6 divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  break-words word-wrap"
                >
                  Questions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Answers
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Documents
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  View
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            {/* <tbody className="bg-white divide-y divide-gray-200">
              {NewQuestions.map((question, index) => (
                <tr key={index}>
                  <td>{question.text}</td>
                  {user?.questions?.filter(
                    (s) => s.question_id == question?._id
                  )?.length == 0 ||
                  user?.questions?.find((s) => s.question_id == question?._id)
                    ?.status == "DECLINED" ? (
                    <>
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
                          accept=".pdf, .doc , .docx , .txt,.png,.jpeg , .jpg"
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
                    </>
                  ) : (
                    <>
                      <td>You have already submitted the question</td>
                      <td></td>
                    </>
                  )}
                  <td>
                    {user?.questions?.find(
                      (s) => s.question_id == question?._id
                    ) ? (
                      <button
                        onClick={() => {
                          const semicolonIndex = user?.questions
                            ?.find((s) => s.question_id == question?._id)
                            ?.EvidenceBinary.indexOf(";");
                          const semicolonIndex1 = user?.questions
                            ?.find((s) => s.question_id == question?._id)
                            ?.EvidenceBinary.indexOf(",");
                          const result = user?.questions
                            ?.find((s) => s.question_id == question?._id)
                            ?.EvidenceBinary.slice(5, semicolonIndex);
                          showDocument(
                            user?.questions
                              ?.find((s) => s.question_id == question?._id)
                              ?.EvidenceBinary.slice(
                                semicolonIndex1 + 1,
                                user?.questions?.find(
                                  (s) => s.question_id == question?._id
                                )?.EvidenceBinary?.length
                              ),
                            result
                          );
                        }}
                      >
                        {user?.questions?.find(
                          (s) => s.question_id == question?._id
                        )?.status == "DECLINED"
                          ? "View Previously Uploaded Document"
                          : "View"}
                      </button>
                    ) : null}
                  </td>
                  <td>
                    {user?.questions?.find(
                      (s) => s.question_id == question?._id
                    )?.status
                      ? user?.questions?.find(
                          (s) => s.question_id == question?._id
                        )?.status
                      : "Not Uploaded"}
                  </td>
                </tr>
              ))}
            </tbody> */}
            <tbody className="bg-white divide-y divide-gray-200">
              {NewQuestions.map((question, index) => {
                const declinedQuestion = user?.questions?.find(
                  (s) => s.question_id == question?._id
                );

                if (
                  !declinedQuestion ||
                  declinedQuestion.status === "DECLINED"
                ) {
                  return (
                    <tr key={index}>
                      <td>{question.text}</td>
                      <td>
                        <input
                          type="text"
                          value={
                            formData[index]?.comment ||
                            declinedQuestion?.comment ||
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
                          accept=".pdf, .doc , .docx , .txt,.png,.jpeg , .jpg"
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
                        {declinedQuestion && declinedQuestion.EvidenceBinary && (
                          <button
                            className="text-blue-500 hover:text-blue-950 "
                            onClick={() => {
                              const semicolonIndex = declinedQuestion?.EvidenceBinary.indexOf(
                                ";"
                              );
                              const semicolonIndex1 = declinedQuestion?.EvidenceBinary.indexOf(
                                ","
                              );
                              const result = declinedQuestion?.EvidenceBinary.slice(
                                5,
                                semicolonIndex
                              );
                              showDocument(
                                declinedQuestion?.EvidenceBinary.slice(
                                  semicolonIndex1 + 1,
                                  declinedQuestion?.EvidenceBinary?.length
                                ),
                                result
                              );
                            }}
                          >
                            {declinedQuestion?.status === "DECLINED"
                              ? "View Previously Uploaded Document"
                              : "View"}
                          </button>
                        )}
                      </td>
                      <td>{declinedQuestion?.status ?? "Not Uploaded"}</td>
                    </tr>
                  );
                }

                return null;
              })}
            </tbody>
          </table>

          <button
            className="align-middle mx-10 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="flex my-3 ">
            <button
              className="align-middle mx-10 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={goBackToDashboard}
            >
              Go back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitForm;
