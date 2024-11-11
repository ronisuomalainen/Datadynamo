
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = /*tähä om url*/"";
const supabaseKey = /*tähä apikey*/"";
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