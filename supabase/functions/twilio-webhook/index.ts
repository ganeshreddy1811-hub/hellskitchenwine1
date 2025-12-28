import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Parse form data from Twilio webhook
    const formData = await req.formData();
    const fromNumber = formData.get("From")?.toString() || "";
    const body = (formData.get("Body")?.toString() || "").trim().toUpperCase();
    const messageSid = formData.get("MessageSid")?.toString() || "";

    console.log(`Received webhook from ${fromNumber}: ${body}`);

    // Handle STOP/UNSUBSCRIBE requests
    if (body === "STOP" || body === "UNSUBSCRIBE" || body === "END" || body === "QUIT") {
      const { error } = await supabaseClient
        .from("customers")
        .update({ opted_out: true, updated_at: new Date().toISOString() })
        .eq("phone", fromNumber);

      if (error) {
        console.error("Error updating opt-out status:", error);
      } else {
        console.log(`Customer ${fromNumber} opted out`);
      }
    }

    // Handle START/SUBSCRIBE requests (opt back in)
    if (body === "START" || body === "SUBSCRIBE" || body === "YES") {
      const { error } = await supabaseClient
        .from("customers")
        .update({ opted_out: false, updated_at: new Date().toISOString() })
        .eq("phone", fromNumber);

      if (error) {
        console.error("Error updating opt-in status:", error);
      } else {
        console.log(`Customer ${fromNumber} opted back in`);
      }
    }

    // Return TwiML response
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: {
          "Content-Type": "text/xml",
        },
      }
    );
  } catch (error: any) {
    console.error("Webhook error:", error);
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: {
          "Content-Type": "text/xml",
        },
      }
    );
  }
});