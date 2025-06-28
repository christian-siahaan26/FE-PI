export default function WorkshopTimeline() {
  const schedule = [
    {
      day: "Hari 1",
      topic: "Pengenalan JavaScript & Dasar-Dasar",
      duration: "2 Jam",
    },
    {
      day: "Hari 2",
      topic: "Manipulasi DOM & Event Handling",
      duration: "2 Jam",
    },
    {
      day: "Hari 3",
      topic: "Asynchronous JavaScript & Fetch API",
      duration: "2 Jam",
    },
    { day: "Hari 4", topic: "JavaScript Modern (ES6+)", duration: "2 Jam" },
    { day: "Hari 5", topic: "Mini Project & Review", duration: "3 Jam" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mt-6">🕒 Timeline Workshop</h2>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Hari</th>
            <th className="border p-2">Topik</th>
            <th className="border p-2">Durasi</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.day}</td>
              <td className="border p-2">{item.topic}</td>
              <td className="border p-2">{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
