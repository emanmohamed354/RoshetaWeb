import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import img1 from '../../images/slider1.jpg';
import img2 from '../../images/slider2.jpg';
import img3 from '../../images/slider3.jpg'; 
import img4 from '../../images/slider4.jpg';
import img6 from '../../images/slider6.webp';

import Styles from './slider.module.scss';

function Slider() {
  return (
    // <Container className={Styles.container}>
    <div className={Styles.container}>
      <Carousel>
        <Carousel.Item>
          <img
            src={img1}
            alt="First slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
         <Carousel.Item>
          <img
            src={img2}
            alt="Second slide"
            className={Styles.sliders}
          />
        </Carousel.Item> 
        <Carousel.Item>
          <img
            src={img3}
            alt="Third slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
         <Carousel.Item>
          <img
            src={img4}
            alt="Fourth slide"
            className={Styles.sliders}
          />
        </Carousel.Item> 
        <Carousel.Item>
          <img
            src={img6}
            alt="sixth slide"
            className={Styles.sliders}
          />
        </Carousel.Item>
       
      </Carousel>
      </div>
    // </Container>


  );
}

export default Slider;
