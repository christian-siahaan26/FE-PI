import { apiResolver } from "@/utils/api";
import axios from "./axios";
import { Response, SignInDTO, SignUpDTO } from "@/types/user";

import {
  CreateComplaintDto,
  Complaint,
  UpdateComplaintDto,
} from "@/types/complaint";
import { R_TOKEN } from "@/utils/constants";

type token = string;

export function signUp(payload: SignUpDTO) {
  return apiResolver<Response<token>>(() =>
    axios.post("/auth/signup", payload)
  );
}
export function signIn(payload: SignInDTO) {
  return apiResolver<Response<token>>(() =>
    axios.post("/auth/signin", payload)
  );
}

export function authorize() {
  return apiResolver<Response<token>>(() => axios.post("/auth/authorize"));
}

// Complaints
const getComplaints = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  statusFilter?: boolean
) => {
  const token = localStorage.getItem(R_TOKEN);

  if (!token) {
    return Promise.reject(new Error("No token found"));
  }

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (search) params.append("search", search);
  if (statusFilter !== undefined)
    params.append("status", statusFilter.toString());

  return apiResolver<Response<Complaint[]>>(() =>
    axios.get(`/complaints?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};

const deleteComplaint = async (complaintId: string) => {
  return axios.patch(`/complaints/${complaintId}`);
};

const createComplaints = (payload: CreateComplaintDto) => {
  const formData = new FormData();
  formData.append("location", payload.location);
  formData.append("description", payload.description);

  if (payload.photo instanceof File) {
    formData.append("photo", payload.photo);
  } else {
    return Promise.reject(new Error("Invalid file format"));
  }

  return apiResolver<Response<Complaint>>(() =>
    axios.post("/complaints", formData, {
      headers: {},
    })
  );
};

const hasNewPhotoToUpload = (photo: any): boolean => {
  if (!photo) return false;
  if (photo instanceof File) return true;
  if (photo instanceof FileList && photo.length > 0) return true;
  return false;
};

const getFileFromPhoto = (photo: any): File | null => {
  if (photo instanceof File) return photo;
  if (photo instanceof FileList && photo.length > 0) return photo[0];
  return null;
};

const updateComplaint = (payload: UpdateComplaintDto) => {
  const formData = new FormData();

  if (payload.location !== undefined) {
    formData.append("location", payload.location);
  }

  if (payload.description !== undefined) {
    formData.append("description", payload.description);
  }

  if (payload.status !== undefined) {
    formData.append("status", payload.status.toString());
  }

  const hasNewPhoto = hasNewPhotoToUpload(payload.photo);
  if (hasNewPhoto) {
    const file = getFileFromPhoto(payload.photo);
    if (file) {
      formData.append("photo", file);
    }
  } else {
    console.log("No new photo - keeping existing photo");
  }

  return apiResolver<Response<Complaint>>(() =>
    axios.put(`/complaints/${payload.id}`, formData, {
      headers: {},
    })
  );
};

export { getComplaints, createComplaints, deleteComplaint, updateComplaint };
