import { Item } from "./Item";

export const ItemList = ({ items }) => {
  return (
    <div className="container">
      <div className="row">
        {items.map((producto) => (
          <div className="col-md-4 my-2" key={producto.id}>
            <Item item={producto} />
          </div>
        ))}
      </div>
    </div>
  );
};
