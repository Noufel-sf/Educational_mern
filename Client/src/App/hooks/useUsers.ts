import { useQuery } from "@tanstack/react-query";
import api from "../Api/api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"], // unique key for caching
    queryFn: async () => {
      const response = await api.get("/users/getusers");
      return response.data.users; // return directly the array
    },
  });
};
