# Elysian Elite Entertainment (EEE)

Privát RP weboldal a FiveM / Los Santos Paradise történethez.

## Fő funkciók

- Luxuskialakítású fekete / arany / fehér EEE weboldal
- Főmenü, Kik vagyunk, Talent Hölgyek, Árak, Szabályzat, Elérhetőség
- EEE Tagok belső menü: Személyi Testőrök + Talent Lányok handbook
- Talent profilok külön szolgáltatási és személyes határ beállításokkal
- Többlépcsős Private Booking Request
- Részletes ügyfél- és cégadatok, lakcím / céges cím
- Esemény, venue, időpont, költségkeret, dress code, transport és security mezők
- Szabad szöveges egyedi igények és eseményleírás
- Profil ikon alatt minden megrendelés listázva
- Draft / Submitted státusz
- Meglévő request szerkesztése és törlése
- Alapból böngésző `localStorage` mentés

## Képek

A logó a repo gyökerében legyen:

`logo.png`

Talent képek:

- `assets/talents/airi-shimizu.jpg`
- `assets/talents/livia-hartmann.jpg`
- `assets/talents/naomi-reyes.jpg`
- `assets/talents/mila-laurent.jpg`
- `assets/talents/sienna-vale.jpg`
- `assets/talents/yuna-mori.jpg`

Ha egy kép hiányzik, a weboldal automatikusan monogramos placeholdert mutat.

## Indítás

Nincs build step vagy npm szükséglet. Nyisd meg az `index.html` fájlt, vagy indíts egy egyszerű helyi szervert:

```bash
python -m http.server 8080
```

Utána: `http://localhost:8080`

## Fontos a megrendelések mentéséről

Jelenleg a megrendelések kizárólag az adott böngésző `localStorage` tárhelyére kerülnek. Ez gyors és privát RP teszteléshez, de **nem szinkronizál két külön gép között**.

Ha SouLy és Cherry ugyanazt a rendeléslistát akarja látni két külön gépről, a következő verzióban érdemes közös backendhez kötni (például Supabase Auth + Database). A frontendet úgy építettük, hogy ez később könnyen cserélhető legyen.

## GitHub / publikálás

A repo lehet privát. Viszont a GitHub repo privátsága és a publikált weboldal hozzáférése nem ugyanaz a dolog: érzékeny vagy valódi személyes adatoknál ne kezeljétek a publikus statikus hosztolást valódi hozzáférés-védelemként.

RP-adatoknál ez kevésbé kritikus, de közös online használathoz érdemes valódi belépést tenni elé.


## EEE Tagok belső rész

Az `EEE Tagok` menü RP szerint belső személyzeti felület. A projekt jelenlegi verziójában nincs valódi login vagy jogosultságkezelés, mert az oldalt zárt RP használatra terveztük.
