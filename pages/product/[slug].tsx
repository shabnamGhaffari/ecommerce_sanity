import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import {client, urlFor} from "../../lib/Client";
import {Product} from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, increaseQty, showCart } from "../../redux/CartSlice";
interface iProps {
  product: {
    image: string[];
    name: string;
    details: string;
    price: number;
  };
  products: any[];
}
const ProductDetails: React.FC<iProps> = ({products, product}) => {
  const {image, name, details, price} = product;
  const[index,setIndex]=useState(0);
  const dispatch=useDispatch();
  const cartState=useSelector(state=>state)
  const quantity=cartState.cartReducer.qty
  const add=()=>{
    dispatch(addToCart({product,quantity}))
  }
  const imageUrl = urlFor(image && image[index]).toString();
  const handleBuyNow=()=>{
    dispatch(addToCart({product,quantity}))
    dispatch((showCart()))
  }
  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={imageUrl} alt="" className="product-detail-image"/>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item).toString()}
                className={i===index? 'selected-image small-image' :'small-image'}
                onMouseEnter={()=>{setIndex(i)}}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={()=>dispatch(decreaseQty())}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {cartState.cartReducer.qty}
              </span>
              <span className="plus"  onClick={()=>dispatch(increaseQty())}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={add}>
              Add To Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map(item => (
              <Product product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type=="product"]{
        slug{
            current
        }
    }
    `;
  const products = await client.fetch(query);

  const paths = products?.map((product: any) => ({
    params: {slug: product.slug.current},
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({params: {slug}}: any) => {
  const query = `*[_type=="product" && slug.current=='${slug}'][0]`;
  const productsQuery = `*[_type=="product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      products,
      product,
    },
    revalidate: 5000,
  };
};
export default ProductDetails;
