
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://diytkaysbvpowajpaies.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeXRrYXlzYnZwb3dhanBhaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjAxNDAsImV4cCI6MjA0Njg5NjE0MH0.pNt_VUL56SUxgfpgf5JsDBimsWJZUPLiN2WUNxq7npI";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function addPointsToDb(nickname, points) {
  if (!nickname) {
    alert("käyttäjänimi tarvitaan");
    return;
  }

  const { data, error } = await supabase.from('ranking').insert([
    {
      nickname: nickname,
      points: points
    }
  ]).select();

  if (error) {
    alert("tapahtui virhe: " + error.message);
    return;
  }

  console.log(data);
  return data && data[0];
}