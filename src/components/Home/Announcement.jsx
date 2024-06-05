import { GrAnnounce } from "react-icons/gr";
import useNotificationCount from "../../hooks/useNotificationCount";

function Announcement() {
  const [count] = useNotificationCount();

  return (
    <div>
      <div className="mt-6 bg-white rounded-md p-5">
        <div className="w-full flex items-center px-4 text-white h-16 mb-6 bg-gradient-to-r rounded-md from-[#078669] to-[#06BD95]">
          <GrAnnounce size={40} />
          <h4 className="font-medium text-lg px-4">New Announcement</h4>
        </div>
        {count.map((element) => (
          <div key={element._id} className="pb-6 pl-1">
            <div className="flex gap-2 items-center pb-4">
              <img
                className="w-10 h-10 rounded-full"
                src={element.photoURL}
                alt=""
              />
              <div>
                <h4 className="font-medium text-gray-800">{element.name}</h4>
                <p className="text-xs text-gray-500">
                  <span>{new Date(element.data).toLocaleDateString()}</span>{" "}
                  <span>{new Date(element.data).toLocaleTimeString()}</span>
                </p>
              </div>
            </div>
            <h3 className=" font-medium">{element.title}</h3>
            <p className="text-gray-700 text-[15px] pt-2 w-11/12 ">
              {element.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcement;
