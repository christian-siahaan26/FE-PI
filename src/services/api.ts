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

// Guests
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

  // Append text fields
  formData.append("location", payload.location);
  formData.append("description", payload.description);

  // Append file - pastikan payload.photo adalah File
  if (payload.photo instanceof File) {
    formData.append("photo", payload.photo);
  } else {
    console.error("Photo harus berupa File object");
    return Promise.reject(new Error("Invalid file format"));
  }

  // PENTING: Kirim formData, bukan payload
  return apiResolver<Response<Complaint>>(() =>
    axios.post("/complaints", formData, {
      headers: {
        // Hapus Content-Type, biarkan browser set otomatis untuk FormData
        // "Content-Type": "multipart/form-data", // JANGAN set manual
      },
    })
  );
};

const updateComplaint = (payload: UpdateComplaintDto) => {
  return apiResolver<Response<UpdateComplaintDto>>(() =>
    axios.put(`/complaints/${payload.id}`, payload)
  );
};

export { getComplaints, createComplaints, deleteComplaint, updateComplaint };
