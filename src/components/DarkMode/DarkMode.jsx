import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/global/global-action";
import s from "../DarkMode/DarkMode.module.css"
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

export default function DarkMode ({isDarkMode}){
  const dispatch = useDispatch();

  const switchDarkMode = ()=>{dispatch(toggleTheme(false))}

    return(
        <>
        
      <div className={s.darkmode}>
          <input
          type="checkbox"
          className={s.checkbox}
          id="checkbox"
          // onChange prop to fire our internal function for changing the dark mode value
          onChange={switchDarkMode}
          // checking checked prop with dark mode state
          // checked={isdarkMode}
        />
        <label htmlFor="checkbox" className={s.label} >
          <BsMoonStarsFill color="white" />
          <BsFillSunFill color="yellow" />
          <div className={s.ball}></div>
        </label>
      </div>

        </>
    )
}