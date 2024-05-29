import React, { useState, useEffect, useContext } from "react";
import "./View.css";
import { PostContext } from "../../Store/PostContext";
import { Firebase } from "../../firebase/config"; // Import Firebase from config
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const firestore = getFirestore(); // Initialize Firestore
        const userRef = doc(firestore, "user", postDetails.userId); // Reference to the user document
        const docSnap = await getDoc(userRef); // Get the user document
        if (docSnap.exists()) {
          setUserDetails(docSnap.data()); // Set user details if document exists
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [postDetails.userId]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageURL} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
