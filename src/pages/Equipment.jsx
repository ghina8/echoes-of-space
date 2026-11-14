import { useParams } from "react-router-dom";

function Equipment() {
  const { planet } = useParams();

  return (
    <div>
      <h1>Explore {planet}</h1>
    </div>
  );
}

export default Equipment;