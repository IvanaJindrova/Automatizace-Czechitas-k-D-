import { expect, test } from "@playwright/test";
import { StrankaNoveObjednavky } from "./pages/novaObjednavka.page";
import { generujDnesniDen, generujNazevSkoly, generujNáhodneIco, generujZastupce, neprihlasen, pridejNahodneDnyKDatu, ziskejPlaceholderText } from "../../helpers/functions";

test.describe("Zobrazení formuláře objednávky", async () => {
    test.beforeEach(async ({page}) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);
        await strankaNoveObjednavky.otevrit();

        const neprihlaseni = await neprihlasen(page);
        await expect(neprihlaseni).toHaveText("Přihlásit");
    });

    test("Lze zobrazit objednávkový formulář", async ({ page }) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);
        await strankaNoveObjednavky.otevrit();
        await expect(strankaNoveObjednavky.heading).toBeVisible();
    })

    test("Lze prokliknout na stránku s objednávkou", async ({ page }) => {
        await page.goto("https://team8-2022brno.herokuapp.com");

        const proklikProUcitele = new StrankaNoveObjednavky(page);
        await expect(proklikProUcitele.proUcitele).toBeVisible();
        await proklikProUcitele.proUcitele.click();

        const proklikObjednavkaMSZS = new StrankaNoveObjednavky(page);
        await proklikObjednavkaMSZS.objednavkaMSZS.click();

        await page.getByRole('button', { name: 'Pro učitelé' }).click();
        await page.locator('.dropdown-item').filter({ hasText: 'Objednávka pro MŠ/ZŠ' }).click();
    })

    test("Lze vyplnit IČO a dojde k hledání v Ares", async ({ page }) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);
        const icoNahodne = await generujNáhodneIco();
        await strankaNoveObjednavky.ico.fill(icoNahodne);        
        console.log(icoNahodne);
        await expect(strankaNoveObjednavky.ico).toHaveValue(icoNahodne);

        await strankaNoveObjednavky.page.locator('#ico').press('Enter');
    
        await expect(strankaNoveObjednavky.odberatel).not.toBeEditable();
        await expect(strankaNoveObjednavky.celaAdresa).not.toBeEditable();

        const selektorOdberatel = '#client';
        const placeHoldTextOdb = await ziskejPlaceholderText(selektorOdberatel, strankaNoveObjednavky.page);
        console.log('Text z placeholderu na poli Odběratel:', placeHoldTextOdb);

        const selektorAdresa = '#address';
        const placeHoldTextAdr = await ziskejPlaceholderText(selektorAdresa, strankaNoveObjednavky.page);
        console.log('Text z placeholderu na poli Úplná adresa:', placeHoldTextAdr);

        await expect(strankaNoveObjednavky.toggle).toBeVisible();
    });
})

test.describe("Vytvoření objednávky", async () => {
    test.beforeEach(async ({page}) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);
        await strankaNoveObjednavky.otevrit();

        const neprihlaseni = await neprihlasen(page);
        await expect(neprihlaseni).toHaveText("Přihlásit");
    });

    test("Validní vyplnění a odeslání objednávky", async ({ page }) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);

        //Nejprve chci vyplnit název odběratele
        const odberatelNahodne = await generujNazevSkoly();
        await strankaNoveObjednavky.odberatel.fill(odberatelNahodne);
        console.log(odberatelNahodne);
        await expect(strankaNoveObjednavky.odberatel).toHaveValue(odberatelNahodne);

        //Pak až IČO
        const icoNahodne = await generujNáhodneIco();
        await strankaNoveObjednavky.ico.fill(icoNahodne);        
        console.log(icoNahodne);
        await expect(strankaNoveObjednavky.ico).toHaveValue(icoNahodne);

        await strankaNoveObjednavky.celaAdresa.fill("Nová ulice 1685/8, 140 00 Praha");

        const zastupceNahodne = await generujZastupce();
        await strankaNoveObjednavky.zastupce.fill(zastupceNahodne);        
        console.log(zastupceNahodne);
        await expect(strankaNoveObjednavky.zastupce).toHaveValue(zastupceNahodne);

        await strankaNoveObjednavky.kontaktniOsoba.fill(zastupceNahodne);
        await strankaNoveObjednavky.telefon.fill("796852147");
        await strankaNoveObjednavky.email.fill("skolaMSZS@gmail.com");

        const dnesek = await generujDnesniDen();
        await strankaNoveObjednavky.startDate.fill(dnesek);
        
        const mojeDatum = new Date();
        const noveDatum = pridejNahodneDnyKDatu(mojeDatum);
        await strankaNoveObjednavky.endDate.fill(noveDatum);

        await strankaNoveObjednavky.primestkyTabor.click();
        await strankaNoveObjednavky.pocetDeti.fill("12");
        await strankaNoveObjednavky.vekDeti.fill("7");
        await strankaNoveObjednavky.doprovod.fill("4");
        await strankaNoveObjednavky.ulozitObjednavku.click();
        //await page.pause(50000)

        //await expect(page.locator('Děkujeme za objednávku')).toHaveText("Děkujeme za objednávku");

    })

    test("Nelze odeslat prázdnou objednávku", async ({ page }) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);
    
        await strankaNoveObjednavky.primestkyTabor.click();
        await strankaNoveObjednavky.ulozitObjednavku.click();

        await expect(strankaNoveObjednavky.heading).toBeVisible();
    })
})