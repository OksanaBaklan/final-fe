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
          onChange={switchDarkMode}
      
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
