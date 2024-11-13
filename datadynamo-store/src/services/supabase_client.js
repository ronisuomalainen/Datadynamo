import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://diytkaysbvpowajpaies.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeXRrYXlzYnZwb3dhanBhaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjAxNDAsImV4cCI6MjA0Njg5NjE0MH0.pNt_VUL56SUxgfpgf5JsDBimsWJZUPLiN2WUNxq7npI"
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function addUserToDb(username, email, password) {
  if (!username) {
    alert("Käyttäjänimi tarvitaan")
    return
  }

  if (!email) {
    alert('Sähköposti tarvitaan')
    return
  }

  if (!password) {
    alert("Salasana tarvitaan")
    return
  }

  const { user, error } = await supabase.auth.signUp({
    username: username,
    email: email,
    password: password
  })

  if (error) {
    alert("Tapahtui virhe: " + error.message)
    return
  }

  console.log(user)
  return user
}