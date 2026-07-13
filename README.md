
Du bist ein Senior Frontend Engineer, UI/UX Designer, Motion Designer, SEO-Spezialist und Web-Performance-Experte. Erstelle selbstständig eine vollständige, hochwertige und verkaufsfähige Konzept-Website für das Café Zeitlos in Braunschweig.

Die Website soll so professionell aussehen, dass sie dem Café direkt als fertige Geschäftsidee präsentiert werden kann. Sie darf nicht wie ein generisches Restaurant-Template oder ein studentisches Übungsprojekt wirken.

Arbeite die Aufgabe vollständig ab. Stelle keine unnötigen Rückfragen. Beende die Arbeit nicht nach dem Erstellen des Grundgerüsts. Implementiere alle Seitenbereiche, Inhalte, Animationen, responsive Zustände, Tests und die GitHub-Actions-Deployment-Pipeline. Führe anschließend Linting, Tests und den Production-Build aus und behebe alle auftretenden Fehler.

PROJEKTZIEL

Erstelle eine schnelle, emotionale und moderne Frontend-Website für:

Café Zeitlos
Rebenring 47a
38106 Braunschweig
Telefon: +49 531 12885768
Instagram: @cafezeitlos_bs
Öffnungszeiten: Montag bis Sonntag, 09:00–20:00 Uhr
Wichtiger Hinweis des Cafés: „Fleisch 100 % halal“

Die öffentlichen Angaben nennen das Café, die Adresse, die täglichen Öffnungszeiten und das 100-%-Halal-Fleisch. Nutze ausschließlich diese Formulierung und behaupte nicht, dass das gesamte Café halal-zertifiziert ist. ([Instagram][1])

Als emotionale Markenbotschaft kann verwendet werden:

„Ankommen. Verweilen. Genießen.“

Weitere passende, aber sachliche Texte:

„Frühstück, Stullen, Bowls, Burger und Pancakes in Braunschweig.“

„Deine genussvolle Auszeit am Rebenring.“

Das Café wurde am 17. Januar 2026 eröffnet und bietet unter anderem Frühstücksvariationen, Stullen und Burger an. ([t-online – Braunschweig][2])

PROJEKTANLAGE

Erstelle ein komplett neues Projekt im Ordner:

cafe-zeitlos-website

Falls dieser Ordner bereits existiert, prüfe zuerst seinen Inhalt. Überschreibe keine fremden oder nicht zugehörigen Dateien unkontrolliert.

Verwende:

React
Vite
TypeScript
Tailwind CSS
Framer Motion
Lucide React
react-i18next
Vitest
React Testing Library
ESLint
Prettier

Verwende nach Möglichkeit lokale Fonts über @fontsource:

Cormorant Garamond für Überschriften und große emotionale Texte
Manrope für Navigation, Beschreibungen, Preise und Buttons

Die Website besitzt kein Backend. Alle Inhalte müssen aus sauber typisierten lokalen TypeScript-Dateien geladen werden.

Empfohlene Struktur:

src/components
src/components/layout
src/components/ui
src/sections
src/data
src/i18n
src/hooks
src/types
src/utils
src/assets
public/images
public/images/menu
public/images/gallery
public/images/placeholders

Erstelle keine riesige App.tsx-Datei. Teile die Anwendung in sinnvolle, wiederverwendbare Komponenten auf.

DESIGNRICHTUNG

Die Website soll hochwertig, warm, modern, elegant und fotografisch wirken.

Sie darf nicht wie ein Döner-, Fast-Food- oder Standard-Lieferdienst-Template aussehen.

Verwende keine übertriebene arabische Ornamentik. „100 % halal Fleisch“ ist ein wichtiges Verkaufsmerkmal, aber nicht die gesamte visuelle Identität des Cafés.

Verwende eine warme Premium-Farbpalette mit CSS-Variablen, zum Beispiel:

Warm Ivory: #F7F2EA
Soft Cream: #EDE2D2
Espresso Brown: #2A211B
Warm Cocoa: #4A382D
Muted Olive: #74745C
Terracotta: #A86445
Soft Gold: #C3A36A
Dark Text: #211B17

Achte auf guten Farbkontrast und Barrierefreiheit. Gold darf nur als Akzent verwendet werden und nicht als schwer lesbare Textfarbe auf hellem Hintergrund.

Das Design soll großzügige Abstände, hochwertige Typografie, abgerundete Karten, subtile Schatten und klare visuelle Hierarchien verwenden.

Vermeide:

übertriebene Glassmorphism-Effekte
Neonfarben
zu viele Farbverläufe
aggressive Scroll-Effekte
automatisch abgespielte Musik
unruhige Hintergründe
extrem große Animationen
billige Food-Icons als Ersatz für echte Bilder
Stockfotos, die fälschlich als Café-Zeitlos-Gerichte präsentiert werden

BILDER – SEHR WICHTIG

Jedes sichtbare Menüelement muss ein eigenes Bildfeld besitzen.

Jeder Menüeintrag im Datenmodell benötigt mindestens:

id
name
description
price
category
image
imageAlt
dietaryTags
popular
source
needsConfirmation

Nutze reale Bilder des Cafés oder der tatsächlichen Gerichte nur dann, wenn du sie zuverlässig dem Café Zeitlos und dem jeweiligen Gericht zuordnen kannst.

Suche, falls Internetzugriff vorhanden ist, zuerst bei:

dem offiziellen Instagram-Account @cafezeitlos_bs
der öffentlichen Wolt-Seite von Café Zeitlos in Braunschweig
anderen offiziellen oder eindeutig zuordenbaren öffentlichen Café-Zeitlos-Veröffentlichungen

Verwende niemals das Bild eines anderen Gerichts für einen Menüeintrag, nur damit jede Karte gefüllt ist.

Verwende keine Bilder anderer Restaurants.

Hotlinke Bilder nicht dauerhaft, wenn sie lokal und rechtmäßig für den Konzeptentwurf gespeichert werden können. Dokumentiere bei jedem übernommenen Bild die Quelle.

Erstelle eine Datei:

IMAGE_SOURCES.md

Sie muss für jedes reale Bild enthalten:

Dateiname
dargestelltes Gericht oder Motiv
Quelle
ursprünglicher Fundort
Nutzungsstatus
Hinweis, ob vor einer öffentlichen kommerziellen Veröffentlichung die Zustimmung des Café-Inhabers erforderlich ist

Diese Website ist ein Verkaufskonzept. Wenn die Bildrechte nicht eindeutig sind, kennzeichne die Bilder als nur für den privaten Konzeptentwurf vorgesehen.

WENN DU BILDER NICHT BESCHAFFEN KANNST

Breche das Projekt nicht ab.

Erstelle hochwertige lokale Platzhalter, die zum Design passen. Die Platzhalter dürfen keine erfundenen Food-Fotos vortäuschen. Sie sollen stattdessen einen ruhigen farbigen Hintergrund, den Namen des Gerichts und den Hinweis „Originalfoto einsetzen“ zeigen.

Erstelle zusätzlich:

IMAGE_REQUIREMENTS.md

Liste darin jedes fehlende Bild einzeln auf, zum Beispiel:

Lotus Pancakes – Hero-Format, mindestens 1800 × 1200 px
Fit & Tasty Bagel – Querformat, mindestens 1200 × 900 px
Pastrami Burger – Querformat, mindestens 1200 × 900 px
Innenraum – breites Gallery-Bild
Außenansicht – breites Location-Bild

Sage mir in deiner abschließenden Antwort ausdrücklich:

welche realen Bilder du gefunden hast
welche Bilder du nicht finden konntest
welche Gerichte noch ein Originalfoto benötigen
welches Bild aktuell im Hero verwendet wird
ob bei bestimmten Bildern vor der Veröffentlichung Nutzungsrechte geklärt werden müssen

Verschweige fehlende Bilder nicht.

HERO-BEREICH

Die Startseite muss direkt mit einem starken, emotionalen Hero-Bereich beginnen.

Bevorzugtes Hero-Gericht:

Lotus Pancakes

Wenn ein eindeutig zuordenbares, qualitativ ausreichendes Originalfoto der Lotus Pancakes existiert, verwende es als großes Hauptbild.

Falls kein geeignetes Lotus-Pancakes-Bild verfügbar ist, verwende in dieser Reihenfolge:

Pistachio Pancakes
Pistachio Vanilla Toast
Pancake Platte
eine hochwertige echte Café-Zeitlos-Brunchaufnahme

Bezeichne das Gericht nicht als „offizielles Signature Dish“, solange das Café diese Bezeichnung nicht selbst verwendet. Es darf als „Unser Highlight“ oder „Für deinen nächsten Genussmoment“ präsentiert werden.

Der Hero soll enthalten:

Café-Zeitlos-Wortmarke oder ein neutrales typografisches Textlogo
„Ankommen. Verweilen. Genießen.“
kurzen Beschreibungstext
Badge „Fleisch 100 % halal“
Öffnungszeiten „Mo–So · 9–20 Uhr“
Button „Speisekarte entdecken“
Button „Route öffnen“
Button oder Icon „Jetzt anrufen“

Das Hauptgericht muss sowohl auf Desktop als auch auf Mobilgeräten sofort sichtbar sein. Auf dem Handy darf das Bild nicht komplett unter dem Text verschwinden.

RESPONSIVE UND MOBILE-FIRST – SEHR WICHTIG

Die Website muss konsequent Mobile First entwickelt werden.

Teste mindestens folgende Viewport-Breiten:

320 px
375 px
390 px
430 px
768 px
1024 px
1280 px
1440 px

Auf keinem Gerät darf horizontal gescrollt werden.

Auf Smartphones muss Folgendes gelten:

Der Hero füllt ungefähr den ersten sichtbaren Bildschirm, ohne wichtige Inhalte abzuschneiden.
Hauptüberschrift, Hauptgericht und primärer CTA sind sofort sichtbar.
Die Navigation wird zu einem sauberen Mobile-Menü.
Buttons sind mindestens 44 px hoch.
Menükarten erscheinen einspaltig.
Gerichtsbilder nutzen die volle Kartenbreite.
Filterchips sind horizontal scrollbar, ohne die Seite zu verbreitern.
Texte dürfen nicht zu klein sein.
Öffnungszeiten und Adresse müssen schnell erreichbar sein.
Keine Hover-Funktion darf zwingend erforderlich sein.
Alle Interaktionen müssen mit Touch funktionieren.

Erstelle auf Mobilgeräten eine dezente Sticky-Bottom-Action-Bar mit drei Aktionen:

Menü
Route
Anrufen

Sie darf Inhalte nicht verdecken. Füge am Ende der Seite ausreichend unteren Abstand hinzu.

Auf Tablets sollen Menükarten zweispaltig erscheinen.

Auf größeren Desktop-Bildschirmen sollen Menükarten je nach verfügbarer Breite zwei- bis dreispaltig erscheinen. Vermeide extrem breite Textzeilen.

Nutze moderne responsive Einheiten wie clamp(), min(), max(), svh und aspect-ratio sinnvoll.

SEITENSTRUKTUR

Die Website soll mindestens diese Bereiche enthalten:

1. Header und Navigation

Logo/Textlogo
Start
Speisekarte
Highlights
Über uns
Galerie
Besuch planen
Sprachauswahl
Mobile-Menü

Der Header soll beim Scrollen leicht kompakter werden und einen ruhigen Hintergrund erhalten.

2. Hero

Großes echtes Hauptgericht
Hauptbotschaft
Halal-Badge
Öffnungszeiten
primäre CTAs
dezente Scroll-Anzeige

3. Quick-Info-Leiste

Fleisch 100 % halal
Mo–So 9–20 Uhr
Rebenring 47a
Frühstück, Stullen und Pancakes

4. Beliebte Gerichte

Verwende als „Beliebt“-Auswahl die auf Wolt als häufig bestellt dargestellten Gerichte:

Fit & Tasty Bagel
Avocado Stulle
Protein Royal Bagel
Hot & Creamy Champignon Stulle
Smoky Supreme Bagel
Pastrami Burger
Nutella Pancakes
Lotus Pancakes
French Toast
Crunchy Deluxe Bagel
Pistachio Vanilla Toast
Pancake Platte

Diese Gerichte werden in der öffentlichen Wolt-Liste unter „Am häufigsten bestellt“ geführt. ([Wolt][3])

Zeige zunächst maximal sechs Gerichte, damit die Startseite nicht überladen wird. Ein Button führt zur kompletten Speisekarte.

5. Vollständige Speisekarte

Implementiere:

Suche nach Gerichtsnamen
Kategorie-Filter
Filter „Beliebt“
Filter „Vegetarisch“
Filter „Vegan“
Button zum Zurücksetzen
Anzahl der sichtbaren Ergebnisse
leeren Zustand bei keiner Übereinstimmung
zugängliche Tastatursteuerung

Mögliche Kategorien:

Bowls
Bagels
Stullen
French Toast
Pancakes
Salate
Burger
Crusty Bread
Croffles
Desserts
Frucht- und Joghurt-Bowls

Zeige auf jeder Karte:

Bild
Name
Beschreibung
Preis
Kategorie
Badges
Hinweis bei zu bestätigenden Preisen

Beim Anklicken öffnet sich ein zugängliches Dialogfenster mit größerem Bild und allen Details.

6. Atmosphäre und Galerie

Erstelle eine moderne, asymmetrische Galerie mit:

Innenraum
Außenansicht
Gerichten
Kaffee
Details der Einrichtung
Menschen nur dann, wenn ein geeignetes Bild mit geklärten Nutzungsrechten vorhanden ist

Keine zufälligen Stockbilder verwenden.

7. Über Café Zeitlos

Schreibe einen kurzen, warmen Text. Erfinde keine Biografie der Inhaber.

Beispiel:

„Café Zeitlos ist ein Ort zum Ankommen, Genießen und Verweilen. Am Rebenring in Braunschweig treffen reichhaltige Frühstücksideen, herzhafte Stullen, Bowls, Burger und süße Highlights auf eine warme, moderne Atmosphäre.“

Keine erfundenen Aussagen über regionale, biologische oder hausgemachte Zutaten machen, außer sie sind bei einem konkreten Gericht ausdrücklich angegeben.

8. Besuch planen

Adresse
Öffnungszeiten
Telefon
Route-Button
Anruf-Button
Instagram-Button
Wolt-Button

Verwende keinen Uber-Eats-Button. Die öffentliche Uber-Eats-Seite meldet, dass Café Zeitlos dort seit dem 2. Juni 2026 nicht mehr verfügbar ist. ([ubereats.com][4])

Einen Lieferando-Button nur anzeigen, wenn du die aktuelle Verfügbarkeit und die korrekte Café-Zeitlos-Seite eindeutig verifizieren kannst.

Nutze keinen automatisch ladenden Google-Maps-Iframe. Erstelle zunächst eine datenschutzfreundliche Location-Karte mit einem externen „Route öffnen“-Button.

9. Reservierung ohne Backend

Behaupte nicht, dass eine Reservierung direkt bestätigt wird.

Erstelle stattdessen einen Frontend-Reservierungsplaner:

Datum
Uhrzeit
Anzahl Personen
Name
optionale Notiz

Nach dem Ausfüllen wird eine übersichtliche Reservierungsanfrage erzeugt.

Funktionen:

„Angaben kopieren“
„Jetzt anrufen“
„Instagram öffnen“

Erkläre deutlich:

„Dies ist noch keine bestätigte Reservierung. Bitte kontaktiere das Café zur Bestätigung.“

Nutze WhatsApp nur dann, wenn eindeutig bestätigt ist, dass die Telefonnummer WhatsApp unterstützt. Gehe bei einer Festnetznummer nicht automatisch davon aus.

10. FAQ

Nutze nur sichere Antworten:

Wo befindet sich Café Zeitlos?
Wann ist das Café geöffnet?
Ist das Fleisch halal?
Wie kann ich reservieren?
Kann ich Essen bestellen?
Wo finde ich aktuelle Neuigkeiten?

Antwort zum Halal-Thema:

„Café Zeitlos gibt an, dass das verwendete Fleisch zu 100 % halal ist. Für Fragen zu einzelnen Zutaten oder Allergenen wende dich bitte direkt an das Team.“

11. Footer

Adresse
Telefon
Öffnungszeiten
Instagram
Wolt, falls verifiziert
Impressum-Platzhalter
Datenschutz-Platzhalter
Hinweis „Konzept-Website“

Erfinde keine Handelsregisterdaten, E-Mail-Adresse oder verantwortliche Person.

ECHTE MENÜDATEN

Verwende die folgenden Daten als primäre Grundlage.

Wichtig: Die Preise stammen überwiegend aus der öffentlich sichtbaren Wolt-Liste und können Lieferplattform-Preise sein. Sie müssen daher im Datenmodell mit needsConfirmation: true markiert werden.

Zeige im Demo-Modus einen kleinen, professionellen Hinweis:

„Konzept-Demo: Preise und Verfügbarkeit bitte vor Veröffentlichung durch Café Zeitlos bestätigen.“

Die aktuelle Wolt-Liste enthält Bowls, Bagels, Stullen, French Toasts, Burger, Salate, Crusty Bread und Pancakes mit den folgenden Preisen und Beschreibungen. ([Wolt][3])

BOWLS

Chicken & Egg Bowl – 19,80 €
Gegrillte Hähnchenbrust, würzige Spiegeleier, eingelegte Gurken, Süßkartoffeln, Avocado, Blattsalat, Mais, Reis und Ranch-Dressing.

Fajita Chicken Bowl – 19,80 €
Fajita-Hähnchenbrust, Kidneybohnen, Jalapeños, Paprika, Blattsalat, Mais, Reis und Chili-Mayonnaise.

Crispy Chicken Bowl – 18,60 €
Knusprige Hähnchenbrust, Edamame, Avocado, Paprika, Blattsalat, Mais, Reis und Chili-Mayonnaise.

Asian Salmon Bowl – 19,80 €
Sweet-Chili-Räucherlachs, würziges Spiegelei, Edamame, Avocado, Frühlingszwiebeln, Gurken, Blattsalat, Reis und Sweet-Chili-Mayonnaise.

Veggie Omelett Bowl – 18,60 €
Reis-Omelett mit Ei, gebratenen Champignons, Süßkartoffeln, Kirschtomaten, Fetakäse, Avocado, Blattsalat, Oliven und Ranch-Dressing.

Egg & Avocado Bowl – 18,60 €
Spiegeleier, Avocado, Avocadocreme, Süßkartoffeln, Frühlingszwiebeln, Blattsalat, Reis und Chili-Mayonnaise.

Falafel Bowl – 16,80 €
Falafel, gebratenes Gemüse, Avocado, Tomaten, Gurken, Edamame, pinke Zwiebeln, Hummus, Blattsalat, Reis und Sesamsoße.

BAGELS

Fit & Tasty Bagel – 11,90 €
Rührei, Avocado, Avocadocreme, Blattsalat, Frischkäse, getrocknete Tomaten und geröstete Sonnenblumenkerne.

Protein Royal Bagel – 13,10 €
Räucherlachs, Rührei, Avocadocreme, Blattsalat, pinke Zwiebeln, Frischkäse und eine Soße nach Wahl.

Green Power Bagel – 11,90 €
Eier, Zucchini, Petersilie, Zwiebeln, Knoblauch, Blattsalat, Tomaten und ein Spritzer frische Zitrone.

Crunchy Deluxe Bagel – 13,10 €
Chicken Fingers, hausgemachter Krautsalat, Frischkäse, Blattsalat, Gouda und Chili-Mayonnaise.

Smoky Supreme Bagel – 14,30 €
Pastrami, Rührei, Blattsalat, Frischkäse, Trüffelmayonnaise, eingelegte Gurken, Gouda und Cheddar.

Orient Vegan Bagel – 11,90 €
Falafel, Blattsalat, Tomaten, Gurken, eingelegte Paprika und Tahini-Dip.

STULLEN

Avocado Stulle – 18,60 €
Graubrot mit Avocadocreme, pochierten Eiern, Sauce hollandaise, Rucola, Mini-Tomaten, gerösteten Sonnenblumenkernen, Kresse und einer Zutat nach Wahl.

Hot & Creamy Champignon Stulle – 18,00 €
Graubrot mit Chili-Mayonnaise, Rührei, Champignons, Hartkäse, Kresse und einer Zutat nach Wahl.

Nordlicht Stulle – 18,60 €
Graubrot mit Avocadocreme, Rührei, Räucherlachs, pinken Zwiebeln, Kresse, Chili-Mayonnaise und einer Zutat nach Wahl.

Beef Bacon Stulle – 19,20 €
Graubrot mit Frischkäse, Rührei, Röstzwiebeln, Sauce hollandaise, Beef Bacon, Hartkäse und Rucola.

Mediterrane Stulle – 18,00 €
Graubrot mit hausgemachtem Olivenpesto, sonnengetrockneten Tomaten, Feta, Sonnenblumenkernen und Rucola.

Gemüse Stulle – 19,20 €
Graubrot mit hausgemachtem Hummus, gebratenem Gemüse, einer Zutat nach Wahl, einer sanften Knoblauchnote und Sesamsoße.

FRENCH TOASTS

French Toast – 17,90 €
Goldbraunes Brioche mit frischen Früchten, Nutella und gerösteten Nüssen.

Pistachio Vanilla Toast – 18,60 €
Goldbraunes Brioche mit frischen Früchten, weißer Schokolade, Pistaziencreme und gerösteten Nüssen.

Berry French Toast – 18,60 €
Mascarpone-Creme, hausgemachtes Beerenkompott und Puderzucker.

PANCAKES

Pancake Platte – 16,70 €
Frische Früchte, Ahornsirup, Nutella, Apfelmus und Nüsse.

Pistachio Pancakes – 18,60 €
Pistaziencreme, weiße Schokolade, Nüsse und Früchte.

Lotus Pancakes – 17,40 €
Lotuscreme, weiße Schokolade, Lotus-Kekse und Früchte. Kann Spuren verschiedener Nüsse enthalten.

Nutella Pancakes – 17,40 €
Nutella, Nüsse und Früchte.

Berry Pancakes – 19,10 €
Mascarpone-Creme, hausgemachtes Beerenkompott und Puderzucker.

SALATE

Caesar Salad – 18,00 €
Römersalat, paniertes Hähnchenfilet, cremiges Dressing, Parmesan und Croutons.

Zeitlos Salat – 18,00 €
Bunter Salat, Avocado, Fetakäse, Mini-Tomaten, Mini-Camembert, Oliven, Walnüsse, geröstetes Brot und zwei Dips.

BURGER

Alle Burger werden laut Wolt mit Brioche-Brötchen zubereitet und mit Pommes frites serviert.

Pastrami Burger – 17,90 €
Trüffelmayonnaise, Rucola, Pastrami, pinke Zwiebeln und eingelegte Gurken.

Chicken Burger – 16,70 €
Paniertes Hähnchenfilet, Salat, Chili-Mayonnaise, Rucola und eingelegte Gurken.

Falafel Burger – 16,70 €
Falafel, Salat, Tomaten, Zwiebeln, Sesammayonnaise und eingelegte Gurken.

Halloumi Burger – 16,70 €
Halloumi, Orient-Mayonnaise, Rucola, Tomaten und Gurken.

CRUSTY BREAD

Falafel & Hummus Brot – 17,40 €
Hummus, Olivenöl, Falafel und Tomaten.

Zaatar Brot – 16,70 €
Thymian-Aufstrich, Tomaten, Zwiebeln, Gurken, Minze, Oliven und Olivenöl.

Orientalisches Brot – 16,70 €
Labneh, Oliven, Tomaten, Gurken, frische Minze und Olivenöl.

Cheese Brot – 17,40 €
Hausgemachtes Pesto, Halloumi, Feta und Gouda.

Pastirma Brot – 19,10 €
Pastirma, hausgemachtes Pesto, Burrata, Mini-Tomaten, Chili-Mayonnaise und Balsamico-Creme.

Sucuk Brot – 17,90 €
Sucuk, Käse, Oliven, Mini-Tomaten, Sauce hollandaise und Mayonnaise.

Crispy Chicken Brot – 19,10 €
Paniertes Hähnchenfilet mit Sauce hollandaise, Mais und roter Paprika.

ZUSÄTZLICHE GERICHTE MIT ÄLTEREM DATENSTAND

Die folgenden Gerichte stammen aus einer Speisekarte mit Bearbeitungsstand 13. Februar 2026. Markiere sie mit needsConfirmation: true und sourceDate: „2026-02-13“. ([Speisekarte][5])

Croffle Classic – 4,90 €
Puderzucker.

Chocolate Berry Croffle – 7,90 €
Nutella, frische Beeren und Puderzucker.

Lotus Crunch Croffle – 7,90 €
Lotuscreme, zerbröselte Lotus-Kekse und frische Früchte.

Sweet Flame Croffle – 6,90 €
Knusprige Croffle mit flambiertem Marshmallow.

Pistachio Dream – 8,90 €
Pistaziencreme, gehackte Nüsse, frische Früchte und Puderzucker.

Açaí Bowl – 13,50 €
Banane, Açaí-Püree, Erdbeeren, Heidelbeeren, Datteln und Kokosmus.

Joghurt Bowl – 13,00 €
Griechischer Joghurt, Granola, frische Früchte, Chiasamen und Honig.

Tropical Bowl – 13,50 €
Banane, Mango, Passionsfrucht, Dattel und Kokosmus.

Erfinde keine Getränke, Tiramisu-Sorten, Frühstücksplatten oder Preise, wenn du keine zuverlässige aktuelle Quelle findest.

Wenn du bei der Recherche weitere reale Gerichte findest, füge sie nur hinzu, wenn:

das Gericht eindeutig Café Zeitlos zugeordnet ist
Name, Beschreibung und möglichst Preis erkennbar sind
die Quelle dokumentiert wird
keine vorhandene neuere Information widerspricht

INTERNATIONALISIERUNG

Implementiere:

Deutsch als Standardsprache
Englisch
Arabisch mit korrektem RTL-Layout

Bei Arabisch müssen Navigation, Textausrichtung, Icons und Abstände sauber gespiegelt werden.

Gerichtsnamen können ihren Originalnamen behalten. Beschreibungen und Interface-Texte werden übersetzt.

Speichere die Sprachauswahl in localStorage.

ANIMATIONEN

Verwende Framer Motion sparsam und hochwertig.

Implementiere:

sanftes Hero-Reveal
leichte Bildbewegung beim Scrollen, ohne starke Parallax-Effekte
gestaffeltes Einblenden der Bestseller-Karten
dezentes Anheben der Karten auf Desktop-Hover
sanfte Übergänge beim Wechseln der Menüfilter
animiertes, zugängliches Mobile-Menü
ruhige Dialoganimationen
subtile Button-Microinteractions

Keine Animation darf die Bedienung verlangsamen.

Unterstütze prefers-reduced-motion. Bei reduzierter Bewegung müssen alle Inhalte ohne wichtige Animationen vollständig nutzbar bleiben.

PERFORMANCE

Zielwerte für den Production-Build:

Lighthouse Performance mindestens 90
Accessibility mindestens 95
Best Practices mindestens 95
SEO mindestens 95

Verwende:

lazy loading für Bilder unterhalb des sichtbaren Bereichs
explizite Bildbreiten und Bildhöhen
WebP oder AVIF, wenn möglich
responsive srcset-Varianten
Code Splitting für große Dialoge oder Galerie-Komponenten
keine unnötigen großen Bibliotheken
keine externen Runtime-Fonts
keine riesigen unkomprimierten Bilder
keinen Layout Shift durch nachladende Bilder

Das Hero-Bild darf nicht lazy geladen werden. Verwende dort fetchpriority="high", falls sinnvoll.

ACCESSIBILITY

Verwende semantisches HTML.

Alle Funktionen müssen per Tastatur bedienbar sein.

Implementiere:

Skip-Link
sichtbare Fokuszustände
sinnvolle ARIA-Labels
korrektes Dialog-Fokusmanagement
Escape zum Schließen von Dialogen
Alt-Texte für alle Bilder
ausreichende Kontraste
logische Überschriftenstruktur
keine ausschließlich farbbasierten Informationen
mindestens 44 × 44 px große Touch-Ziele

SEO

Erstelle:

aussagekräftigen Seitentitel
Meta Description
Open-Graph-Metadaten
Twitter-Card-Metadaten
robots.txt
sitemap.xml
Web-App-Manifest
Favicons oder ein neutrales CZ-Monogramm
strukturierte Daten als JSON-LD

Verwende für JSON-LD den passenden Typ CafeOrCoffeeShop.

Nimm nur verifizierte Informationen auf:

Name
Adresse
Telefon
Öffnungszeiten
Instagram
Wolt, falls korrekt verifiziert
„Fleisch 100 % halal“ nicht als Zertifizierung modellieren

Erfinde keine Bewertung, Sternezahl oder reviewCount.

GITHUB ACTIONS UND GITHUB PAGES

Erstelle:

.github/workflows/deploy.yml

Die Pipeline muss bei Push auf main und optional manuell über workflow_dispatch laufen.

Ablauf:

Checkout
Node.js installieren
npm ci
npm run lint
npm run test -- --run
npm run build
GitHub-Pages-Artefakt hochladen
auf GitHub Pages deployen

Verwende die offiziellen GitHub-Actions für Pages.

Setze passende Permissions:

contents: read
pages: write
id-token: write

Verwende eine Deployment-Concurrency-Gruppe, damit nicht mehrere Deployments gleichzeitig laufen.

Konfiguriere Vite so, dass Assets auch unter einem GitHub-Pages-Repository-Pfad funktionieren.

Ermittle im GitHub-Actions-Kontext nach Möglichkeit den Repository-Namen aus GITHUB_REPOSITORY und verwende ihn als Base Path. Lokal muss die Anwendung weiterhin unter / funktionieren.

Erstelle keinen Domain- oder CNAME-Code.

README

Erstelle eine vollständige README.md mit:

Projektbeschreibung
Technologie-Stack
lokale Installation
Development-Start
Build
Tests
Linting
Bildverwaltung
Menüdaten aktualisieren
Sprachen aktualisieren
GitHub-Pages-Deployment
Aktivierung von GitHub Pages mit „GitHub Actions“ als Source
Hinweis zu Bildrechten
Hinweis, dass Preise vor Veröffentlichung bestätigt werden müssen

TESTS

Erstelle sinnvolle Tests für mindestens:

Rendering der Hero-Section
Öffnen und Schließen des Mobile-Menüs
Filtern der Speisekarte
Suche nach einem Gericht
leeren Suchzustand
Sprachwechsel
Öffnen eines Gericht-Dialogs
Reservierungsplaner erzeugt eine Zusammenfassung
Öffnungszeiten werden korrekt angezeigt

QUALITÄTSANFORDERUNGEN

Keine TypeScript-Fehler.
Keine ESLint-Fehler.
Keine kaputten Imports.
Keine leeren Buttons.
Keine Links mit href="#".
Keine Konsolenfehler.
Keine fehlenden React-Keys.
Keine ungenutzten Variablen.
Keine erfundenen Geschäftsdaten.
Kein Backend.
Keine API-Secrets.
Keine ungeschützten persönlichen Daten.
Keine Bilder anderer Restaurants.
Keine Uber-Eats-Verlinkung.
Keine falsche Aussage über bestätigte Reservierungen.

Führe am Ende mindestens aus:

npm install
npm run lint
npm run test -- --run
npm run build

Behebe alle Fehler, bevor du die Aufgabe abschließt.

GIT

Falls sich der neue Projektordner innerhalb eines bestehenden Git-Repositories befindet, verändere keine fremden Projekte.

Erstelle nach Möglichkeit einen eigenen Branch:

feature/cafe-zeitlos-concept

Committe nur Dateien dieses Projekts.

Wenn ein Remote vorhanden ist und die Berechtigungen das Pushen erlauben, pushe den Branch erst, nachdem Lint, Tests und Build erfolgreich waren.

Falls kein Push möglich ist, gib mir die genauen Git-Befehle an, die ich ausführen muss.

ABSCHLIESSENDE ANTWORT

Berichte am Ende konkret:

welche Dateien und Hauptkomponenten erstellt wurden
welches Gericht im Hero verwendet wird
welche realen Bilder gefunden wurden
welche Bilder fehlen
wo die Bildquellen dokumentiert sind
welche Menüdaten als zu bestätigend markiert wurden
ob Linting erfolgreich war
ob alle Tests erfolgreich waren
ob der Production-Build erfolgreich war
ob der GitHub-Actions-Workflow erstellt wurde
ob ein Commit und Push durchgeführt wurden
welche manuellen Schritte für GitHub Pages noch nötig sind

Schreibe nicht nur, dass alles fertig ist. Nenne die tatsächlichen Ergebnisse der ausgeführten Befehle.

[1]: https://www.instagram.com/cafezeitlos_bs/?utm_source=chatgpt.com "(@cafezeitlos_bs) • Instagram photos and videos"
[2]: https://braunschweig.t-online.de/region/braunschweig/id_101082388/braunschweig-neues-cafe-zeitlos-am-rebenring-eroeffnet-grosser-andrang.html "Braunschweig: Neues Café Zeitlos am Rebenring eröffnet – großer Andrang"
[3]: https://wolt.com/de/deu/brunswick/restaurant/cafe-zeitlos-1?srsltid=AfmBOor1jWNIUlFtxWfQEZJjQNYazmJ8xm7TiPNiRss92qwabEhstImv "Café Zeitlos | Wolt |  Lieferservice | Braunschweig"
[4]: https://www.ubereats.com/de/store/cafe-zeitlos/zAdMdqpPSLOKMtsIrXD0Iw?srsltid=AfmBOorrceqvhdRxmzGhwjUB2TfMUMSTkfNUS12XGkJW25UPxgBKsLTl "Café Zeitlos  | Menu | Braunschweig | Uber Eats"
[5]: https://www.speisekarte.de/braunschweig/restaurant/cafe_zeitlos/speisekarte "Speisekarte Café Zeitlos in Braunschweig"
