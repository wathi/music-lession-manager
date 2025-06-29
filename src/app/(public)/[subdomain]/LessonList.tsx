'use client';

import { useCart } from '@/app/hook/useCart';

type Lesson = {
  id: string;
  name: string;
  price: number;
};

export default function LessonsList({
  lessons,
  subdomain,
}: {
  lessons: Lesson[];
  subdomain: subdomain;
}) {
  const { cart, addToCart, removeFromCart, clearCart, getTotal } = useCart();

  return (
    <>
      <div className="mb-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-gray-300 m-4 p-4 rounded-md shadow-md"
          >
            <div>{lesson.name}</div>
            <div>£{lesson.price}</div>
            <button
              onClick={() => addToCart(lesson)}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <h2 className="mt-6 text-xl font-bold">Cart:</h2>
      {cart.length === 0 ? (
        <div className="text-gray-600 mt-2">Cart is empty</div>
      ) : (
        <div className="space-y-4 mt-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div>
                {item.name} – {item.price ? `£${item.price}` : 'Free'}
              </div>
              <div>{item.quantity}</div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="font-bold">Total: £{getTotal().toFixed(2)} </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
}
