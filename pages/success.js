import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {BsBagCheckFill} from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { emptyCart,  zeroTotalPrice, zeroTotalQuantities } from "../redux/CartSlice";
import {RunFireworks, runFireworks} from '../lib/utils';
const Success = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
            dispatch(emptyCart());
            dispatch(zeroTotalPrice());
            dispatch(zeroTotalQuantities());
           
    },[])
    return (
        <div className='success-wrapper'>
            <div className='success'>
            <RunFireworks/>
                <p className='icon'><BsBagCheckFill/></p>
                <h2>Thank you for your order!</h2>
                <p className='email-msg'>Check your email inbox for the receipt!</p>
                <p className='description'>
                    If you have any questions,please email
                    <a className='email' href="mailto:shabnam.ghafari@gmail.com">shabnam.ghafari@gmail.com</a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className='btn'>Continue Shopping</button>
                </Link>
            </div>
        </div>
    );
};

export default Success;