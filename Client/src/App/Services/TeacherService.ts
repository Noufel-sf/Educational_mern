// services/teacherService.ts
import api from "@/App/Api/api";

export const fetchTeacher = async (id: string) => {
  const res = await api.get(`/teacher/${id}`);
  return res.data.teacher;
};
