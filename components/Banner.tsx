import React from 'react'
import BannerImage from "../public/images/BannerImage.jpg"
import  Image  from 'next/image';

function Banner() {
  return (
    <div className="">
        <Image
        height={0}
        width={0} 
        src={BannerImage} 
        alt=""
        className="h-auto w-full object-cover"
        />
    </div>
  )
}

export default Banner
