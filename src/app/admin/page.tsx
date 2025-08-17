"use client";
import { useState } from "react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate data before sending
      if (!name || !gender || !price || !image) {
        throw new Error("Please fill all required fields");
      }

      const productData = {
        name,
        gender,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        image,
      };

      console.log("Sending data:", productData); // Debug log

      const res = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add cache control to prevent caching
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        // Try to get error details from response
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        alert("Product added successfully!");
        // Clear form
        setName("");
        setGender("");
        setPrice("");
        setOldPrice("");
        setImage("");
      } else {
        throw new Error(data.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert(error instanceof Error ? error.message : "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-5">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          placeholder="Old Price (optional)"
          type="number"
          step="0.01"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 mt-3 disabled:bg-gray-400"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}