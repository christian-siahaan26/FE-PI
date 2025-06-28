import { apiResolver } from "@/utils/api";
import axios from "./axios";
import { Response, SignInDTO, SignUpDTO } from "@/types/user";

import { CreateComplaintDto, Complaint, UpdateComplaintDto } from "@/types/complaint";
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
    params.append("status_hadir", statusFilter.toString());

  return apiResolver<Response<Complaint[]>>(() =>
    axios.get(`/complaint?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};

const deleteComplaint = async (complaintId: string) => {
  return axios.patch(`/complaint/${complaintId}`);
};

const createComplaints = (payload: CreateComplaintDto) => {
  return apiResolver<Response<CreateComplaintDto>>(() =>
    axios.post("/complaint", payload)
  );
};

const updateComplaint = (payload: UpdateComplaintDto) => {
  return apiResolver<Response<UpdateComplaintDto>>(() =>
    axios.put(`/complaint/${payload.id}`, payload)
  );
};

export { getComplaints, createComplaints, deleteComplaint, updateComplaint };
