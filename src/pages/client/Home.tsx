import { useState } from "react";
import Logo from "../../assets/art-workshop.jpg";
import RegistrationCheck from "./RegistrationCheck";
import WorkshopTimeline from "./WorkshopTimeline";
import LearningDetails from "./learningDetails";
import { useTotalComplaints } from "@/services/complaints/mutations/use-total-complaints";

export default function WorkshopPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");

  const { data } = useTotalComplaints();

  const guests = data?.data || [];
  const listPhoneNumber = guests.find((guest) => guest.name === phoneNumber);

  const checkRegistration = () => {
    setRegistrationStatus(listPhoneNumber ? "Terdaftar" : "Belum Terdaftar");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <img
          src={Logo}
          alt="JavaScript Workshop"
          className="w-full h-56 object-cover rounded-lg"
        />
        <h1 className="text-2xl font-bold mt-4 text-center">
          JavaScript Workshop 2025
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Bergabunglah dalam workshop eksklusif ini untuk mempelajari JavaScript
          dari dasar hingga tingkat lanjut!
        </p>

        <RegistrationCheck
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          checkRegistration={checkRegistration}
          registrationStatus={registrationStatus}
        />
        {/* <div className="text-center mt-6">
          <a
            href="/register"
            className="bg-green-500 text-white px-6 py-2 rounded-lg inline-block"
          >
            Daftar Sekarang
          </a>
        </div> */}

        <LearningDetails />
        <WorkshopTimeline />
      </div>
    </div>
  );
}
