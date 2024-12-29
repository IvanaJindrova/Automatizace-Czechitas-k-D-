export function jdiNaRegistraci(page) {
    return page.goto('/registrace')
}

export function jmenoAPrijmeni(page) {
    return page.getByLabel("Jméno a příjmení")
}

export function emailPole(page) {
    return page.getByLabel("Email")
}

export function hesloPole(page) {
    return page.getByLabel("Heslo")
}

export function kontrolaHeslaPole(page) {
    return page.getByLabel("Kontrola hesla")
}

export function tlacitkoZaregistrovat(page) {
    return page.getByRole("button", { name: "Zaregistrovat" })
}

export function prihlasen(page) {
    return page.getByRole("button", { name: "Iv Jindrová" })
}

export function neprihlasen(page) {
    return page.getByRole('link', { name: ' Přihlásit' })
}

export function generujNáhodneIco() {
    return String(Math.floor(Math.random() * 90000000) + 10000000)
}

export function generujNazevSkoly() {
    const krajskáMěsta = [
        "Praha", "Brno", "Ostrava", "Plzeň", "Liberec", 
        "Hradec Králové", "Olomouc", "Pardubice", "Ústí nad Labem", 
        "Zlín", "České Budějovice"
    ];
    
    const typSkoly = Math.random() < 0.5 ? "ZŠ" : "MŠ";

    const randomIndex = Math.floor(Math.random() * krajskáMěsta.length);
    const mesto = krajskáMěsta[randomIndex];

    const cisloSkoly = Math.floor(Math.random() * 100) + 1;

    return `${typSkoly} ${mesto} ${cisloSkoly}`;
}

export function generujZastupce() {
    const jmena = [
        "Alena", "Andrea", "Barbora", "Cecílie", "Daniela", 
        "Evžénie", "Gabriela", "Ivana", "Jitka", 
        "Karolína", "Lucie"
    ];

    const prijmeni = [
        "Nová", "Stará", "Zelená", "Červená", "Fialová", 
        "Novotná", "Nováková", "Müllerová", "Zemanová", 
        "Grosmanová", "Dvořáková"
    ];
    
    const titul = Math.random() < 0.5 ? "Ing." : "Mgr.";

    const nahodneJmeno = jmena[Math.floor(Math.random() * jmena.length)];
    const nahodnePrijmeni = prijmeni[Math.floor(Math.random() * prijmeni.length)];

    return `${titul} ${nahodneJmeno} ${nahodnePrijmeni}`;
}

export function generujDnesniDen() {
    const dnes = new Date();
    const rok = dnes.getFullYear();
    const mesic = dnes.getMonth() + 1; 
    const den = dnes.getDate();
    const datumJakoRetezec = `${den}.${mesic}.${rok}`;
    console.log(datumJakoRetezec); 
    return datumJakoRetezec
}

export function pridejNahodneDnyKDatu(datum) {
    function generujNahodneCislo() {
      return Math.floor(Math.random() * 11) + 4;
    }  
   
    const nahodnyPocetDni = generujNahodneCislo();

    datum.setDate(datum.getDate() + nahodnyPocetDni);
  
    return datum.toLocaleDateString('cs-CZ');
  }

export async function ziskejPlaceholderText(selector, page) {
    const element = await page.$(selector);
    return await element.evaluate(element => element.placeholder);
  }