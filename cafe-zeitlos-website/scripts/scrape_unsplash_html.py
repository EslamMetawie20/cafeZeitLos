import urllib.request
import urllib.parse
import json
import re

def search_unsplash(query):
    url = f"https://unsplash.com/s/photos/{urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Look for the __NEXT_DATA__ script tag or modern equivalent
            # Unsplash might have changed their structure.
            # Let's just look for direct image URLs: https://images.unsplash.com/photo-...
            matches = re.findall(r'https://images\.unsplash\.com/photo-([a-zA-Z0-9\-]+)\?', html)
            if matches:
                # return unique matches
                return list(dict.fromkeys(matches))
            return []
    except Exception as e:
        print(f"Error fetching {query}: {e}")
        return []

if __name__ == "__main__":
    queries = ["falafel bowl", "bagel", "avocado toast", "pancakes"]
    results = {}
    for q in queries:
        results[q] = search_unsplash(q)[:3]
    print(json.dumps(results, indent=2))
