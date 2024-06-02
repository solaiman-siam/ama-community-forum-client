import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";

function useRole() {
  const { user, loading } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data: role = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading || !!user?.email,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/user/${user.email}`);
      return data.role;
    },
  });
  return [role, userLoading, loading];
}

export default useRole;
