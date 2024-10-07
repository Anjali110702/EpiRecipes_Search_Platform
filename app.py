from flask import Flask, request, jsonify
from opensearchpy import OpenSearch
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["http://localhost:3000"])


# OpenSearch client
client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}]
)

INDEX_NAME = "epirecipes"


# Route for searching recipes
@app.route('/search', methods=['GET'])
def search_recipes():
    query = request.args.get('q', '')
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 10))

    # OpenSearch query
    search_query = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["title", "ingredients", "categories"]
            }
        },
        "from": (page - 1) * size,
        "size": size
    }

    # Perform search
    response = client.search(index=INDEX_NAME, body=search_query)
    results = [hit["_source"] for hit in response["hits"]["hits"]]

    # Remove duplicates from results
    unique_titles = set()
    unique_results = []
    for result in results:
        if result["title"] not in unique_titles:
            unique_titles.add(result["title"])
            unique_results.append(result)
    
    return jsonify({
        "results": unique_results,
        "total": response["hits"]["total"]["value"]
    })

if __name__ == '__main__':
    app.run(debug=True)
