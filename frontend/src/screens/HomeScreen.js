import { useEffect, useReducer } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  ListGroup,
} from "react-bootstrap";
import img3 from "../Home_Page_Images/home_page_3.jpg";
import img4 from "../Home_Page_Images/home_page_4.jpg";
import img5 from "../State_Images/pune_map.PNG";
import img6 from "../State_Images/kashmir.PNG";
import img7 from "../State_Images/delhi.PNG";
import img8 from "../State_Images/west bengal.PNG";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    initialSlide: 0,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var settings1 = {
    dots: false,
    infinite: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: false,
    prevArrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <div>
        <Slider className="slider3" {...settings1}>
          <div>
            <img src={img3} height="400px" width="100%" alt="img3"></img>
          </div>
          <div>
            <img src={img4} height="400px" width="100%" alt="img4"></img>
          </div>
        </Slider>
      </div>
      <Container>
        <h1 className="allign-centre">Whats Hot!</h1>
        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              <div className="slide-bk">
                <Slider className="slider1" {...settings}>
                  {products.map((product) => {
                    if (product.mode === "best seller") {
                      return <Product product={product}></Product>;
                    }
                  })}
                </Slider>
              </div>
            </Row>
          )}
        </div>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="view_all_button">
              <Button
                onClick={() => {
                  navigate("/bestsellerproducts");
                }}
                variant="primary"
                className="view_all"
              >
                View all
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>

        <div className="shop_by_state">
          <h1 className="allign-centre">Shop by state</h1>
          <Row>
            <Col>
              <Card className="card-product">
                <Link to={"/state/pune"}>
                  <Card.Body>
                    <img
                      src={img5}
                      height="200px"
                      width="100%"
                      alt="img5"
                    ></img>
                    <Card.Title>Pune</Card.Title>
                    <Card.Text>Items of pune</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="card-product">
                <Link to={"/state/kashmir"}>
                  <Card.Body>
                    <img
                      src={img6}
                      height="200px"
                      width="100%"
                      alt="img6"
                    ></img>
                    <Card.Title>Kashmir</Card.Title>
                    <Card.Text>Items of kashmir</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="card-product">
                <Link to={"/state/delhi"}>
                  <Card.Body>
                    <img
                      src={img7}
                      height="200px"
                      width="100%"
                      alt="img7"
                    ></img>
                    <Card.Title>Delhi</Card.Title>
                    <Card.Text>Delhi</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="card-product">
                <Link to={"/state/west bengal"}>
                  <Card.Body>
                    <img
                      src={img8}
                      height="200px"
                      width="100%"
                      alt="img8"
                    ></img>
                    <Card.Title>West Bengal</Card.Title>
                    <Card.Text>West Bengal</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
        <h1 className="allign-centre">New arrival</h1>
        <div className="products">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              <div className="slide-bk">
                <Slider className="slider1" {...settings}>
                  {products.map((product) => {
                    if (product.mode === "new arrival") {
                      return <Product product={product}></Product>;
                    }
                  })}
                </Slider>
              </div>
            </Row>
          )}
        </div>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="view_all_button">
              <Button
                onClick={() => {
                  navigate("/newarrivalproducts");
                }}
                variant="primary"
                className="view_all"
              >
                View all
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
}
export default HomeScreen;
