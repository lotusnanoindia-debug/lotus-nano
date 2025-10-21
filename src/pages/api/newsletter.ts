import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const supabaseUrl = 'https://wehselpjsvikndrdtzbe.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlaHNlbHBqc3Zpa25kcmR0emJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NTg4ODksImV4cCI6MjA3MjQzNDg4OX0.NLpa5HBHtRxxnV3aM_IPkmVhGtgUy8r_5viUjqzPOx0';

const supabase = createClient(supabaseUrl, supabaseKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, source, honeypot, timestamp } = body;

    // Honeypot check
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Timing check
    const timeDiff = (Date.now() - timestamp) / 1000;
    if (timeDiff < 2 || timeDiff > 300) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Insert to Supabase
    const { error } = await supabase
      .from('lotus_nano_newsletters')
      .insert([{ email: email.toLowerCase(), source }]);

    if (error) {
      console.error('Supabase error:', error);

      // Check if it's specifically a duplicate key violation
      if (
        error.code === '23505' &&
        error.message.includes('lotus_nano_newsletters_email_source_key')
      ) {
        return new Response(
          JSON.stringify({
            error: 'already_subscribed',
            message: `You're already subscribed to ${source === 'Intel' ? 'Intelligence updates' : 'our newsletter'}!`,
          }),
          { status: 400 }
        );
      }

      // Other errors
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return new Response(
      JSON.stringify({
        error: 'server_error',
        message: 'Something went wrong. Please try again.',
      }),
      { status: 500 }
    );
  }
};
