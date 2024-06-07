import { Card,Typography, List, ListItem, ListItemPrefix,
    CardBody,
     } from "@material-tailwind/react";
import { ClipboardDocumentCheckIcon, PlusCircleIcon, QueueListIcon} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { openAddPlan } from "../Redux/userSlice";

const SidePanel = ({fn}) => {
    const dispatch=useDispatch()
    const clickaddPlan=()=>{
        dispatch(openAddPlan(true))
    }
    const compPlans=()=>{
      fn(true)
    }
  return (
    <Card className="h-[calc(100vh-4rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5 border-r-2 bg-gray-300 sm:max-w-[14rem] md:max-w-[14rem] lg:max-w-[16rem] xl:max-w-[18rem] flex flex-col">
      <List>
        <ListItem className="mb-2" onClick={clickaddPlan}>
          <ListItemPrefix>
            <PlusCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Add Plan
        </ListItem>
        <hr className="my-2 border-gray-400" />
        <ListItem className="mb-2">
          <ListItemPrefix>
            <QueueListIcon className="h-5 w-5" />
          </ListItemPrefix>
          Pending
        </ListItem>
        <hr className="my-2 border-gray-400" />
        <ListItem className="mb-2" onClick={compPlans}>
          <ListItemPrefix>
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
          </ListItemPrefix>
          Completed plans
        </ListItem>
        <hr className="my-2 border-gray-400" />
      </List>

      <div className="pt-4 ">
        <div className=" flex justify-center text-lg">
          Important Task
        </div>
        
        <hr className="mx-5 border-gray-400" />
        <Card className="mt-4 border border-black rounded-md sm:max-h-28 md:max-h-32 lg:max-h-36 xl:max-h-40 overflow-auto">
      <CardBody className="p-2">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk
        </Typography>
      </CardBody>
    </Card>
        <Card className="mt-4 border border-black rounded-md sm:max-h-28 md:max-h-32 lg:max-h-36 xl:max-h-40 overflow-auto">
      <CardBody className="p-2">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk
        </Typography>
      </CardBody>
    </Card>
      </div>
    </Card>
  );
}

export default SidePanel;
