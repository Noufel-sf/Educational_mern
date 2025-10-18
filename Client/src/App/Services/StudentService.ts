// services/teacherService.ts
import api from "@/App/Api/api";

export const fetchStudent = async (id: string) => {
  const res = await api.get(`/student/${id}`);
  return res.data.student;
};
