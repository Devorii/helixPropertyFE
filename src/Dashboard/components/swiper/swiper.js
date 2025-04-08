// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './slide.css'
// Import Swiper styles
import 'swiper/css';
import SwipeIcon from '@mui/icons-material/Swipe';

const SwipersComp = ({ images }) => {
    return (
        <div className='slider-container'>
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                images.map((item) => {
                    return (
                    <SwiperSlide className='mobile-img-swiper-container'>
                        <SwipeIcon className='swipeIcon'/>
                        <img className="mobile-slide" src={item} alt={'test images'} />
                    </SwiperSlide>
                    )

                })
            }
        </Swiper>
        </div>

    );
};


export default SwipersComp;