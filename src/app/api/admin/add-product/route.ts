//app/api/admin/add-product/route.ts
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  console.log("API route hit!");
  
  try {
    const body = await req.json();
    const { name, gender, price, oldPrice, image } = body;
    
    console.log("Received data:", { name, gender, price, oldPrice, image });

    const now = new Date().toISOString();

    // Proceed with insert
    const insertResult = await supabase
      .from("Product")
      .insert([
        { 
          name, 
          gender, 
          price: parseFloat(price), 
          oldPrice: oldPrice ? parseFloat(oldPrice) : null, 
          image,
          createdAt: now,
          updatedAt: now
        }
      ])
      .select();
    
    console.log("Insert result:", insertResult);

    if (insertResult.error) {
      console.error("Insert error details:", {
        message: insertResult.error.message,
        details: insertResult.error.details,
        hint: insertResult.error.hint,
        code: insertResult.error.code
      });
      
      return new Response(
        JSON.stringify({ 
          error: insertResult.error.message,
          details: insertResult.error.details,
          hint: insertResult.error.hint,
          code: insertResult.error.code 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: insertResult.data,
        status: "Insert successful" 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (err: any) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ 
        error: err.message,
        type: "Unexpected error"
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// src/app/api/admin/add-product/route.ts (update the GET method)
export async function GET(req: Request) {
  console.log("Get products API route hit!");
  
  try {
    // Fetch all products from database
    const selectResult = await supabase
      .from("Product")
      .select("*")
      .order('createdAt', { ascending: false }); // Order by newest first
    
    console.log("Select result:", selectResult);

    if (selectResult.error) {
      console.error("Select error details:", {
        message: selectResult.error.message,
        details: selectResult.error.details,
        hint: selectResult.error.hint,
        code: selectResult.error.code
      });
      
      return new Response(
        JSON.stringify({ 
          error: selectResult.error.message,
          details: selectResult.error.details,
          hint: selectResult.error.hint,
          code: selectResult.error.code 
        }), 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: selectResult.data || [],
        status: "Fetch successful" 
      }), 
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );

  } catch (err: any) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ 
        error: err.message,
        type: "Unexpected error"
      }), 
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}