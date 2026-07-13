import urllib.request
import re
import json
import sys

def search_unsplash(query):
    url = f"https://unsplash.com/napi/search/photos?query={urllib.parse.quote(query)}&per_page=15"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            return [res['id'] for res in data.get('results', [])]
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return []

if __name__ == "__main__":
    queries = [
        "chicken bowl", "salmon bowl", "falafel bowl", "bagel", "salmon bagel", "pastrami bagel", "chicken bagel",
        "avocado toast", "sandwich", "french toast", "pancakes", "salad", "burger", "chicken burger"
    ]
    results = {}
    for q in queries:
        results[q] = search_unsplash(q)
    print(json.dumps(results, indent=2))
