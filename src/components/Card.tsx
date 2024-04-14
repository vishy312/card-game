import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card(props: any) {
  return (
    <div
      onClick={props.onClick}
      className={`card ${props.isRotated ? "rotated" : ""} ${
        props.isVisible ? "" : "hidden"
      }`}
    >
      <FontAwesomeIcon
        className={props.isRotated ? "hidden" : ""}
        icon={props.icon}
        size="3x"
      />
    </div>
  );
}

export default Card;
