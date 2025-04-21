import "./App.css";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import data from "./db/fruit";
import { useState } from "react";
import Products from "./components/Products";
import Detail from "./components/Detail";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Title from "./components/Title";
import Title2 from "./components/Title2";
import data2 from "./db/veggie";
import ComVeggie from "./components/ComVeggie";
import Footer from "./components/Footer";
import axios from "axios";
import Cart from "./components/Cart";

function App() {
  let [fruit, setFruit] = useState(data);
  // console.log(fruit[0].price);
  let navigate = useNavigate();
  let [veggie, setVeggie] = useState(data2);
  let [count, setCount] = useState(1);

  const sortByName = () => {
    let sortedFruit = [...fruit].sort((a, b) => (a.title > b.title ? 1 : -1));
    setFruit(sortedFruit);
  };

  const sortByPriceLowToHigh = () => {
    let sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit);
    console.log(sortedFruit)
  };

  const sortByPriceHighToLow = () => {
    let sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit);
  };
  return (
    <div className="App">
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">과일농장</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  navigate("/");
                }}
              >
                홈으로
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail/1");
                }}
              >
                상세페이지
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/cart");
                }}
              >
                장바구니
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/about");
                }}
              >
                회사소개
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* <Link to="/">홈</Link><br></br>
        <Link to="/detail">상세페이지</Link>  */}

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="slider"></div>
                <Title />
                <div class="container">
                  <div class="row">
                    <div style={{ textAlign: "center" }}>
                      <Button variant="outline-primary" onClick={sortByName}>
                        이름순 정렬
                      </Button>{" "}
                      <Button
                        variant="outline-secondary"
                        onClick={sortByPriceLowToHigh}
                      >
                        낮은가격순 정렬
                      </Button>{" "}
                      <Button
                        variant="outline-success"
                        onClick={sortByPriceHighToLow}
                      >
                        높은가격순 정렬
                      </Button>{" "}
                    </div>
                  </div>
                </div>
                <div className="container" style={{ marginTop: "30px" }}>
                  <div className="row">
                    {fruit.map((ele, i) => {
                      return (
                        <Products fruit={fruit[i]} i={i}  key={fruit[i].id} />
                        
                      );
                    })}
                  </div>
                </div>
                <div class="container">
                  <div class="row">
                    <div style={{ textAlign: "center" }}>
                      <Title2 />
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline-success"
                  count={count}
                  onClick={() => {
                    if (count == 1) {
                      axios
                        .get(
                          "https://dino-21.github.io/react_data/veggie2.json"
                        )
                        .then((result) => {
                          let copy10 = [...veggie, ...result.data];
                          setVeggie(copy10);
                          setCount(count + 1);
                        });
                    } else if (count == 2) {
                      axios
                        .get(
                          "https://dino-21.github.io/react_data/veggie3.json"
                        )
                        .then((result) => {
                          let copy11 = [...veggie, ...result.data];
                          setVeggie(copy11);
                          setCount(count + 1);
                        });
                    }

                    if (count === 3) {
                      alert("더이상 상품이 없습니다.");
                    }
                  }}
                >
                  {" "}
                  + 3개 상품 더 보기{" "}
                </Button>{" "}
                <div className="container" style={{ marginTop: "30px" }}>
                  <div className="row">
                    {veggie.map((ele, i) => {
                      return (
                        <ComVeggie veggie={veggie[i]} key={veggie[i].id} />
                      );
                    })}
                  </div>
                </div>
                <Footer />
              </div>
            }
          />

          <Route path="/detail/:paramId" element={<Detail fruit={fruit} />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<Member />} />
            <Route path="location" element={<Location />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

//app 아래, export default App; 위에

function About() {
  return (
    <>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </>
  );
}

function Member() {
  return (
    <>
      <h4>Member</h4>
    </>
  );
}

function Location() {
  return (
    <>
      <h4>Location</h4>
    </>
  );
}
export default App;
