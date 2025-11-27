# El.-Parduotuve
T120B165 Saityno taikomųjų programų projektavimas - Projektas - Elektroninė parduotuvė

## Table of Contents
1. [Sprendžiamo uždavinio aprašymas](#sprendžiamo-uždavinio-aprašymas)
   - [Sistemos paskirtis](#sistemos-paskirtis)
   - [Funkciniai reikalavimai](#funkciniai-reikalavimai)
2. [Pasirinktų technologijų aprašymas](#pasirinktų-technologijų-aprašymas)

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
<figure>
  <img src="images/Paveikslėlis1.png" width="50%">
  <figcaption>Paveikslėlis 1: Sistemos diegimo diagrama</figcaption>
</figure>
<div style="text-align:center;">
  <img src="images/Paveikslėlis1.png" width="50%">
  <div>Paveikslėlis 1: Sistemos diegimo diagrama</div>
</div>

Iš diegimo diagramos matyti, jog sistema yra talpinama Railway serveryje, klientas bendrauja su sistema per HTTPS protokolą.

---

## Naudotojo sąsajos projektas

<figure>
  <img src="images/Paveikslėlis4.png" width="50%">
  <figcaption style="margin:0; text-align:center;">Paveikslėlis 2: Pagrindinis puslapis wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis5.png" width="50%">
  <figcaption>Paveikslėlis 3: Pagrindinis puslapis</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis6.png" width="50%">
  <figcaption>Paveikslėlis 4: Informacijos puslapis „About us“ wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis7.png" width="50%">
  <figcaption>Paveikslėlis 5: Informacijos puslapis „About us“</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis8.png" width="50%">
  <figcaption>Paveikslėlis 6: Pagalbos puslapis „Help“ wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis9.png" width="50%">
  <figcaption>Paveikslėlis 7: Pagalbos puslapis „Help“</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis10.png" width="50%">
  <figcaption>Paveikslėlis 8: Tam tikro tipo produktų puslapis wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis11.png" width="50%">
  <figcaption>Paveikslėlis 9: Tam tikro tipo produktų puslapis</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis12.png" width="50%">
  <figcaption>Paveikslėlis 10: Tam tikro produkto puslapis wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis13.png" width="50%">
  <figcaption>Paveikslėlis 11: Tam tikro produkto puslapis</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis14.png" width="50%">
  <figcaption>Paveikslėlis 12: Prisijungimo modalinis langas wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis15.png" width="50%">
  <figcaption>Paveikslėlis 13: Prisijungimo modalinis langas</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis16.png" width="50%">
  <figcaption>Paveikslėlis 14: Registracijos modalinis langas wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis17.png" width="50%">
  <figcaption>Paveikslėlis 15: Registracijos modalinis langas</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis18.png" width="50%">
  <figcaption>Paveikslėlis 16: Produkto administratoriaus puslapis wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis19.png" width="50%">
  <figcaption>Paveikslėlis 17: Produkto administratoriaus puslapis</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis20.png" width="50%">
  <figcaption>Paveikslėlis 18: Pagrindinis administratoriaus puslapis wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis21.png" width="50%">
  <figcaption>Paveikslėlis 19: Pagrindinis administratoriaus puslapis</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis22.png" width="50%">
  <figcaption>Paveikslėlis 20: Produktų tipo administratoriaus puslapis wireframe</figcaption>
</figure>

<figure>
  <img src="images/Paveikslėlis23.png" width="50%">
  <figcaption>Paveikslėlis 21: Produktų tipo administratoriaus puslapis</figcaption>
</figure>

