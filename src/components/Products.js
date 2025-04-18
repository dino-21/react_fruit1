import React from "react";
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

const Products = (props) => {
  let navigate = useNavigate();
  console.log(props);
  // console.log('id :', paramId);
  const { title, price, imgUrl, content, id } = props.fruit;


  return (
    <div className="col-md-4"  style={{marginBottom:"50px"}}>
      <Nav.Link onClick={() => {navigate('/detail/'+id) }}  style={{ textdecoration: "none", color: "#000", textAlign: "center" }}>
        <img src={imgUrl}  width="80%" />
        <h5 style={{marginTop:"10px"}}>{title}</h5>
        <p>{content}</p>
        <span>{price}</span>
      </Nav.Link>
    </div>
  );
};

export default Products;

