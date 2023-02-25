import React from 'react';
import Link from 'next/link'
import {urlFor} from '../lib/Client'

interface iProps {
    product:{
        image:string;
        name:string;
        slug:any;
        price:number
    }
}
const Product:React.FC<iProps> = ({product:{image,name,slug,price}}) => {
    const imageUrl=urlFor(image && image[0]).toString() || ""
    return (
        <>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                <img src={imageUrl? imageUrl :""} alt="" width={250} height={250} className="product-image"/>
                <p className="product-name">{name}</p>
                <p className="product-price">${price}</p>
                </div>
            </Link>
        </>
    );
};

export default Product;