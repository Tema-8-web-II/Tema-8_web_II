# Tema-8_web_II

# Teknisk dokumentation – Tema 8 Web II Vision

## Om projektet

Dette projekt er lavet som en del af Tema 8.
Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor indholdet bliver hentet fra et Rest API.

Sitet består af flere sider, hvor brugeren kan:

- se en liste med indhold
- klikke sig videre til en detaljeside
- bruge filtrering
- udfylde en formular

## Links

- GitHub repository: https://github.com/Tema-8-web-II/Tema-8_web_II.git
- GitHub Pages: [indsæt link]
- Figma: https://www.figma.com/design/fEdfKseneO7Mqvb35T8YGQ/Tema-8-web-II?node-id=1-7&t=IptLvFVhAQRyijga-1
- Trello: [indsæt link]

---

## Projektstruktur

Projektet er opdelt i HTML, CSS og JavaScript-filer.

```
project/
├── index.html
├── porductlist.html
├── productdetails.html
├── form.html
├── css/
│   └── style.css
├── js/
│   ├── index.js
│   ├── productlist.js
│   ├── productdetails.js
│   └── form.js
└── README.md
```

### Filbeskrivelser

- **index.html** – forsiden
- **productlist.html** – viser en liste med data fra API'et
- **productdetails.html** – viser detaljer om en valgt opskrift
- **form.html** – indeholder formularen
- **style.css** – styrer designet
- **JavaScript-filer** – styrer det dynamiske indhold på de forskellige sider

---

## Hvordan koden fungerer

Vi har opdelt JavaScript, så hver side har sin egen fil.

### index.js

Bruges på forsiden.
Her bliver indhold vist dynamisk, fx links eller kategorier.

### productlist.js

Henter data fra Rest API'et og viser en liste med produkter på siden.

**Flow:**

1. Siden loader
2. JavaScript kører
3. Data hentes fra Rest API
4. Data bliver gennemgået med loop
5. HTML bliver indsat i DOM'en
6. Brugeren kan klikke på et produkt

### productdetails.js

Bruges til detaljesiden. Den læser et id fra URL'en og henter derefter den rigtige opskrift fra Rest API'et.

Det gør det muligt at genbruge den samme HTML-side til mange opskrifter. I stedet for at lave én side per opskrift, bruger vi ét id i URL'en til at vise det rigtige indhold.

### form.js

Styrer formularen og validering af inputfelter.

Denne fil bruges til at sikre, at brugeren udfylder formularen korrekt. Det gør formularen mere brugervenlig og mindsker fejl.

---

## Navngivning

Vi har navngivet vores filer, variabler og funktioner så de så tydeligt som muligt er selvforklarende.

### Eksempler på variabler

```javascript
const ProductContainer;
const ProductId;
const selectedCategory;
```

### Eksempler på funktioner

```javascript
fetchProducts();
showProducts();
showProductsDetails();
validateForm();
```

Vi har brugt camelCase i JavaScript, fordi det gør koden mere ensartet og lettere at læse.

---

## Kommentarer i koden

Vi har kommenteret de steder i koden, hvor det giver mening.
Fx ved funktioner, fetch-kald og steder hvor der sker DOM-manipulation.

**Eksempel:**

```javascript
// Henter produkter fra Rest API'et
async function fetchProducts() {
  const res = await fetch(apiURL);
  const data = await res.json();
  return data.products;
}
```

Vi har prøvet ikke at skrive kommentarer til helt åbenlyse ting, men kun dér hvor det hjælper forståelsen.

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format.

**Et objekt kan fx se sådan ud:**

```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  "category": "beauty",
  "price": 9.99,
  "discountPercentage": 7.17,
  "rating": 4.94,
  "stock": 5,
  "thumbnail": "...",
  "images": ["...", "...", "..."]
}
```

### Felter vi bruger

- **id** – bruges til at sende brugeren videre til detaljesiden
- **title** – produktsnavn
- **description** – beskrivelse af produktet
- **category** – produktkategori (fx beauty,
  fragrances, womens-bags)
- **price** – pris i dkk
- **discountPercentage** – tilbud i %
- **rating** - ud a 5
- **thumbnail** – productsbillede

---

## Formular og validering

Vi har lavet en formular, hvor brugeren kan indtaste oplysninger.

**HTML-validering:**

- `required` – feltet skal udfyldes
- `type="email"` – validerer email-format
- `type="number"` – accepterer kun tal

Det sikrer, at brugeren ikke kan sende formularen, hvis felterne ikke er udfyldt korrekt.

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet.

Vi har arbejdet med branches, så vi ikke sad og ændrede i det samme på samme tid.

Vi navngav branchene med feature først og navnet på den, der lavede branchen til sidst.

### Eksempler på branches

- `feature-forside-nicoai`
- `feature-produktliste-frederik`
- `feature-detaljeside-cecilie`
- `feature-formular-louis`

### Workflow

1. Lave en branch med feature-navn og eget navn til sidst
2. Kode en feature
3. Committe ændringer
4. Pushe til GitHub
5. Merge til main når det virkede

Det gjorde det nemmere at holde styr på, hvem der lavede hvad.

---

## Bæredygtighed

**Tiltag:**

- Optimerede billeder (formater)
- Ingen videoer
- Ingen tunge frameworks
- Genbruge af kode

---

## Udfordringer undervejs

**Løsninger:**

- Console.logge data undervejs
-
-
- Dele opgaverne mere tydeligt i gruppen

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

- Søgefunktion
- Error handling
- Loading state

---

## Gruppemedlemmer

- Cecilie
- Louis
- Nicolai Askholt
- Frederik Askholt
