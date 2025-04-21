import React from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components'



let Banner = styled.div`
  padding : 20px;
  color : gray;
`;

let BannerBtn = styled.button`
  color : white;
  font-size:30px;
  width:100%;
  padding : 100px 100px;
  border:1px solid #ccc;
  background-image:url("../img/banner.jpg");
  background-size:cover;
  background-position:center;
`;
function Detail(props) {
  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);
  let { paramId } = useParams();
  let dispatch = useDispatch(); //Hook들은 조건문 위쪽에서 무조건 실행되도록 위치를 조정

  let [tap, setTap] = useState(0);
  let [fade2, setFade2] = useState("");

  

  // 내가 선택한 상품이 fruit.js 안에 있는 상품인지 유효성체크 후 데이터를 가져 옴
  // paramId는 문자열이므로 숫자로 변환해서 비교
 let selproduct = props.fruit.find((x) => x.id === Number(paramId));


 //유효성 체크: 상품이 없다면 "상품이 존재하지 않습니다." 메시지 출력
  if (!selproduct) {
    return <div>해당 상품이 존재하지 않습니다.</div>;
  }

  const { id, imgUrl, title, content, price } = selproduct;
  
  console.log("내가 선택한 상품은: " + id + " " + title);

  return (
    <div className={"container start " + fade2}>

    <Banner>
      <BannerBtn>과일농장의 맛과 건강을 선물하세요.</BannerBtn>
    </Banner>

      <div className="row" style={{ marginBottom: "50px" }}>
        <div className="col-md-6">
          <img src={"/" + imgUrl} width="100%" alt={title} />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{title}</h4>
          <p>{content}</p>
          <p>{price}</p>
          <Button
            variant="primary"
            onClick={() => {
              //  dispatch(addItem(  {id : 2,  imgurl : 'shoes1.jpg', name : 'Grey Yordan', count : 1}))

              dispatch(
                addItem({
                  id: id,
                  imgurl: imgUrl.replace("img/", ""),
                  name: title,
                  count: 1,
                })
              );
            }}
            style={{ marginRight: "10px" }}
          >
            주문하기
          </Button>

          <Link to="/cart">
            <Button variant="outline-success"> 주문상품 확인하기 </Button>
          </Link>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => { setTap(0); }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => { setTap(1); }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => { setTap(2); }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tap={tap} />
    </div>
  );
}

function TabContent({ tap }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
