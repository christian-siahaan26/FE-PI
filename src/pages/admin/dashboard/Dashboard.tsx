import TableList from "./TableList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useComplaints } from "@/services/complaints/mutations/use-complaints";
import { ThumbsUp, User } from "lucide-react";
import EditComplaintForm from "@/components/form/complaints/EditComplaintForm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCompleteComplaints } from "@/services/complaints/mutations/use-total-completes";
import { useTotalComplaints } from "@/services/complaints/mutations/use-total-complaints";

export default function DashboardPage() {
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const [searchComplaint, setSearchComplaint] = useState("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );

  const { data, isLoading } = useComplaints(
    currentPage,
    limit,
    searchComplaint,
    statusFilter
  );
  const { data: dataCompleteComplaint } = useCompleteComplaints();
  const { data: dataTotalComplaint } = useTotalComplaints();

  const totalComplaints = data?.meta.total || 0;
  const totalPages = Math.ceil(totalComplaints / limit);

  const complaints = data?.data || [];
  const complaintsComplete = dataCompleteComplaint?.data || [];
  const totalGuestRegist = dataTotalComplaint?.data || [];

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [selectedGuestId, setSelectedComplaintId] = useState<number>(0);

  const completeComplaints = complaintsComplete.filter(
    (complaint) => complaint.status === true
  ).length;
  const totalGuestRegister = totalGuestRegist.length;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const valueMap: Record<string, boolean | undefined> = {
    all: undefined,
    true: true,
    false: false,
  };

  const handleValue = (value: string) => {
    setStatusFilter(valueMap[value]);
  };
  return (
    <div className="bg-white p-8 rounded-md shadow-sm">
      <div className="mb-5 flex space-x-5">
        <div className="card w-30 h-25 md:w-40 md:h-35 flex flex-col items-center bg-sky-200 py-5 rounded-lg">
          <User className="text-sky-700" size={30} />
          <span className="font-bold text-sky-700 text-sm md:text-base">
            Total complaints
          </span>
          <span className="font-bold text-sky-700 text-sm md:text-base">
            {totalGuestRegister}
          </span>
        </div>
        <div className="card w-30 h-25 md:w-40 md:h-35 flex flex-col items-center bg-yellow-100 py-5 rounded-lg">
          <ThumbsUp className="text-yellow-700" size={30} />
          <span className="font-bold text-yellow-700 text-sm md:text-base">
            Total completes
          </span>
          <span className="font-bold text-yellow-700 text-sm md:text-base">
            {completeComplaints}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center md:space-x-8 space-x-2 mb-5">
          <h1 className="font-bold text-sm">List Complaints</h1>
          <Input
            className="md:w-45 w-30"
            placeholder="Search Name | Location"
            value={searchComplaint}
            onChange={(e) => setSearchComplaint(e.target.value)}
          />
        </div>
        <Select onValueChange={handleValue}>
          <SelectTrigger className="w-30 md:w-[135px]">
            <SelectValue placeholder="is Complete?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 text-xs md:text-sm">
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Location</TableHead>
            <TableHead className="w-[100px]">Description</TableHead>
            <TableHead className="w-[100px]">Photo</TableHead>
            <TableHead className="w-[100px]">is Complete?</TableHead>
            <TableHead className="w-[100px] text-start">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table List */}
        <TableBody>
          {complaints.length > 0 ? (
            complaints.map((complaint, idx) => (
              <TableList
                key={complaint.id}
                complaint={complaint}
                idx={(currentPage - 1) * limit + idx + 1}
                onEdit={() => setIsOpenEditModal(true)}
                setSelectedGuestId={setSelectedComplaintId}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-slate-500">
                No complaints found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={
                  currentPage === index + 1 ? "font-bold text-blue-500" : ""
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {isOpenEditModal && (
        <EditComplaintForm
          open={isOpenEditModal}
          setOpen={setIsOpenEditModal}
          complaintId={selectedGuestId}
        />
      )}
    </div>
  );
}
