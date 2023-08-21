/** @format */

import s from "./NothingPage.module.css";
import { Link } from "react-router-dom";
import classNames from 'classnames';

function NothingPage() {

  return (
    <>
     <main style={{ padding: '1rem' }}>
                        <span className={s.title}>There's nothing here!</span>
                        <br />
                        <span>
                          <Link to={'/'}>
                            {' '}
                            <button 
                             className={classNames(s.btn, s.btnAdd)}
                            type="submit">Return</button>
                          </Link>
                        </span>
                      </main>
    </>
  );
}

export default NothingPage;
