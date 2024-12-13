# Datadynamo

## 🛠️ Projektin käynnistys

1. Asenna ja käynnistä frontend:   
```bash
   cd ./datadynamo-store/ ->
   npm i ->
   npm run dev   
```

2. Jos render.comin backend ei toimi, käynnistä paikallinen backend (main branch):   
```bash
   cd ./datadynamo-store/server/ ->
   node server.js   
```

## 📧 Sähköpostitoiminnot

1. Hanki demo-oikeus [CORS Anywhere](https://cors-anywhere.herokuapp.com/corsdemo) -palvelusta
2. Huom: Sähköpostin lähetys toimii vain:
   - ✅ Paikallisessa ympäristössä (main branch)
   - ❌ GitHub Pages -ympäristössä (master branch)

## 💳 Stripe Testaus

Käytä seuraavia testitietoja maksun testaamiseen:
- Korttinumero: `4242 4242 4242 4242`
- Voimassaoloaika: mikä tahansa tuleva päivämäärä
- CVC: mikä tahansa 3-numeroinen koodi
- Postinumero: mikä tahansa 5-numeroinen koodi

> **Huom:** Ensimmäinen maksutapahtuma voi olla hitaampi, seuraavat nopeampia.

## 🔐 Admin-käyttö

Admin-hallintapaneelin salasana: `admin123`

## 🔄 Git-komennot

```bash
git status
git add .
git commit -m "Commitmsg"
git push
```

## 🚀 CI/CD

- CI/CD testaus toimii vain master-branchilla
- Tuotantoversio: [https://ronisuomalainen.github.io/Datadynamo/](https://ronisuomalainen.github.io/Datadynamo/)

## Kuvia
![login](/images/image.png)
Landingpage

![main](/images/image-2.png)
Etusivu, jossa voi muokata hiirimattoa ja tilausta.

![admin](/images/image-3.png)
Admin-hallintapaneeli

![lightmode](/images/image-4.png)
Jokaisesta sivusta löytyy vaalea ja tumma teema.

## Author
 © Datadynamo 2024
