import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Render Backend URL
  const BASE_URL = "https://book-del-backend.onrender.com";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/book`);
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      
      {/* Header */}
      <div className="mt-28 text-center">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you{" "}
          <span className="text-pink-500">Here! :)</span>
        </h1>

        <p className="mt-12">
          Explore our collection of amazing books and enhance your knowledge.
        </p>

        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Books Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {loading ? (
          <p className="text-center col-span-4">Loading books...</p>
        ) : book.length === 0 ? (
          <p className="text-center col-span-4">No books available</p>
        ) : (
          book.map((item) => (
            <Cards key={item._id} item={item} />
          ))
        )}
        
      </div>
    </div>
  );
}

export default Course;