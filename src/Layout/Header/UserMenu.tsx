import { Href, ImagePath } from "@/Constants";
import { logoutUser } from "@/Helper";
// import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {Fragment, useEffect} from "react";
// import {useAppSelector} from "../../Redux/Hooks";
import { useAppSelector } from "@/Redux/Hooks";

const UserMenu = () => {
  const router = useRouter();
  const { profileImage } = useAppSelector((store) => store.rootReducer.uProfile);
    const { entities } = useAppSelector((store) => store.rootReducer);
    const {accessDenied} =entities;
    const handleLogOut = () => {
    // Cookies.remove("token");
    logoutUser();

    router.push("/auth/login");
  };
    useEffect(()=>{
            if(accessDenied){
                handleLogOut();
            }
    })
  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
        <img className="img-60 rounded-circle lazyloaded blur-up" 
               src={profileImage || `${ImagePath}/dashboard/man.png`} 
               alt="Profile Image" />
                         <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link href={`/en/settings/profile`}>
              <i data-feather="user"></i>Edit Profile
            </Link>
          </li>
          {/* <li>
            <a href={Href}>
              <i data-feather="mail"></i>Inbox
            </a>
          </li>
          <li>
            <a href={Href}>
              <i data-feather="lock"></i>Lock Screen
            </a>
          </li> */}
          <li>
            <a href={`/en/settings`}>
              <i data-feather="settings"></i>Settings
            </a>
          </li>
          <li>
            <a onClick={handleLogOut}>
              <i data-feather="log-out"></i>Logout
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
