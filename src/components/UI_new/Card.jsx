import { Children } from "react";

export default function Card({ name, description, pricing, content,children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6  hover:border hover:shadow-xl transition duration-300 ease-in-out">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}
