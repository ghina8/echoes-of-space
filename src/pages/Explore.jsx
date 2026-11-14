import { Link } from "react-router-dom";

function Explore() {
  return (
    <div>
      <h1>Choose Your Destination</h1>

      <Link to="/explore/moon">Explore Moon</Link>

      <br />

      <Link to="/explore/mars">Explore Mars</Link>
    </div>
  );
}

export default Explore;