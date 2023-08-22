import { NavLink } from "react-router-dom";

// mobile
// import { ReactComponent as HomeImgMob } from "images/navigation/mobile/home.svg";
import { ReactComponent as HomeImgMob } from "../../images/navigation/mobile/home.svg";
import { ReactComponent as PbImgMob } from "../../images/navigation/mobile/pb.svg";
import { ReactComponent as StatisticsImgMob } from "../../images/navigation/mobile/statistics.svg";

// tablet
import { ReactComponent as HomeImgTab } from "../../images/navigation/tablet/home.svg";
import { ReactComponent as StatisticsImgTab } from "../../images/navigation/tablet/statistics.svg";

import s from "./Navigation.module.css";
import Media from "react-media";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { getAuth } from "../../redux/auth/auth-selectors";

export default function Navigation() {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 767px)" });
  const isAuth = useSelector(getAuth);

  return (
    <nav className={s.nav}>
      {isAuth && <NavLink
        to="/table"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        <HomeImgMob className={s.navImgMob} />
        <HomeImgTab className={s.navImgTab} />
        <span className={s.text}>Home</span>
      </NavLink>}

      {isAuth &&<NavLink
        to="/statistic"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        <StatisticsImgMob className={s.navImgMob} />
        <StatisticsImgTab className={s.navImgTab} />
        <span className={s.text}>Statistic</span>
      </NavLink>}

        {/* {isMobileOrTablet &&  */}
        
        <Media
        query="(max-width: 767px)"
        render={() => (
         <NavLink
            to="/currency"
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            <PbImgMob className={s.navImgMob} />
          </NavLink>)} />
      

    </nav>
  );
}
