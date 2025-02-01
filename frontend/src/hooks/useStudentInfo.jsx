import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useStudentInfo(code) {
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      return axios
        .get(`https://backend-phi-taupe.vercel.app/api/students?code=${code}`)
        .then((res) => res.data);
    },
  });

  return [data, refetch, isLoading];
}

export default useStudentInfo;
