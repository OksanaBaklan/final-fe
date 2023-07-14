/** @format */

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <Link to="/login">login</Link>
    </>
  );
}

export default HomePage;
