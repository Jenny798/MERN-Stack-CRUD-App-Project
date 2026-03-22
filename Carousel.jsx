import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="mb-5">
      <Slider {...settings}>
        <div>
          <img
            src="https://via.placeholder.com/1200x300"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;