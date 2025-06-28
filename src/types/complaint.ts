export type Complaint = {
  id: number;
  name: string;
  location: string;
  description: string;
  photo: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  total: number;
};

export type CreateComplaintDto = {
  location: string;
  description: string;
  photo: File;
  status?: boolean;
};

export type UpdateComplaintDto = {
  id: number;
  description?: string;
  location?: string;
  photo?: string;
  status?: boolean;
};

export interface ComplaintFilters {
  search?: string;
  startDate?: Date;
  endDate?: Date;
}
