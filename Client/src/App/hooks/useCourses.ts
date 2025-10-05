import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../Api/api";
import type { ICourse } from "../Types";

// fetch all courses
export const useCourses = () => {
  return useQuery<ICourse[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get("/courses/getallcourses");
      return response.data.courses;
    },
  });
};



// fetch only published courses
export const usePublishedCourses = () => {
    return useQuery<ICourse[], Error>({
    queryKey: ["publishedCourses"], // cache key
    queryFn: async () => {
      const response = await api.get("/courses/getpublishedcourses");
      return response.data.courses; // only return courses
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    refetchOnWindowFocus: true, // refetch when tab is focused
});
};



// delete a course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      await api.delete(`/courses/deletecourse/${courseId}`);
    },
    onSuccess: () => {
      // invalidate cache so React Query refetches fresh courses
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};