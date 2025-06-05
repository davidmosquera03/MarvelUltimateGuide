import "./styles.css";
import { Series } from "../../types/models";
import { Link } from "react-router-dom";

interface SeriesCardProps {
  series: Series; // Optional prop for custom range text
}

function SeriesCard({ series }: SeriesCardProps) {
  return (
    <div>
      <Link to={`/series/${series._id}`} className="link">
        <img className="series-cover" src={series.banner} />
        <p style={{ textAlign: "center" }}>{series.title}</p>
      </Link>
    </div>
  );
}

export default SeriesCard;
