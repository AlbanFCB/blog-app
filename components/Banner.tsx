import React from 'react'
import BannerImage from '../public/images/BannerImage.jpg'
import  Image  from 'next/image';

function Banner() {
  return (
    <div className="">
        <Image 
        src={BannerImage} 
        alt=""
        className="h-60 object-cover"
        />
    </div>
  )
}

export default Banner
