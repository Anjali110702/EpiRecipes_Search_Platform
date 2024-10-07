from flask import Flask, request, jsonify
from opensearchpy import OpenSearch

app = Flask(__name__)

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
    
    return jsonify({
        "results": results,
        "total": response["hits"]["total"]["value"]
    })

# Route for filtering recipes
@app.route('/filter', methods=['GET'])
def filter_recipes():
    category = request.args.get('category', None)
    cuisine = request.args.get('cuisine', None)
    prep_time = request.args.get('prep_time', None)

    filter_query = {"bool": {"must": []}}

    if category:
        filter_query["bool"]["must"].append({"match": {"categories": category}})
    if cuisine:
        filter_query["bool"]["must"].append({"match": {"cuisine": cuisine}})
    if prep_time:
        filter_query["bool"]["must"].append({"range": {"prep_time": {"lte": prep_time}}})

    # Perform the filter search
    response = client.search(index=INDEX_NAME, body={"query": filter_query})
    results = [hit["_source"] for hit in response["hits"]["hits"]]
    
    return jsonify({
        "results": results,
        "total": response["hits"]["total"]["value"]
    })

if __name__ == '__main__':
    app.run(debug=True)
