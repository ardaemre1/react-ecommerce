import React, { useState, useEffect } from 'react';
import useSepetStore from '../component/SepetStore';
import NavBar from '../component/NavBar';
import { RiAddFill, RiSubtractFill, RiDeleteBin6Line } from 'react-icons/ri';

const Sepet = () => {
  const sepetStore = useSepetStore();
  const sepet = sepetStore.sepet;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Sepetteki ürünlerin fiyatlarını topla
    const total = sepet.reduce((acc, item) => acc + calculateItemPrice(item), 0);
    setTotalPrice(total);
  }, [sepet]);

  const calculateItemPrice = (item) => {
    return parseFloat(item.price) * item.counter;
  };

  const increaseQuantity = (item) => {
    const newCounter = item.counter + 1;
    sepetStore.updateCounter(item.id, newCounter);
    setTotalPrice((prevTotal) => prevTotal + parseFloat(item.price));
  };

  const decreaseQuantity = (item) => {
    if (item.counter > 1) {
      const newCounter = Math.max(item.counter - 1, 1);
      sepetStore.updateCounter(item.id, newCounter);
      setTotalPrice((prevTotal) => prevTotal - parseFloat(item.price));
    } else {
      console.log("Çıkarma Olamaz");
    }
  };

  return (
    <div className='flex flex-col justify-around items-center w-100 h-100'>
      <NavBar />
      {sepet.map((item) => (
        <div
          key={item.id}
          className='flex justify-around flex-row items-center gap-5 mt-7 p-4 w-3/4 rounded-2xl'
          style={{ border: '2px solid black' }}
        >
          <div className='w-1/6 flex justify-start items-center gap-2'>
            <img className='w-fit h-48' src={item.images} alt={item.product_name} />
          </div>
          <div className='flex gap-5 w-5/6 justify-center flex-wrap items-center '>
            <h3>{item.product_name}</h3>
            <p>Price: {calculateItemPrice(item)}</p>
            <RiDeleteBin6Line
              className='w-8 h-8 cursor-pointer'
              onClick={() => sepetStore.removeFromSepet(item.id)}
            />
            <div className='flex gap-4'>
              <RiSubtractFill
                className='w-6 h-6 cursor-pointer'
                onClick={() => decreaseQuantity(item)}
              />
              {item.counter}
              <RiAddFill className='w-6 h-6 cursor-pointer' onClick={() => increaseQuantity(item)} />
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => sepetStore.clearSepet()}>Sepeti Temizle</button>
      <p>Toplam Fiyat : {totalPrice}</p>
    </div>
  );
};

export default Sepet;
