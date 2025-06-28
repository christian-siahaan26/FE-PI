// import { useAuth } from "@/hooks/use-auth";
import usePath from "@/hooks/usePath";
import { getUserData } from "@/utils/localStorageHelper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const pageName = usePath();
  const user = getUserData();
  const profile = useAuth();

  const navigate = useNavigate();
  return (
    <nav>
      <div className="w-full px-10 py-2 flex justify-end md:justify-between shadow-md items-center border-b">
        <div className="hidden md:block font-semibold border p-3 rounded-lg bg-slate-100">
          {pageName}
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <p className="font-semibold">{profile?.userName}</p>
          <Avatar className="w-12 h-12 md:block">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{profile?.userName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
