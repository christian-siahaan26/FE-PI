import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import useLogout from "../SignOut";

type Tooltip = {
  path?: string;
  label: string;
  type?: "signOut";
  icon: string;
};

export default function TooltipAside({ path, label, type, icon }: Tooltip) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const logout = useLogout();

  return type === "signOut" ? (
    <>
      <Tooltip>
        <TooltipTrigger
          className={`w-full p-2 hover:text-red-800 rounded-md cursor-pointer flex items-center gap-2 text-red-700 justify-center md:justify-start`}
          onClick={() => setOpen(true)}
        >
          <i className={icon}></i>
          <h1 className="hidden md:block">{label}</h1>
        </TooltipTrigger>
        <TooltipContent className="md:hidden">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        title="Sign Out Confirmation"
        description="Are you sure you want to log out?"
        onConfirm={logout}
      />
    </>
  ) : (
    <Tooltip>
      <TooltipTrigger
        className={`w-full p-2 hover:bg-slate-700 hover:text-white rounded-md cursor-pointer ${
          location.pathname === path && "bg-slate-700 text-white"
        } flex items-center gap-2 justify-center md:justify-start`}
        onClick={() => {
          navigate(`${path}`);
        }}
      >
        <i className={icon}></i>
        <h1 className="hidden md:block">{label}</h1>
      </TooltipTrigger>
      <TooltipContent className="md:hidden">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
