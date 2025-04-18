import React from "react";
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

const Products = (props) => {
  let navigate = useNavigate();
  console.log(props);
  // console.log('id :', paramId);
  const { title, price, imgUrl, content, id } = props.fruit;


  return (
    <div className="col-md-4">
      <Nav.Link onClick={() => {navigate('/detail/'+id) }}  style={{ textdecoration: "none", color: "#000", textAlign: "center" }}>
        <img src={imgUrl}  width="80%" />
        <h4>{title}</h4>
        <p>{price}</p>
      </Nav.Link>
    </div>
  );
};

export default Products;

