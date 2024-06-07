import axios from "axios";
import React, { useEffect, useState } from "react";

const Update = ({ closeUpdate, tasks, proId, pageRefresh }) => {
    const [taskList,setTaskList]=useState(tasks)
  const onClose = () => {
    closeUpdate(false);
  };
  const handleComp = (taskId) => {
    const token = localStorage.getItem("token");
    const completeApi = async () => {
      try {
        await axios
          .post(
            "http://localhost:3000/edit",
            { taskId, proId },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((response) => {
            if(response.status === 200){
                console.log(response.data);
                setTaskList(response.data.task)
                pageRefresh()
            }
          })
          .catch((err) => {
            if (err.response) {
              alert(err.response);
            }
          });
      } catch (error) {
        console.error(error);
      }
    };
    completeApi();
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg w-2/5">
          {taskList.map((task) => (
            <div key={task._id}>
              <div className="flex justify-between p-2">
                <p className="mb-4">{task.task}</p>
                
                  {task.done == true ?'DONE' : <button
                  className="bg-gray-500 text-white p-1 rounded"
                  onClick={() => handleComp(task._id)}
                >complete
                </button>}
              </div>
              <hr />
            </div>
          ))}

          <div className="flex justify-end p-2">
            {/* <button
              className="bg-black text-white px-4 py-2 rounded mr-2"
              // onClick={() => onComplete(task.id)}
            >
              Ok
            </button> */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
