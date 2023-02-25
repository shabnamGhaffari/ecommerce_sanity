import React from 'react';
import Link from 'next/link'
import {urlFor} from '../lib/Client'


interface iProps{
    footerBanner:{
        discount:number;
        largeText1:string;
        largeText2:string;
        saleTime:any;
        smallText:string;
        midText:string;
        product:string;
        buttonText:string;
        image:string;
        desc:string
    }
}
const FooterBanner:React.FC<iProps> = ({footerBanner:{discount,largeText1,largeText2,saleTime,smallText,midText,product,buttonText,image,desc}}) => {
  const imageUrl=urlFor(image).toString()
    return (
        <div className='footer-banner-container'>
            <div className="banner-desc">
                <div className="left">
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smallText}</p>
                    <h3>{midText}</h3>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type="button">{buttonText}</button>
                    </Link>
                </div>
                <img src={imageUrl} alt="" className='footer-banner-image'/>
            </div>
            FooterBanner
        </div>
    );
};

export default FooterBanner;