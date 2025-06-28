import { useAuth } from "@/hooks/use-auth";
import { getUserData, updateUserData } from "@/utils/localStorageHelper";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export type UserData = {
  name: string;
  imageUrl: string;
};

export default function ProfilePage() {
  const storedUser = getUserData();
  const profile = useAuth();

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState<UserData>({
    name: storedUser?.name || "",
    imageUrl: storedUser?.imageUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserData(formData);
    profile.setUserName(formData.name);
    setIsEdit(false);
    window.location.reload();
    toast.success("successfully update profile");
  };

  return (
    <section className="space-y-5">
      <div className="md:p-6 mx-auto border flex flex-col items-center border-gray-400 text-white  bg-slate-700 rounded-md shadow-md">
        <h1 className="text-sm md:text-sm font-bold">Profil Akun</h1>
      </div>
      <div className="bg-white p-8 rounded-md shadow-sm flex flex-col justify-center items-center">
        <img
          src={
            storedUser?.imageUrl ||
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt="test"
          className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover shadow-xl border border-slate-400"
        />
        {!isEdit ? (
          <div className="text-center">
            <h1 className="text-sm md:text-xl font-bold text-center mt-5 ">
              {profile.userEmail}
            </h1>
            <h1 className="text-sm md:text-xl font-normal text-center">
              {profile.userName}
            </h1>
            <button
              className="text-slate-200 bg-blue-600 rounded-full shadow-2xl text-sm md:text-base py-1 px-3 md:px-6 md:py-1 mt-2 hover:bg-blue-800 hover:text-slate-100 cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-sm md:text-xl font-bold text-center mt-5 my-3">
              {profile.userEmail}
            </h1>
            <form onSubmit={handleEditProfile}>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={profile.userName || ""}
                className="my-3"
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="URL Link Image"
                name="imageUrl"
                className="my-3"
                onChange={handleChange}
              />
              <button
                className="text-slate-200 bg-blue-600 rounded-full shadow-2xl text-sm md:text-base py-1 px-3 md:px-6 md:py-1 mt-2 hover:bg-blue-800 hover:text-slate-100 cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
