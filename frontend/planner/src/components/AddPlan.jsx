import { useDispatch, useSelector } from "react-redux";
import { closeAddPlan, refresh } from "../Redux/userSlice";
import { useState } from "react";
import axios from "axios";

const AddPlan = () => {
  const dispatch = useDispatch();
  const [plan, setPlan] = useState({
    planName: "",
    tasks: "",
    deadline: "",
  });

  const handlePlan = (e) => {
    const { name, value } = e.target;
    setPlan((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(plan);
  };

  const clickclosePlan = () => {
    setPlan({
      planName: "",
      tasks: "",
      deadline: "",
    });
    dispatch(closeAddPlan(false));
  };
  const handleSub =  () => {
    const token = localStorage.getItem("token");
   const addPlanApi=async()=>{
    try {
        await axios
          .post(
            "http://localhost:3000/addplan",
            { plan },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              dispatch(refresh())
              clickclosePlan()
            }
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      } catch (error) {
        console.error(error);
      }
   }
   addPlanApi()
    
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div
          className="bg-white p-8 rounded-lg z-10"
          style={{ width: "500px" }}
        >
          <h2 className="text-2xl font-bold mb-4">Add Plan</h2>

          <form>
            <div className="mb-4">
              <label className="block mb-2">Plan Name :</label>
              <input
                className="border border-black ml-2 rounded-sm w-full"
                type="text"
                name="planName"
                value={plan.planName}
                onChange={handlePlan}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Tasks :</label>
              <textarea
                className="border border-black ml-2 rounded-sm h-24 w-full"
                name="tasks"
                value={plan.tasks}
                onChange={handlePlan}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Deadline :</label>
              <input
                className="border border-black ml-2 rounded-sm"
                type="date"
                name="deadline"
                placeholder="dd/mm/yy"
                value={plan.deadline}
                onChange={handlePlan}
                required
              />
            </div>
          </form>

          <div className="flex">
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
              onClick={handleSub}
            >
              Add User
            </button>
            <button
              className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg ml-2"
              onClick={clickclosePlan}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;
