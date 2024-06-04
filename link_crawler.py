import requests
from bs4 import BeautifulSoup

def check_link(url):
    try:
        response = requests.head(url, allow_redirects=True)
        return response.status_code == 200
    except requests.RequestException as e:
        print(f"Error checking {url}: {e}")
        return False

def crawl_links(base_url, years, numbers):
    available_links = []
    for year in years:
        for number in numbers:
            url = f"{base_url}{year}-{number}"
            if check_link(url):
                print(f"Available: {url}")
                available_links.append(url)
            else:
                print(f"Not available: {url}")
    return available_links

def save_links_to_file(links, filename):
    with open(filename, 'w') as file:
        for link in links:
            file.write(link + '\n')

if __name__ == "__main__":
    base_url = 'https://www.it-planungsrat.de/beschluss/beschluss-'
    years = range(2020, 2024)  # Beispieljahre von 2020 bis 2023
    numbers = range(1, 101)  # Beispielnummern von 1 bis 100

    available_links = crawl_links(base_url, years, numbers)
    save_links_to_file(available_links, 'available_links.txt')

    print("Done. Available links are saved in 'available_links.txt'")
