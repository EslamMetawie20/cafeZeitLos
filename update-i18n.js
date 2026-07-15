const fs = require('fs');
const dePath = 'cafe-zeitlos-website/src/i18n/locales/de.json';
const enPath = 'cafe-zeitlos-website/src/i18n/locales/en.json';

const de = JSON.parse(fs.readFileSync(dePath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

de.nav.highlights = "Highlights";
en.nav.highlights = "Highlights";
de.nav.login = "Anmelden";
en.nav.login = "Sign in";
de.nav.demo_login = "Demo-Login";
en.nav.demo_login = "Demo login";
de.nav.admin_area = "Admin-Bereich";
en.nav.admin_area = "Admin area";
de.nav.staff_area = "Mitarbeiter-Bereich";
en.nav.staff_area = "Staff area";
de.nav.my_account = "Mein Konto";
en.nav.my_account = "My account";

de.login = de.login || {};
de.login.email = "E-Mail";
de.login.password = "Passwort";
de.login.show_password = "Passwort anzeigen";
de.login.hide_password = "Passwort verbergen";
de.login.submit = "Anmelden";
de.login.test_admin = "Admin testen";
de.login.test_staff = "Mitarbeiter testen";
de.login.test_customer = "Kunde testen";
de.login.back = "Zurück zur Website";

en.login = en.login || {};
en.login.email = "Email";
en.login.password = "Password";
en.login.show_password = "Show password";
en.login.hide_password = "Hide password";
en.login.submit = "Sign in";
en.login.test_admin = "Test Admin";
en.login.test_staff = "Test Staff";
en.login.test_customer = "Test Customer";
en.login.back = "Back to website";

fs.writeFileSync(dePath, JSON.stringify(de, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log("Updated i18n");
