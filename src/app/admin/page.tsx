// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  gender: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        setProducts(data.products || data); // Handle both structures
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Add product
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !gender || !price || !image) {
      alert("Please fill all required fields");
      return;
    }

    setIsAdding(true);

    try {
      const res = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender,
          price: parseFloat(price),
          oldPrice: oldPrice ? parseFloat(oldPrice) : null,
          image,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add product");
      }

      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct.data[0]]);
      setName("");
      setGender("");
      setPrice("");
      setOldPrice("");
      setImage("");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsAdding(false);
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch("/api/admin/delete-product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Old Price ($)</label>
                    <input
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      value={oldPrice}
                      onChange={(e) => setOldPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    placeholder="https://example.com/image.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAdding}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAdding ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {products.length} products
                </span>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products yet</h3>
                  <p className="text-gray-500">Add your first product using the form</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-white bg-opacity-80 text-xs font-medium px-2 py-1 rounded-full capitalize">
                            {product.gender}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                        <div className="flex items-center mt-2">
                          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                          {product.oldPrice && (
                            <span className="ml-2 text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xs text-gray-500">ID: {product.id}</span>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
