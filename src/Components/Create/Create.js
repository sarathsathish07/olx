import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext,FirebaseContext } from '../../Store/Context';
import {useNavigate} from "react-router-dom"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const Create = () => {


  const [name,setName]= useState('');
  const [category,setCategory]= useState('');
  const [price,setPrice] = useState('');
  const [image,setImage]= useState(null);
  const {user} = useContext(AuthContext);
  const {Firebase} = useContext(FirebaseContext);
  const date = new Date()
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const storage = getStorage(Firebase); // Initialize storage
      const storageRef = ref(storage, `/image/${image.name}`); // Reference to storage location

      // Upload image to storage
      await uploadBytes(storageRef, image);

      // Get download URL of uploaded image
      const imageURL = await getDownloadURL(storageRef);

      const firestore = getFirestore(); // Initialize firestore
      const productsCollectionRef = collection(firestore, 'products'); // Reference to 'products' collection

      // Add product data to firestore
      await addDoc(productsCollectionRef, {
        name,
        category,
        price,
        imageURL,
        userId: user.uid,
        createdAt: date.toDateString(),
      });

      navigate('/'); // Navigate to home page after successful submission
    } catch (error) {
      console.error('Error uploading image and adding product:', error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
         
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
