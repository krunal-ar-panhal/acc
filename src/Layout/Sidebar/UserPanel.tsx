import { ImagePath, sessionName } from "@/Constants";
import { getSessionData } from "@/Helper";
import { useAppSelector } from "@/Redux/Hooks";

const UserPanel = () => {
  const loginData = getSessionData(sessionName);
  const { profileImage } = useAppSelector((store) => store.rootReducer.uProfile);

  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img 
            className="img-60 rounded-circle lazyloaded blur-up" 
            src={profileImage || `${ImagePath}/dashboard/man.png`} 
            alt="Profile Image" 
          />
        </div>
        <h6 className="mt-3 f-14">
          {loginData ? `${loginData.firstName} ${loginData.lastName}` : "User Name"}
        </h6>
        <p>{loginData ? loginData.role : "Role"}</p>
      </div>
    </div>
  );
};

export default UserPanel;
