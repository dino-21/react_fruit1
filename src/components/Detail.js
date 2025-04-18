import React from "react";
import {useState} from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import { useEffect } from "react";
import { addItem } from '../store.js'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import styled from 'styled-components'


let Box = styled.div`
  padding : 20px;
  color : gray;
`;

let YellowBtn = styled.button`
  color : white;
  font-size:30px;
  width:100%;
  padding : 100px 100px;
  border:1px solid #ccc;
  background-image:url("../img/banner.jpg");
  background-size:cover;
  background-position:center;
`;

const Detail = (props) => {
    let { paramId} = useParams(); // 이름을 paramId로 변경
    let [tap, setTap] = useState(0);   
     console.log(paramId );
    // console.log(Number(paramId)+1);

    let [fade2, setFade2] = useState('')
    useEffect(()=>{
      setFade2('end')
      return ()=>{
        setFade2('')
      }
    },[])


// 내가 선택한 상품이 shoes.js 안에 있는 상품인지 유효성체크 후 데이터를 가져 옴
let selproduct = props.fruit.find((x) => x.id == paramId);
const { id, imgUrl, title, content, price } = selproduct;
let dispatch = useDispatch();

  return (
    <div className={'container start ' + fade2}>

      <Box>
          <YellowBtn>과일농장의 맛과 건강을 선물하세요.</YellowBtn>
      </Box>


      <div className="row">
        <div className="col-md-6">
        <img src={'/'+selproduct.imgUrl}  alt={title} width="80%" />
        </div>
        <div className="col-md-6">
        <h4 className="pt-5">{selproduct.title}</h4>
        <p>{selproduct.content}</p>
        <p>{selproduct.price}</p>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(
              addItem({
                id,
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

      <br></br>

      <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link  onClick={()=>{ setTap(0) }} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{ setTap(1) }} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  onClick={()=>{ setTap(2) }} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
      </Nav>

 
      <TabContent tap={tap}/>
    </div>
  );
};


function TabContent({tap}){
  let [fade, setFade] = useState('')
   useEffect( ()=>{
    setTimeout(()=>{ setFade('end')},10)
    return ()=>{
        setFade('')
    }
   } ,[tap])

  return (
    <div className={'start ' + fade}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap] }
    </div>
  )
}

export default Detail;
