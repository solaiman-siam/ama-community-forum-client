import { GrAnnounce } from "react-icons/gr";

function Announcement() {
  return (
    <div>
      <div className="mt-6 bg-white rounded-md p-5">
        <div className="w-full flex items-center px-4 text-white h-16 mb-6 bg-gradient-to-r rounded-md from-[#078669] to-[#06BD95]">
          <GrAnnounce size={40} />
          <h4 className="font-medium text-lg px-4">New Announcement</h4>
        </div>
        <h3 className="text-xl font-medium">
          Hey guys, here is a new announcemnet
        </h3>
        <p className="text-gray-700 pt-4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          reiciendis officia aspernatur, quam id odio doloribus modi quisquam
          <br />
          harum repellendus aut quos quod. Facere possimus dolorum nobis velit,
        </p>
      </div>
    </div>
  );
}

export default Announcement;
