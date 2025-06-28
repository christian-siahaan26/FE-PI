import { useNavigate } from "react-router-dom";
import Logo from "../../assets/guestList-logo.png";
import { TooltipProvider } from "@/components/ui/tooltip";
import TooltipAside from "./TooltipAside";

export default function AsideDashboard({ ...props }) {
  const navigate = useNavigate();

  return (
    <div {...props}>
      <div
        onClick={() => navigate("/")}
        className="flex flex-col items-center cursor-pointer pt-4"
      >
        <img src={Logo} className="w-25" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-bold text-slate-200 dark:text-slate-300 hidden md:block">
          Complaint List
        </span>
      </div>
      <TooltipProvider>
        <div className="w-[90%] mx-auto mt-5">
          <div className="flex flex-col items-start gap-2 text-slate-400 font-medium">
            <TooltipAside
              path="/dashboard"
              label="Dashboard"
              icon="fas fa-home"
            />
            <TooltipAside
              path="/dashboard/create"
              label="Add Complaint"
              icon="fas fa-plus-square"
            />

            {/* <TooltipAside
              path="/dashboard/profile"
              label="Profile"
              icon="fas fa-user"
            /> */}
            <TooltipAside
              type="signOut"
              label="Sign Out"
              icon="fas fa-sign-out-alt"
            />
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
