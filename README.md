# Decision Scraper

This repository contains a Python-based web scraping tool designed to extract decision links and their headlines from the IT-Planungsrat website. The scraped data is stored in a JSON file and displayed on a web page with filtering capabilities. This project is useful for gathering and analyzing decision information efficiently.

[![Netlify Status](https://api.netlify.com/api/v1/badges/beb15d4b-2907-4950-b36a-ffb0e7f0cfc5/deploy-status)](https://app.netlify.com/sites/it-plr-scraper/deploys)

## Key Features

- Scrapes decision links and headlines from specified URLs.
- Supports additional suffixes like `-al` and `-al-runde`.
- Stores the extracted data in a structured JSON file.
- Provides a web interface to view and filter the data.
- Handles consecutive misses to optimize the scraping process.

## Technologies Used

- Python
- BeautifulSoup (for web scraping)
- JSON (for data storage)
- HTML, CSS, JavaScript (for web interface)
- Python's HTTP server (for local development)

## How to Use

1. **Clone the repository:**
```sh
git clone https://github.com/samsour/it-plr-decision-scraper.git
```

2. **Navigate into the project directory:**
```sh
cd decision-scraper
```

3. **Install required Python packages:**
```sh
pip install requests beautifulsoup4
```

4. **Run the scraper:**
```sh
python scraper.py
```

5. **Start the local server:**
```sh
npm i

npm run start
```

6. **Open your web browser and navigate to:**
```
http://localhost:9000
```

## Example HTML Content of a Page

```html
<article id="c211" class="ce-module v-main fitkodecisions-details" data-js-module="fitkodecisions-details" data-mk="1">
    <h1>Nutzung eines Online-Dienstes durch die IHK FOSA</h1>
    <h4>AL-Runde | 30.04.2024 | 31. Sitzung AL-Runde | Beschluss 2024/08-AL</h4>
    <div class="rte-container">
        <p class="AufzhlungBulletpoints1FITKO"><strong>Beschluss:</strong></p>
        <p class="AufzhlungBulletpoints1FITKO">Die AL-Runde beschließt, die Kosten für die Nutzung des Online-Dienstes „Anerkennung ausländischer Berufsqualifikationen“, soweit sie durch die Nutzung seitens der IHK FOSA entstehen, zu 100% aus dem Stammbudget der FITKO ausnahmsweise in diesem expliziten Einzelfall zu finanzieren. Der Online-Dienst wird der IHK FOSA durch die FITKO in Form eines (unentgeltlichen) Nachnutzungsvertrages über den FIT-Store zur Verfügung gestellt.</p>
    </div>
    <span class="fitkodecisions-details__back">
        <a class="fitkodecisions-details__back-history" href="#" aria-hidden="false">
            <div class="shortcut-links-element__icon-container">
                <i class="svg-itpl_icon_arrow_20px_blue"></i>
                <i class="svg-itpl_icon_arrow_20px"></i>
            </div>
            <span>Zurück zur Übersicht</span>
        </a>
        <a aria-hidden="true" class="fitkodecisions-details__back-overview" title="Öffnet die Übersichtseite der Beschlüsse" href="/beschluesse-informationen">
            <div class="shortcut-links-element__icon-container">
                <i class="svg-itpl_icon_arrow_20px_blue"></i>
                <i class="svg-itpl_icon_arrow_20px"></i>
            </div>
            <span>Zur Übersicht</span>
        </a>
    </span>
</article>
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
