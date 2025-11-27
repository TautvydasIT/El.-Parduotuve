# El.-Parduotuve
T120B165 Saityno taikomųjų programų projektavimas - Projektas - Elektroninė parduotuvė

## Table of Contents
1. [Sprendžiamo uždavinio aprašymas](#sprendžiamo-uždavinio-aprašymas)
   - [Sistemos paskirtis](#sistemos-paskirtis)
   - [Funkciniai reikalavimai](#funkciniai-reikalavimai)
2. [Pasirinktų technologijų aprašymas](#pasirinktų-technologijų-aprašymas)
3. [Naudotojo sąsajos projektas](#naudotojo-sąsajos-projektas)
4. [API specifikacija](#api-specifikacija)

---

## Sprendžiamo uždavinio aprašymas

### Sistemos paskirtis
Projekto tikslas – patogi naudojimui ir valdymui elektroninės parduotuvės dalis, kurioje būtų prekių rūšys, jos visos turėtų atitinkamas prekes, o pačios prekės turėtų atsiliepimus.

Veikimo principas – internetinis puslapis, kuriame rodomos prekių rūšys, pasirinkus vieną iš rūšių, rodomos tos rūšies prekės, paspaudus ant prekės matyti atsiliepimai apie ją.  
Lankytojai galės tik peržiūrėti prekes ir atsiliepimus. Užsiregistravę lankytojai galės prisijungti prie savo paskyrų ir rašyti atsiliepimus apie prekes. Administratoriai galės ištrinti kenksmingus atsiliepimus, redaguoti prekes.

### Funkciniai reikalavimai
Sistema privalo turėti grafinę naudotojo sąsają, kuri leistų užsiregistruoti ar prisijungti prie savo paskyros, peržiūrėti prekes ir palikti atsiliepimus.  
Sistema turi būti pasiekiama saityne, taip pat palaikyti tris roles – administratorių, neregistruotą lankytoją ir prisijungusį lankytoją, kiekvienam iš jų suteikiant skirtingas prieigas.

#### Administratoriai gali:
- Sukurti naują prekių rūšį.
- Pašalinti egzistuojančią prekių rūšį.
- Redaguoti egzistuojančią prekių rūšį.
- Pridėti naujų prekių.
- Pašalinti esamas prekes.
- Redaguoti esamas prekes.
- Ištrinti nekorektiškus atsiliepimus.

#### Registruoti lankytojai gali:
- Peržiūrėti prekių rūšis ir jose esančias prekes.
- Peržiūrėti prekių atsiliepimus.
- Rašyti/ištrinti/redaguoti savo atsiliepimą.
- Įvertinti kitų atsiliepimus patinka/nepatinka mygtukais.

#### Neregistruoti lankytojai gali:
- Peržiūrėti prekių rūšis ir jose esančias prekes.
- Peržiūrėti prekių atsiliepimus.

---

## Pasirinktų technologijų aprašymas

Sistemos sudedamosios dalys:
- **Front-end:** React.js  
- **Back-end:** Node.js  
- **Duomenų bazė:** MySQL
<div style="text-align:center;">
  <img src="images/Paveikslėlis1.png" width="45%">
  <div>Paveikslėlis 1: Sistemos diegimo diagrama</div>
</div>
<br>
Iš diegimo diagramos matyti, jog sistema yra talpinama Railway serveryje, klientas bendrauja su sistema per HTTPS protokolą.

---

## Naudotojo sąsajos projektas

<div>
  <img src="images/Paveikslėlis4.png" width="50%">
  <div style="margin:0; text-align:center;">Paveikslėlis 2: Pagrindinis puslapis wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis5.png" width="50%">
  <div>Paveikslėlis 3: Pagrindinis puslapis</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis6.png" width="50%">
  <div>Paveikslėlis 4: Informacijos puslapis „About us“ wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis7.png" width="50%">
  <div>Paveikslėlis 5: Informacijos puslapis „About us“</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis8.png" width="50%">
  <div>Paveikslėlis 6: Pagalbos puslapis „Help“ wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis9.png" width="50%">
  <div>Paveikslėlis 7: Pagalbos puslapis „Help“</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis10.png" width="50%">
  <div>Paveikslėlis 8: Tam tikro tipo produktų puslapis wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis11.png" width="50%">
  <div>Paveikslėlis 9: Tam tikro tipo produktų puslapis</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis12.png" width="50%">
  <div>Paveikslėlis 10: Tam tikro produkto puslapis wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis13.png" width="50%">
  <div>Paveikslėlis 11: Tam tikro produkto puslapis</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis14.png" width="50%">
  <div>Paveikslėlis 12: Prisijungimo modalinis langas wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis15.png" width="50%">
  <div>Paveikslėlis 13: Prisijungimo modalinis langas</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis16.png" width="50%">
  <div>Paveikslėlis 14: Registracijos modalinis langas wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis17.png" width="50%">
  <div>Paveikslėlis 15: Registracijos modalinis langas</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis18.png" width="50%">
  <div>Paveikslėlis 16: Produkto administratoriaus puslapis wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis19.png" width="50%">
  <div>Paveikslėlis 17: Produkto administratoriaus puslapis</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis20.png" width="50%">
  <div>Paveikslėlis 18: Pagrindinis administratoriaus puslapis wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis21.png" width="50%">
  <div>Paveikslėlis 19: Pagrindinis administratoriaus puslapis</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis22.png" width="50%">
  <div>Paveikslėlis 20: Produktų tipo administratoriaus puslapis wireframe</div>
</div>
<br>
<div>
  <img src="images/Paveikslėlis23.png" width="50%">
  <div>Paveikslėlis 21: Produktų tipo administratoriaus puslapis</div>
</div>
<br>

---

## API specifikacija

### Tipai
**Get all**

**Atsako kodai**:

200	
List of types

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/a.png" width="50%">
  <div>Paveikslėlis 22: Get all tipo užklausa/atsakymas</div>
</div>

**Get by id**

**Atsako kodai**:

200	
Type object

404	
Type not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/b.png" width="50%">
  <div>Paveikslėlis 22: Get by id tipo užklausa/atsakymas</div>
</div>

**Create**

**Atsako kodai**:

201	
Type created

400	
Name required

403	
Forbidden (requires admin)

409	
Duplicate type name

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/c.png" width="50%">
  <div>Paveikslėlis 23: Create tipo užklausa/atsakymas</div>
</div>

**Update**

**Atsako kodai**:

200	
Type updated

400	
Name required

403	
Forbidden (requires admin)

404	
Type not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/d.png" width="50%">
  <div>Paveikslėlis 24: Update tipo užklausa/atsakymas</div>
</div>

**Delete**

**Atsako kodai**:

204	
Type deleted

403	
Forbidden (requires admin)

404	
Type not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/e.png" width="50%">
  <div>Paveikslėlis 25: Delete tipo užklausa/atsakymas</div>
</div>

**Get products by type**

**Atsako kodai**:

200	
Products for the type

404	
Type not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/f.png" width="50%">
  <div>Paveikslėlis 26: Get products by type užklausa/atsakymas</div>
</div>

**Get reviews by product/type**

**Atsako kodai**:

200	
List of reviews

404	
Type or product not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/g.png" width="50%">
  <div>Paveikslėlis 27: Get reviews by product/type užklausa/atsakymas</div>
</div>

### Produktai

**Get all**

**Atsako kodai**:

200	
List of products

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/h.png" width="50%">
  <div>Paveikslėlis 28: Get all tipo užklausa/atsakymas</div>
</div>

**Get by id**

**Atsako kodai**:

200	
Product object

404	
Product not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/k.png" width="50%">
  <div>Paveikslėlis 29: Get by id tipo užklausa/atsakymas</div>
</div>

**Create**

**Atsako kodai**:

201	
Product created

400	
Invalid payload

403	
Forbidden (requires admin)

409	
Product already exists

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/l.png" width="50%">
  <div>Paveikslėlis 30: Create tipo užklausa/atsakymas</div>
</div>

**Update**

**Atsako kodai**:

200	
Product updated

400	
Invalid input data

403	
Forbidden (requires admin)

404	
Product not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/m.png" width="50%">
  <div>Paveikslėlis 31: Update tipo užklausa/atsakymas</div>
</div>

**Delete**

**Atsako kodai**:

204	
Product deleted

403	
Forbidden (requires admin)

404	
Product not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/n.png" width="50%">
  <div>Paveikslėlis 32: Delete tipo užklausa/atsakymas</div>
</div>

### Atsiliepimai

**Get all**

**Atsako kodai**:

200	
List of reviews

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/o.png" width="50%">
  <div>Paveikslėlis 33: Get all tipo užklausa/atsakymas</div>
</div>

**Get by id**

**Atsako kodai**:

200	
Review object

404	
Review not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/p.png" width="50%">
  <div>Paveikslėlis 34: Get by id tipo užklausa/atsakymas</div>
</div>

**Create**

**Atsako kodai**:

201	
Review created

400	
Invalid payload

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/r.png" width="50%">
  <div>Paveikslėlis 35: Create tipo užklausa/atsakymas</div>
</div>

**Update**

**Atsako kodai**:

200	
Review updated

400	
Invalid payload or user_id mismatch

403	
Forbidden (not owner/admin)

404	
Review not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/s.png" width="50%">
  <div>Paveikslėlis 36: Update tipo užklausa/atsakymas</div>
</div>

**Delete**

**Atsako kodai**:

204	
Review deleted

403	
Forbidden (not owner/admin)

404	
Review not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/t.png" width="50%">
  <div>Paveikslėlis 37: Delete tipo užklausa/atsakymas</div>
</div>

### Autentifikacija

**Register**

**Atsako kodai**:

201	
User registered

400	
Missing fields

409	
Email already exists

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/i.png" width="50%">
  <div>Paveikslėlis 38: Register tipo užklausa/atsakymas</div>
</div>

**Login**

**Atsako kodai**:

200	
Returns access token

401	
Invalid credentials

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/y.png" width="50%">
  <div>Paveikslėlis 39: Login tipo užklausa/atsakymas</div>
</div>

**Refresh**

**Atsako kodai**:

200	
New access token

401	
Invalid or missing refresh token

403	
Session expired or invalid

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/u.png" width="50%">
  <div>Paveikslėlis 40: Refresh tipo užklausa/atsakymas</div>
</div>

**Logout**

**Atsako kodai**:

200	
Logged out

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/v.png" width="50%">
  <div>Paveikslėlis 41: Logout tipo užklausa/atsakymas</div>
</div>

**Me**

**Atsako kodai**:

200	
Current user info

404	
User not found

500	
Internal server error

**Panaudojimo pavyzdžiai**:
<div>
  <img src="images/z.png" width="50%">
  <div>Paveikslėlis 42: Me tipo užklausa/atsakymas</div>
</div>
