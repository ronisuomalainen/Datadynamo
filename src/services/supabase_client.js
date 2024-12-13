import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://diytkaysbvpowajpaies.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeXRrYXlzYnZwb3dhanBhaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjAxNDAsImV4cCI6MjA0Njg5NjE0MH0.pNt_VUL56SUxgfpgf5JsDBimsWJZUPLiN2WUNxq7npI';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase configuration');
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

const sendGridApiKey = import.meta.env.VITE_SENDGRID_API_KEY;

if (!sendGridApiKey) {
  console.error('Missing SendGrid API key. Check your environment variables.');
}

export async function addUserToDb(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Supabase error:', error);
      return { error: error.message };
    }

    console.log('User registered:', data);
    return { user: data.user };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return { error: error.message };
    }

    console.log('User logged in successfully:', session.user);
    return session.user;
  } catch (error) {
    console.error('Unexpected login error:', error);
    return { error: error.message };
  }
}

export async function updateUserEmail(newEmail) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'Käyttäjää ei tunnistettu' };
    }

    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      console.error('Email update error: ', error);
      return { error: error.message };
    }

    console.log(
      'Email updated successfully, please check your inbox for verification.'
    );
    return {
      success:
        'Sähköposti vaihdettu, tarkista postilaatikkosi vahvistuslinkkiä varten.',
    };
  } catch (error) {
    console.error('Unexpected error: ', error);
    return { error: error.message };
  }
}

export async function updateUserPassword(newPassword, currentPassword) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'Käyttäjää ei tunnistettu' };
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (loginError) {
      console.error('Old password is incorrect:', loginError);
      return { error: 'Vanha salasana on virheellinen.' };
    }

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (passwordError) {
      console.error('Password update error:', passwordError);
      return { error: passwordError.message };
    }

    console.log('Password updated successfully');
    return { success: 'Salasana vaihdettu' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: error.message };
  }
}

export async function deleteUser() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'Käyttäjää ei tunnistettu' };
    }

    const { error } = await supabase.auth.api.deleteUser(user.id);

    if (error) {
      console.error('Käyttäjän poisto epäonnistui:', error);
      return { error: error.message };
    }

    console.log('Käyttäjätili poistettu onnistuneesti');
    return { success: 'Käyttäjätili on poistettu.' };
  } catch (error) {
    console.error('Odottamaton virhe:', error);
    return { error: error.message };
  }
}

export async function sendConfirmationEmail(order) {
  const { name, email, product, quantity, price, size, address, city } = order;
  const totalPrice = price * quantity;

  const emailContent = `
    <p>Hei ${name},</p>
    <p>Kiitos tilauksestasi Datadynamolta!</p>
    <p>Olet tilannut seuraavat tuotteet:</p>
    <ul>
      <li><strong>Tuote: </strong>${product}</li>
      <li><strong>Määrä: </strong>${quantity}</li>
      <li><strong>Koko: </strong>${size}</li>
      <li><strong>Kokonaishinta: </strong>${totalPrice}€</li>
      <li><strong>Toimitusosoite: </strong>${address}, ${city}</li>
    </ul>
    <p>Tilaus on käsittelyssä ja se lähetetään pian.</p>
    <p>Ystävällisin terveisin,</p>
    <p>Datadynamo</p>
  `;

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';

  try {
    const response = await fetch(proxyUrl + sendGridUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sendGridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            subject: 'Datadynamo tilausvahvistus',
          },
        ],
        from: {
          email: 'roni.suomalainen@edu.lapinamk.fi',
        },
        content: [
          {
            type: 'text/html',
            value: emailContent,
          },
        ],
      }),
    });

    if (response.ok) {
      if (response.status === 202) {
        console.log('Email successfully accepted for sending.');
        return { success: 'Tilausvahvistus lähetetty onnistuneesti!' };
      } else {
        const result = await response.json();
        console.log(result);
        return {
          success:
            result.success || 'Email sent, but no success message returned.',
        };
      }
    } else {
      const errorText = await response.text();
      console.error('Error response: ', errorText);
      return { error: 'Tilausvahvistusta ei voitu lähettää.' };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Tilausvahvistusta ei voitu lähettää.' };
  }
}
