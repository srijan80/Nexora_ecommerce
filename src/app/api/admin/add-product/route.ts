import { supabase } from "@/lib/supabase"; // Fixed import path

export async function POST(req: Request) {
  console.log("API route hit!"); // Add this to confirm the route is being called
  
  try {
    const body = await req.json();
    const { name, gender, price, oldPrice, image } = body;
    
    console.log("Received data:", { name, gender, price, oldPrice, image });

    const { data, error } = await supabase
      .from("products") // Make sure this matches your table name exactly
      .insert([{ name, gender, price, old_price: oldPrice, image }]);

    if (error) {
      console.error("Supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("Successfully inserted:", data);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}