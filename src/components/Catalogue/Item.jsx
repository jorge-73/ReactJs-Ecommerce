import "../../styles/Item.css";
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
  return (
    <div className="col mb-5">
      <div className="card rounded-3 shadow cart">
        <div className="card-header">
          <img
            className="image img-fluid img-thumbnail rounded-3"
            src={item.pictureUrl}
            alt={item.title}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h4 className="card-title">{item.title}</h4>
          <p className="fw-bold mt-2">$ {item.price}</p>
        </div>
        <div className="card-footer">
          <Link to={`/item/${item.id}`} className="btn btn-info rounded-3">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};
