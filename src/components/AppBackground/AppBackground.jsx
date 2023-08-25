import PropTypes from "prop-types";
import { initializeUseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as Ellipse1 } from "../../images/AppBackground/ellipse1.svg";
import { ReactComponent as Ellipse2 } from "../../images/AppBackground/ellipse2.svg";
import { getToggleTheme } from "../../redux/global/global-selectors";
import s from "./AppBackground.module.css";

export default function AppBackground({ children }) {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 767px)" });

  const theme = useSelector(getToggleTheme)

console.log(theme.isDarkMode);
  return (
    <div className={s.AppBackground}>
      <div className={`${!theme.isDarkMode ? s.ellipseWrapperDark : s.ellipseWrapper}`}>
      {/* <div className={s.ellipseWrapper}> ${s.AppBackground} ${s.AppBackground} */}

        {!isMobileOrTablet && (
          <>
            <Ellipse1 className={s.ellipse1} />
            <Ellipse2 className={s.ellipse2} />
          </>
        )}
      </div>
      {children}
    </div>
  );
}

AppBackground.propTypes = {
  children: PropTypes.node,
};
