import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://diytkaysbvpowajpaies.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeXRrYXlzYnZwb3dhanBhaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjAxNDAsImV4cCI6MjA0Njg5NjE0MH0.pNt_VUL56SUxgfpgf5JsDBimsWJZUPLiN2WUNxq7npI";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function addUserToDb(username, password) {
  if (!username) {
    alert("Käyttäjänimi tarvitaan");
    return;
  }

  const { data, error } = await supabase.from('users').insert([
    {
      username: username,
      password: password
    }
  ]).select();

  if (error) {
    alert("Tapahtui virhe: " + error.message);
    return;
  }

  console.log(data);
  return data && data[0];
}