import { Link } from "react-router-dom";
import "./styles.css";
interface LogoCardProps {
  logo: string;
  title: string;
  id: string;
}

function LogoCard({ logo, title, id }: LogoCardProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <Link className="link" to={`/series/${id}`}>
        <img className="logo-img" src={logo} alt={title} />
        <p>{title}</p>
      </Link>
    </div>
  );
}

export default LogoCard;
