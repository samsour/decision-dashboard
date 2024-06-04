import requests
from bs4 import BeautifulSoup

def check_link_and_get_h1(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            h1_tag = soup.find('h1')
            if h1_tag:
                return h1_tag.text.strip()
        return None
    except requests.RequestException as e:
        print(f"Error checking {url}: {e}")
        return None

def crawl_links(base_url, start_year, max_year, max_number, al_suffixes, al_start_year):
    available_links = []
    consecutive_years_not_found = 0

    for year in range(start_year, max_year + 1):
        year_found = False
        consecutive_not_found = 0
        al_search_active = True
        consecutive_al_not_found = 0

        for number in range(1, max_number + 1):
            # Check the main URL
            url = f"{base_url}{year}-{str(number).zfill(2)}"
            h1_content = check_link_and_get_h1(url)
            if h1_content:
                print(f"Available: {url} - {h1_content}")
                available_links.append((url, h1_content))
                consecutive_not_found = 0
                year_found = True
            else:
                print(f"Not available or no <h1> found: {url}")
                consecutive_not_found += 1

            if consecutive_not_found >= 3:
                print(f"Skipping to next year after {consecutive_not_found} consecutive misses.")
                break

            # Check the URLs with suffixes if applicable
            if year >= al_start_year and al_search_active:
                al_found = False
                for suffix in al_suffixes:
                    al_url = f"{base_url}{year}-{str(number).zfill(2)}-{suffix}"
                    al_h1_content = check_link_and_get_h1(al_url)
                    if al_h1_content:
                        print(f"Available: {al_url} - {al_h1_content}")
                        available_links.append((al_url, al_h1_content))
                        consecutive_al_not_found = 0
                        year_found = True
                        al_found = True
                        break  # Stop checking other suffixes for this number
                    else:
                        print(f"Not available or no <h1> found: {al_url}")
                        consecutive_al_not_found += 1

                if not al_found:
                    consecutive_al_not_found += 1

                if consecutive_al_not_found >= 3:
                    print(f"Stopping '-{suffix}' search for the current year after {consecutive_al_not_found} consecutive misses.")
                    al_search_active = False

        if not year_found:
            consecutive_years_not_found += 1
            if consecutive_years_not_found >= 3:
                print(f"Stopping crawl after {consecutive_years_not_found} consecutive years with no entries.")
                break
        else:
            consecutive_years_not_found = 0

    return available_links

def save_links_to_file(links, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        for link, h1_content in links:
            file.write(f"{link} - {h1_content}\n")

if __name__ == "__main__":
    base_url = 'https://www.it-planungsrat.de/beschluss/beschluss-'
    start_year = 2010  # Startjahr
    max_year = 2030  # Endjahr (falls nicht früher gestoppt)
    max_number = 100  # Maximal mögliche Nummer
    al_suffixes = ['al', 'al-runde']  # Suffixe für zusätzliche Links
    al_start_year = 2020

    available_links = crawl_links(base_url, start_year, max_year, max_number, al_suffixes, al_start_year)
    save_links_to_file(available_links, 'available_links.txt')

    print("Done. Available links with <h1> content are saved in 'available_links.txt'")
