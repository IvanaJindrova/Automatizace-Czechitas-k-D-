export class StrankaNoveObjednavky {
    constructor(page) {
        this.page = page;
        this.heading = this.page.getByRole("heading", { level: 3 });
        this.proUcitele = this.page.getByRole('button', { name: 'Pro učitelé' });
        this.objednavkaMSZS = this.page.getByRole('link', { name: 'Objednávka pro MŠ/ZŠ' })
        this.ico = this.page.getByLabel('IČO')
        this.odberatel = this.page.getByLabel('Odběratel')
        this.celaAdresa = this.page.getByLabel('Úplná adresa')
        this.toggle = this.page.getByText('Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně')
        this.primestkyTabor = this.page.getByRole('tab', { name: 'Příměstský tábor' })
        this.ulozitObjednavku = this.page.getByRole('button', { name: 'Uložit objednávku' })

        this.zastupce = this.page.getByLabel('Zastoupena - ředitel(ka) školy')
        this.kontaktniOsoba = this.page.getByLabel('Jméno a příjmení')
        this.telefon = this.page.getByLabel('Telefon')
        this.email = this.page.getByLabel('Email')
        this.startDate = this.page.getByLabel('Upřednostňovaný termín 1')
        this.endDate = this.page.locator('#end_date_1')
        this.pocetDeti = this.page.getByRole('spinbutton', { name: 'Počet dětí' })
        this.vekDeti = this.page.getByRole('textbox', { name: 've věku' })
        this.doprovod = this.page.getByRole('spinbutton', { name: 'Počet pedagogického doprovodu' })
    }

    async otevrit() {
        await this.page.goto("/objednavka/pridat")
    }


  

}