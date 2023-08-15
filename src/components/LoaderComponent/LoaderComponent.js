/** @format */

import { SpinnerCircular } from "spinners-react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "../LoaderComponent/LoaderComponent.module.css";

export default function LoaderComponent() {
  return (
    <div className={s.backdrop}>
      <div className={s.modal}>
        <SpinnerCircular color="#24CCA7" aria-label="circles-with-indicator" />
      </div>
    </div>
  );
}

