import React,{useState,useEffect,useContext} from 'react';
import {useNavigate} from "react-router-dom"

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Posts() {
const {Firebase} = useContext(FirebaseContext);
const [products,setProducts] = useState([]);
const {setPostDetails} = useContext(PostContext)
const navigate = useNavigate();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const firestore = getFirestore(); // Initialize Firestore
      const productRef = collection(firestore, 'products'); // Get reference to 'products' collection
      const snapshot = await getDocs(productRef); // Get all documents from 'products' collection
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, [Firebase]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div  className="cards">
        {
          products.map((product)=>{
            return(
            <div onClick={()=>{
              setPostDetails(product);
              navigate("/view")

            }} className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageURL} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
            )
          })
          }
        </div>
      </div>
     
    </div>
  );
}

export default Posts;
