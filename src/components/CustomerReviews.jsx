import { useEffect, useState } from "react";
import api from "../utils/api";

function CustomerReviews() {

  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    try {

      const response = await api.get("/reviews");

      setReviews(response.data);

    } catch (err) {

      console.log("Error loading reviews:", err);

    }
  }

  async function addReview() {

    if (name === "" || review === "") {
      alert("Please fill all fields");
      return;
    }

    try {

      await api.post("/reviews", {
        name: name,
        rating: rating,
        review: review
      });

      alert("Review added successfully");

      setName("");
      setReview("");
      setRating(5);

      getReviews();

    } catch (err) {

      console.log("Error adding review:", err);

      alert("Failed to add review");

    }
  }

  return (
    <section className="py-12 px-5">

      <h2 className="text-3xl font-bold text-center mb-3">
        Customer Reviews
      </h2>

      <p className="text-center mb-8">
        What our customers say about Dynamatic Technologies
      </p>


      {/* Reviews */}

      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">

        {reviews.map((item) => (

          <div
            key={item._id}
            className="border rounded-lg p-5 shadow-sm"
          >

            <h3 className="font-bold text-lg">
              {item.name}
            </h3>

            <div className="flex gap-1 my-2">

              {[1, 2, 3, 4, 5].map((star) => (

                <span
                  key={star}
                  className={
                    star <= item.rating
                      ? "text-yellow-400 text-xl"
                      : "text-gray-300 text-xl"
                  }
                >
                  ★
                </span>

              ))}

            </div>

            <p>
              "{item.review}"
            </p>

          </div>

        ))}

      </div>


      {/* Add Review */}

      <div className="max-w-xl mx-auto mt-10">

        <h3 className="text-xl font-bold mb-4">
          Leave a Review
        </h3>


        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-3 mb-3"
        />


        {/* Clickable Stars */}

        <div className="mb-4">

          <p className="mb-2 font-medium">
            Your Rating
          </p>

          <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>

            ))}

          </div>

        </div>


        <textarea
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full border rounded p-3 mb-3"
          rows="4"
        />

        <div className="flex justify-center">
        <button
          onClick={addReview}
          className="bg-black text-white text-center px-5 py-2 rounded"
        >
          Submit Review
        </button>
        </div>
      </div>

    </section>
  );
}

export default CustomerReviews;