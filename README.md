# Egzaminas

## User Stories – Žaidimų konsolės rezervacijos

| Epikas            | Vartotojas       | User Story                                   |
| ----------------- | ---------------- | -------------------------------------------- |
| Autentifikacija   | Vartotojas       | Registruotis sistemoje                       |
| Autentifikacija   | Visi             | Prisijungti / Atsijungti                     |
| Konsolių peržiūra | Visi             | Matyti konsolių sąrašą ir informaciją        |
| Rezervacijos      | Vartotojas       | Kurti rezervaciją                            |
| Rezervacijos      | Vartotojas       | Peržiūrėti ir atšaukti savo rezervacijas     |
| Rezervacijos      | Administratorius | Peržiūrėti visas rezervacijas                |
| Rezervacijos      | Administratorius | Patvirtinti / atmesti rezervacijas           |
| Konsolių valdymas | Administratorius | Pridėti, redaguoti arba keisti konsolės info |

---

Funkciniai reikalavimai:

- **Vartotojų autentifikacija**

  - Registracija, prisijungimas ir atsijungimas
  - Tik prisijungę vartotojai gali matyti daugiau nei login arba signup puslapį

- **Konsolių peržiūra**

  - Visi vartotojai mato konsolių sąrašą
  - Galima peržiūrėti konsolės informaciją: tipas, aprašymas, užimtos datos

- **Rezervacijos (vartotojas)**

  - Kurti naują rezervaciją
  - Peržiūrėti savo rezervacijas
  - Atšaukti rezervaciją

- **Rezervacijos (administratorius)**

  - Peržiūrėti visas rezervacijas
  - Patvirtinti arba atmesti rezervacijas

- **Konsolių valdymas (administratorius)**

  - Pridėti naujas konsoles
  - Redaguoti konsolių informaciją


- **Responsyvus dizainas**

  - Prisitaiko prie telefono, planšetės ir kompiuterio ekranų

- **Testavimas**
  - Unit testai vartotojų autentifikacijai, konsolių peržiūrai, rezervacijų kūrimui ir atšaukimui, administratoriaus funkcijoms

---

Nefunkciniai reikalvimai:

- **Technologijos**

  - Front-End: React
  - Back-End: Node.js / Express
  - Duomenų bazė: MongoDB
  - Stiliaus biblioteka: Tailwind CSS
  - Versijų valdymas: Git / GitHub

- **Našumas**

  - Sistema turi greitai atvaizduoti konsolių sąrašą ir rezervacijas
  - Turi palaikyti kelių vartotojų rezervacijas vienu metu be konfliktų

- **Dizaino prisitaikymas (responsyvus dizainas)**

  - Prisitaikymas prie skirtingų ekrano dydžių: mobilus telefonas, planšetė, kompiuteris
  - Patogi vartotojo sąsaja ir aiškus informacijos išdėstymas

- **Testavimas**
  - Unit testai Front-End ir Back-End funkcionalumui
  - Testuojami vartotojų prisijungimas, konsolių peržiūra, rezervacijų kūrimas, atšaukimas ir administratoriaus funkcijos
