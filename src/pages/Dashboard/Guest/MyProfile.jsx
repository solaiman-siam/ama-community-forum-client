import { Helmet } from "react-helmet-async";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import bronze from "../../../assets/bronze-badge.png";

function MyProfile() {
  const [role] = useRole();
  const { user } = useAuth();

  return (
    <div>
      <Helmet>
        <title>Ama | My Profile</title>
      </Helmet>
      <div className="bg-white w-full">
        <div>
          <div className=" h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-[#fff] rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={user?.photoURL}
              alt="Woman looking front"
            />
          </div>
          <div className="w-full flex justify-center -mt-8 ">
            {role === "guest" && (
              <>
                <img className="w-10 z-10" src={bronze} alt="" />
              </>
            )}
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user?.displayName}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around"></ul>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
