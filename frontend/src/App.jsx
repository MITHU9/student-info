import { useEffect, useState } from "react";
import useStudentInfo from "./hooks/useStudentInfo";
import Loading from "./components/loader/Loading";

const departments = [
  { id: 1, name: "CSE" },
  { id: 2, name: "EEE" },
  { id: 3, name: "MATH" },
  { id: 4, name: "BBA" },
  { id: 5, name: "EECE" },
  { id: 6, name: "ICE" },
  { id: 7, name: "PHYS" },
  { id: 8, name: "ECON" },
  { id: 9, name: "GE" },
  { id: 10, name: "BAN" },
  { id: 11, name: "CE" },
  { id: 12, name: "ARCH" },
  { id: 13, name: "PHAR" },
  { id: 14, name: "CHEM" },
  { id: 15, name: "SW" },
  { id: 16, name: "STAT" },
  { id: 17, name: "URP" },
  { id: 18, name: "ENG" },
  { id: 19, name: "PA" },
  { id: 20, name: "HIST" },
  { id: 21, name: "THM" },
];

function App() {
  const [code, setCode] = useState(1);
  const [data, refetch, loading] = useStudentInfo(code);

  useEffect(() => {
    refetch();
  }, [code]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  //console.log(data);

  return (
    <div className="px-12">
      <div className="text-center mt-10">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl">
            {data?.department || "Computer Science & Engineering"}
          </h2>
          <h1 className="font-bold text-2xl">Session: 2023-2024</h1>
        </div>
        <hr className="mt-2" />
        <div className="flex items-center gap-3 justify-end">
          <h2 className="text-xl font-semibold mt-3">Department Name:</h2>
          <select
            name="code"
            id="code"
            className="p-2 mt-5 rounded-md bg-gray-200 hover:bg-gray-300"
            onChange={(e) => setCode(e.target.value)}
          >
            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
                className="bg-gray-200 hover:bg-gray-300"
              >
                {department.id}-{department.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Student info with name roll and image */}
          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
            {data?.students?.map((student) => (
              <div key={student._id} className="flex flex-col items-center">
                <img
                  src={student?.picture || "/avatar.jpg"}
                  alt={student.name}
                  className="w-32 h-32 rounded-full"
                />
                <div className="mt-2">
                  <div className="">
                    <h3 className="text-sm text-left font-semibold">
                      {student?.Name}
                    </h3>
                    <p className="font-bold text-md text-left">
                      Roll: {student.Roll}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
