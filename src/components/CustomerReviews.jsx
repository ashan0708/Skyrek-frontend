import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

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
    if (!name.trim() || !review.trim()) {
      toast.error("Please enter your name and review");
      return;
    }

    setLoading(true);

    try {
      await api.post("/reviews", {
        name: name.trim(),
        review: review.trim(),
        rating: rating,
      });

      toast.success("Review added successfully");

      setName("");
      setReview("");
      setRating(5);
      setHoverRating(0);

      await getReviews();

    } catch (err) {
      console.log("Error adding review:", err);

      toast.error(
        err.response?.data?.message || "Failed to add review"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 px-5 bg-gray-50">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-2">
          Customer Feedback
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h2>

        <p className="text-gray-500 mt-3">
          We value our customers' feedback. See what they have to say
          about their experience with Dynamatic Technologies.
        </p>

      </div>

      {/* Reviews */}
      {reviews.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {reviews.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 border border-gray-100"
            >

              {/* Customer */}
              <div className="flex items-center gap-3 mb-4">

                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {item.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-400">
                    Verified Customer
                  </p>
                </div>

              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">

                {[1, 2, 3, 4, 5].map((star) => (

                  <span
                    key={star}
                    className={
                      star <= item.rating
                        ? "text-yellow-400 text-lg"
                        : "text-gray-200 text-lg"
                    }
                  >
                    ★
                  </span>

                ))}

              </div>

              {/* Review */}
              <p className="text-gray-600 leading-relaxed">
                "{item.review}"
              </p>

            </div>

          ))}

        </div>

      ) : (

        <div className="text-center py-10 text-gray-400">
          <p>
            No reviews yet. Be the first customer to leave a review!
          </p>
        </div>

      )}

      {/* Add Review */}
      <div className="max-w-2xl mx-auto mt-16">

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">

          <div className="text-center mb-7">

            <h3 className="text-2xl font-bold text-gray-900">
              Leave a Review
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Share your experience with Dynamatic Technologies
            </p>

          </div>

          {/* Name */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

          </div>

          {/* Rating */}
          <div className="mb-5">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>

            <div className="flex items-center gap-1">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-4xl focus:outline-none transition-transform hover:scale-110"
                >
                  <span
                    className={
                      star <= (hoverRating || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                </button>

              ))}

              <span className="ml-3 text-sm text-gray-500">
                {rating} / 5
              </span>

            </div>

          </div>

          {/* Review */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>

            <textarea
              placeholder="Tell us about your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="5"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

          </div>

          {/* Submit */}
          <button
            onClick={addReview}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default CustomerReviews;