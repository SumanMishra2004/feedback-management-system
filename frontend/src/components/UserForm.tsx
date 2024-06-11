import React, {useRef, useState } from "react";
import { feedbackDataType } from "../../../backend/dataModel/feedback.model";
import toast, { Toaster } from "react-hot-toast";

const UserForm: React.FC = () => {
  const notifySuccess = (e:string) => toast.success(e);
  const failedNotify  = (e:string)=>toast.error(e)
  const [username, setUsername] = useState("");
  const [support, setSupport] = useState("");
  const [feedbackList, setFeedbackList] = useState<feedbackDataType[]>([]);
  const getBtn = useRef<HTMLButtonElement>(null);
  console.log(typeof feedbackList);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const feedbackData = { name: username, feedback: support };

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (res.ok) {
        notifySuccess("Feedback submitted successfully!");
        console.log("Feedback submitted successfully");
        
      } else {
        failedNotify("Failed to submit feedback");
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      failedNotify("Failed to submit feedback");
      console.error("Error submitting feedback:", error);
    }
  };

  const handleGetFeedback = async() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/feedback");
        const data = await res.json();
        const feedbackArray: feedbackDataType[] = Object.values(data); // Specify the type

        setFeedbackList(feedbackArray);
        notifySuccess("fetch feedback successfully")

      } catch (error) {
        failedNotify("Failed to fetch feedback");
        console.error("Error fetching feedback:", error);
      }
    };
  
    fetchFeedback();
  }

  return (
    <>
    <div className="flex flex-col items-center pt-[4rem] px-2 justify-start mx-auto md:h-screen md:w-screen z-50">
      <div className="w-full box-shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 border border-gray-100
">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Feedback Form
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Suman Mishra"
                required
              />
            </div>

            <div>
              <label
                htmlFor="your-feedback"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Write your Feedback
              </label>
              <input
                type="text"
                onChange={(e) => setSupport(e.target.value)}
                placeholder="Anything"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex flex-row justify-around">
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Send Feedback
              </button>
              <button
                ref={getBtn}
                onClick={handleGetFeedback}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Get Feedback
              </button>
            </div>
          </form>
          {(feedbackList.length < 0)? (
            
              <h2 className="text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Feedback List
              </h2>):(
              <ul>
                {feedbackList.map((feedback) => (
                  <li
                    key={feedback.id}
                    className="bg-gray-100 p-2 mb-2 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <p>
                      <strong>Name:</strong> {feedback.name}
                    </p>
                    <p>
                      <strong>Feedback:</strong> {feedback.feedback}
                    </p>
                  </li>
                ))}
              </ul>
  
          )}
        </div>
      </div>
    </div>
    <Toaster position="bottom-right"/>
    </>
  );
};

export default UserForm;
