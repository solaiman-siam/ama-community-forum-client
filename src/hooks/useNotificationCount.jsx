import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "./useAxiosCommon";

function useNotificationCount() {
  const { data: count } = useQuery({
    queryKey: ["announcement-count"],
    queryFn: async () => {
      const { data } = await axiosCommon.get("/all-announcement");
      return data;
    },
  });

  return [count];
}

export default useNotificationCount;
