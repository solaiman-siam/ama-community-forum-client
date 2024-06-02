import axios from "axios";

const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function useAxiosCommon() {
  return <div>useAxiosCommon</div>;
}

export default useAxiosCommon;
