# SK Pogodak — Streljana rezervacije

Kratki README za GitHub — kako pokrenuti ovaj projekat lokalno.

Sadržaj repozitorijuma
- `api/` — Node/Express backend (MongoDB). API rute, modeli i kontroleri.
- `client/` — React frontend (klijent-facing web app).
- `admin/` — admin React aplikacija za upravljanje (ponude, streljane).

Preduvjeti
- Node.js (>=16) i npm ili yarn
- MongoDB (lokalno ili cloud, npr. Mongo Atlas)

Brzo lokalno pokretanje
1) Backend (API)
   - Otvori terminal u `api` mapi:

```powershell
cd c:\Users\Win\Desktop\MOSSTR3\MOJSTR2\Projekat\api
# postavi env var za MongoDB, primjer (PowerShell):
$env:MONGO_URL = "mongodb://localhost:27017/ime_baze"
# ako koristite .env, postavite varijable prema settings u index.js
npm install
npm start
```

   - Po defaultu backend starta s `nodemon index.js` (provjerite `api/package.json`).

2) Frontend (client)
   - Otvori terminal u `client` mapi:

```powershell
cd c:\Users\Win\Desktop\MOSSTR3\MOJSTR2\Projekat\client
npm install
# Ako port 3000 zauzet, možete pokrenuti na drugom portu:
$env:PORT=3001; npm start
```

   - Frontend koristi proxy na `http://localhost:8800/api` (provjerite `client/package.json`->`proxy`). Ako backend koristi drugi port, ažurirajte proxy ili koristite puni URL u pozivima.

3) Admin (opcionalno)
   - Slično kao client, instalirajte i pokrenite `admin` aplikaciju.

Napomene i savjeti
- Environment varijable: backend može očekivati varijable poput `MONGO_URL`, `PORT`, `JWT_SECRET` itd. Provjerite `api/index.js` ili `api` konfiguraciju i dodajte `.env` ako želite.
- Ako postoje streljane s netočnom `najjeftinijaPonuda` (npr. 0€), baza je možda stara — mogu dodati mali migration skript koji rekalkulira `najjeftinijaPonuda` iz povezanih `Ponuda` dokumenata.
- Pretraga po gradu sada je case-insensitive i podržava parcijalno poklapanje (regex) — backend ruta `GET /streljane` prihvaća `grad`, `min`, `max`, `limit`.

Sugestije za razvoj
- Dodajte `.env.example` u `api/` s potrebnim varijablama.
- Dodajte jednostavan migration script `scripts/fix-prices.js` koji popravlja `najjeftinijaPonuda` za postojeće dokumente.
- Pokrijte kritične rute minimalnim integracijskim testovima.

Kontakt / dalje
Ako želiš, mogu:
- Dodati `README` na engleskom također
- Napraviti migration skript i commit-ati ga ovdje
- Dovršiti deployment guide (Heroku/Vercel + MongoDB Atlas)

Licenca
- Dodaj licencu po želji (npr. MIT) u root repozitorij.

---

Ako želiš, odmah mogu dodati `.env.example` i migration skript — reci što preferiraš.