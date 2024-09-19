//@ts-nocheck
import { ImagePath } from "@/Constants";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Col } from "reactstrap";

const ProductDetailSlider = ({images}) => {
  const [nav, setNav] = useState({
    nav1: null,
    nav2: null,
  });
  useEffect(() => {
    setNav({
      nav1: Slider.slider1,
      nav2: Slider.slider2,
    });
  }, []);
  return (
    <Col xl="4">
      <Slider asNavFor={nav.nav2} ref={(slider) => (Slider.slider1 = slider)} className="product-slider no-arrow">
          {images&&images.length>0&&images.map((res, i) => (
              <div className="item">
                  <img className="img-fluid" src={`${res.image_url}`} alt="" />
              </div>
              ))}

      </Slider>
        {
            images.length>1?
                <Slider asNavFor={nav.nav1} ref={(slider) => (Slider.slider2 = slider)} slidesToShow={images.length} swipeToSlide={true} focusOnSelect={true} className="small-slick">
                    {images&&images.length>0&&images.map((res, i) => (
                        <div className="item">
                            <img className="img-fluid" src={`${res.image_url}`} alt="" />
                        </div>
                    ))}

                </Slider>
                :''
        }

    </Col>
  );
};

export default ProductDetailSlider;
