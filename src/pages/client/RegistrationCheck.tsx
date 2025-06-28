interface RegistrationCheckProps {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  checkRegistration: () => void;
  registrationStatus: string;
}
export default function RegistrationCheck({
  phoneNumber,
  setPhoneNumber,
  checkRegistration,
  registrationStatus,
}: RegistrationCheckProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mt-6">Cek Pendaftaran Anda</h2>
      <p className="text-sm text-gray-500 mb-2">
        Masukkan nomor telepon Anda untuk mengecek status pendaftaran.
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Masukkan No. Telepon"
          className="border p-2 rounded w-full"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={checkRegistration}
        >
          Cek
        </button>
      </div>
      {registrationStatus && (
        <p className="mt-4 text-center font-semibold">
          Status: {registrationStatus}
        </p>
      )}
    </div>
  );
}
