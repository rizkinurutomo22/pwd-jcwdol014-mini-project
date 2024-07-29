'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewPage = () => {
  const params = useParams();
  const { id } = params;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingClick = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleSubmit = async () => {
    if (rating === 0 || review === '') {
      setError('Please provide a rating and review.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/review', {
        event_id: Number(id),
        reviewed_by: 1,
        rating,
        review,
        suggestions,
      });

      setSuccess('Review submitted successfully!');
      setError('');
      setRating(0);
      setReview('');
      setSuggestions('');
      // alert('Review submitted successfully!');
    } catch (error) {
      setError('Error submitting review. Please try again later.');
      setSuccess('');
      // alert('Failed to post review. Please try again later');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="mb-6 text-3xl font-bold">Event Reviews and Ratings</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}
      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold">Rating:</label>
        <div className="mb-6 flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              size="2x"
              className={`cursor-pointer ${
                rating >= star ? 'text-yellow-500' : 'text-gray-300'
              }`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="review" className="mb-2 block text-lg font-semibold">
          Review:
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="mb-6 mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="suggestions"
          className="mb-2 block text-lg font-semibold"
        >
          Suggestions for Improvement:
        </label>
        <textarea
          id="suggestions"
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
        ></textarea>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-purple-600 px-6 py-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-500"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewPage;
