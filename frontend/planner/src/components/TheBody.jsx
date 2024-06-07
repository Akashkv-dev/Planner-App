import { Card, CardBody, Typography } from "@material-tailwind/react";
import AddPlan from "./AddPlan";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import Update from "./Update";

const TheBody = ({ plans, pageRefresh, completed }) => {
  const [update, setUpdate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [proId, setProId] = useState("");
  const openAddPlan = useSelector((store) => store.addPlan.addOpen);

  const handleDelete = (proId) => {
    const token = localStorage.getItem("token");
    const deleteApi = async () => {
      try {
        await axios
          .post(
            "http://localhost:3000/delete",
            { proId },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              pageRefresh();
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
    deleteApi();
  };

  const handleUpdate = (id) => {
    setProId(id);
    const select = plans.find((plan) => plan._id === id);
    if (select) {
      setTasks(select.tasks);
      setUpdate(true);
    }
  };

  const closeUpdate = (d) => {
    setUpdate(d);
  };

  return (
    <>
      <div className="flex-col h-[calc(100vh-4rem)] overflow-y-auto ">
        <div className="m-7">
          {completed ? "Completed Tasks" : "All Tasks"}
          <hr className="border-black" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {plans.map((plan) => {
            const formattedDate = new Date(plan.deadline)
              .toISOString()
              .split("T")[0];
            return (
              <Card
                key={plan._id}
                className="ml-7 sm:w-72 md:w-80 lg:w-80 xl:w-80 border border-slate-950 p-3 rounded-md"
              >
                <CardBody>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {plan.planName}
                    </Typography>
                    <div className="flex space-x-2">
                      <FaEdit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleUpdate(plan._id)}
                      />
                      <FaTrashAlt
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(plan._id)}
                      />
                    </div>
                  </div>
                  {plan.tasks.map((task) => (
                    <div key={task._id}>
                      <Typography>TASKS: {task.task}</Typography>
                    </div>
                  ))}
                  <Typography className="text-red-500 text-lg">
                    Deadline: {formattedDate}
                  </Typography>
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span
                            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                              plan.status == "completed"
                                ? "text-green-600 bg-green-200"
                                : "text-blue-600 bg-blue-200"
                            }`}
                          >
                            {plan.status == "completed"
                              ? "Completed"
                              : "Progress"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {Math.floor(plan.completed)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${plan.completed}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {openAddPlan && <AddPlan />}

        {update && (
          <Update
            closeUpdate={closeUpdate}
            tasks={tasks}
            proId={proId}
            pageRefresh={pageRefresh}
          />
        )}
      </div>
    </>
  );
};

export default TheBody;
