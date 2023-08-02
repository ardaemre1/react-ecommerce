import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Modal from 'react-modal';
import './home.css'
import ReactModalImage from 'react-modal-image';
import { useNavigate } from "react-router-dom"
import useSepetStore from './component/SepetStore'
import NavBar from './component/NavBar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {toast, ToastContainer} from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const sepetStore = useSepetStore();
  const sepet = useSepetStore((state) => state.sepet);

  const addProductToSepet = (product) => {
    const isProductInSepet = sepet.some((item) => item.id === product.id)
    if (!isProductInSepet) {
      sepetStore.addToSepet(product)
      toast.success("Ürün Sepete Başarılı Bir Şekilde Eklendi")
    }
  };

  const checkSepet = (product) => {
    return sepet.some((item) => item.id === product.id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://djangoappardaemrekarabacak.onrender.com/api/products/?format=json');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const splitPrice = (price) => {
    if (price.length >= 5 && price.length <= 6) {
      return price.slice(0) + ' ' + '₺';
    }
    if (price.length >= 6 && price.length <= 7) {
      return price.slice(0, 1) + '.' + price.slice(1, 4) + ' ' + '₺';
    }
    if (price.length >= 7 && price.length <= 8) {
      return price.slice(0, 2) + '.' + price.slice(1, 4) + ' ' + '₺';
    }
    if (price.length >= 8 && price.length <= 9) {
      return price.slice(0, 1) + '.' + price.slice(1, 4) + ' ' + '₺';
    }
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { scrollY } = useViewportScroll();
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};


const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.5 },
      y: { duration: 0.5 },
    },
  },
};

  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  const modalVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: "0%", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
  };

  const SepetNavigate = () => {
    navigate('/sepet')
  };

  // Kullanıcı oturum açma durumu için state ve işlev
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user); // Kullanıcı oturum açmışsa isUserLoggedIn true olacak
    });


    return () => unsubscribe();
  }, []);


  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <motion.div className='flex flex-col justify-center items-center' initial={{opacity:'0'}} animate={{opacity:'1'}}>
      <NavBar />
      {isUserLoggedIn ? (
        <>
          <div className='flex flex-wrap justify-center items-center'>
            {products.map((product) => (
              <motion.div initial="hidden"  animate="visible" variants={container} key={product.id} className='flex flex-col justify-center items-center rounded w-64 m-2.5 p-2.5 h-96' style={{ border: '3px solid #ccc' }}>
                <div className='h-4/6 w-full flex justify-center items-center'>
                  <ReactModalImage
                    small={product.images}
                    large={product.images}
                    alt={product.product_name}
                    className='w-fit h-48 bg-transparent	'
                    style={{ cursor: 'zoom-in' }}
                  />
                </div>
                <div className='h-2/6 flex flex-col justify-between items-center'>
                  <h3>{product.product_name}</h3>
                  <p>Price: {splitPrice(product.price)}</p>
                  <div className='flex justify-center items-center gap-4 flex-row'>
                    <button
                      disabled={checkSepet(product)}
                      onClick={() => addProductToSepet(product)}
                      className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded ${checkSepet(product) ? 'opacity-50' : ''}`}
                    >
                      Sepete Ekle
                    </button>
                    <button
                      onClick={() => showProductDetails(product)}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  border border-blue-500 hover:border-transparent rounded">
                      Detayları Göster
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                maxHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              },
            }}>
            {selectedProduct && (
              <motion.div variants={modalVariants} className='flex justify-between gap-9 items-center w-100'>
                <div className='w-5/12 h-100'>
                  <img src={selectedProduct.images}></img>
                </div>
                <div className='flex flex-col justify-end items-center w-7/12 gap-5 h-full'>
                  <h2>{selectedProduct.product_name}</h2>
                  <p>Brand: {selectedProduct.brand}</p>
                  <p>Price: {splitPrice(selectedProduct.price)}</p>
                  <p>Description: {selectedProduct.description}</p>
                  <p>Stock Status: {selectedProduct.stock_status ? 'In Stock' : 'Out of Stock'}</p>
                  <p>Stock Quantity: {selectedProduct.stock_quantity}</p>
                  <div className='flex flex-row gap-8'>
                    <button
                      disabled={checkSepet(selectedProduct)}
                      onClick={() => addProductToSepet(selectedProduct)}
                      className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded ${checkSepet(selectedProduct) ? 'opacity-50' : ''}`}
                    >
                      Sepete Ekle
                    </button>
                    <button onClick={closeModal} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white  border border-blue-500 hover:border-transparent rounded">Close</button>
                  </div>
                </div>
              </motion.div>
            )}
          </Modal>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center w-100 h-screen gap-4'>
          <p>Giriş Yapmadan Görmeye Çalışanlar Bizden Değildir...</p>
          <button className='border-2 rounded-md p-2 flex justify-center items-center' onClick={navigateToLogin}>Giriş Yap</button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>

  );
};

export default Home;
