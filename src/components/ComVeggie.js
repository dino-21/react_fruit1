import React from "react";

const ComVeggie = (props) => {
  const { imgUrl, title, content, price } = props.veggie;
  console.log(props);
  return (
    <div className="col-md-4" style={{marginBottom:"50px"}}>
      <img src={imgUrl} width="80%" />
      <h5>{title}</h5>
      <p>{content}</p>
      <span>{price}</span>
    </div>
  );
};

export default ComVeggie;
