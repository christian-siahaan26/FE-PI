import { UserData } from "@/pages/admin/dashboardProfile/Profile";

export const saveUserData = (imageUrl: string, name: string) => {
  const userData = { imageUrl, name };
  localStorage.setItem("user_data", JSON.stringify(userData));
};

export const getUserData = () => {
  const storedData = localStorage.getItem("user_data");
  return storedData ? JSON.parse(storedData) : null;
};

export const removeUserData = () => {
  localStorage.removeItem("user_data");
};

export const updateUserData = (newData: Partial<UserData>) => {
  const storedData = localStorage.getItem("user_data");
  const userData = storedData ? JSON.parse(storedData) : {};

  if (newData.name !== undefined) userData.name = newData.name;
  if (newData.imageUrl !== undefined) userData.imageUrl = newData.imageUrl;

  localStorage.setItem("user_data", JSON.stringify(userData));
};
