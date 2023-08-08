import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as Ellipse1 } from "../../images/AppBackground/ellipse1.svg";
import { ReactComponent as Ellipse2 } from "../../images/AppBackground/ellipse2.svg";
import s from "./AppBackground.module.css";

export default function AppBackground({ children }) {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className={s.AppBackground}>
      <div className={s.ellipseWrapper}>
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
