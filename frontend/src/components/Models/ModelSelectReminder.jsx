import React from "react";
import { Button } from "../ui/Buttons";
import { useNavigate } from "react-router-dom";

export default function ModelsSelectReminder() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          NO DATA AVAILABLE
        </h3>
        <p className="text-gray-500 mb-4">
          You need to select a model first.
        </p>
      </div>
      <Button variant="primary" onSelect={() => navigate("/models")}> Select Model </Button>

    </div>
  );
}