import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://diytkaysbvpowajpaies.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeXRrYXlzYnZwb3dhanBhaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjAxNDAsImV4cCI6MjA0Njg5NjE0MH0.pNt_VUL56SUxgfpgf5JsDBimsWJZUPLiN2WUNxq7npI"
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function addUserToDb(email, password) {
  if (!email) {
    alert('Sähköposti tarvitaan')
    return
  }

  if (!password) {
    alert("Salasana tarvitaan")
    return
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      console.error("Supabase error:", error)
      alert("Tapahtui virhe: " + error.message)
      return null
    }

    console.log("User data:", data)
    return data.user
  } catch (error) {
    console.error("Unexpected error:", error)
    alert("Odottamaton virhe: " + error.message)
    return null
  }
}

export async function loginUser(username, password) {
  if (!username || !password) {
    alert("Käyttäjätunnus ja salasana vaaditaan")
    return
  }

  const { user, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  })

  if (error) {
     alert("Tapahtui virhe: " + error.message)
     return
  }

  console.log(user)
  return user
}