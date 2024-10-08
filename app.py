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

@app.route('/filter', methods=['GET'])
def filter_recipes():
    query = request.args.get('q', '')  # The search query (if any)
    category = request.args.get('category', '')  # The category to filter
    calories_min = request.args.get('caloriesMin', '')
    calories_max = request.args.get('caloriesMax', '')
    rating_min = request.args.get('ratingMin', '')
    rating_max = request.args.get('ratingMax', '')
    page = int(request.args.get('page', 1))
    size = int(request.args.get('size', 10))

    # Build the base query
    filter_conditions = []

    # Add search condition if query is provided
    if query:
        filter_conditions.append({
            "multi_match": {
                "query": query,
                "fields": ["title", "ingredients", "categories"]
            }
        })

    # Add category filter if category is provided
    if category:
        filter_conditions.append({
            "term": {
                "categories": category  # Assuming 'categories' is an exact match field
            }
        })

    # Add range filter for calories
    if calories_min or calories_max:
        range_filter = {}
        if calories_min:
            range_filter["gte"] = int(calories_min)  # Greater than or equal to
        if calories_max:
            range_filter["lte"] = int(calories_max)  # Less than or equal to
        filter_conditions.append({
            "range": {
                "calories": range_filter
            }
        })

    # Add range filter for rating
    if rating_min or rating_max:
        range_filter = {}
        if rating_min:
            range_filter["gte"] = float(rating_min)
        if rating_max:
            range_filter["lte"] = float(rating_max)
        filter_conditions.append({
            "range": {
                "rating": range_filter
            }
        })

    # Construct the OpenSearch query
    filter_query = {
        "query": {
            "bool": {
                "must": filter_conditions
            }
        },
        "from": (page - 1) * size,
        "size": size
    }

    # Perform the filtered search
    response = client.search(index=INDEX_NAME, body=filter_query)
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
@app.route('/categories', methods=['GET'])
def get_categories():
    aggregation_query = {
        "size": 0,  # We don't need the actual documents, just the aggregation
        "aggs": {
            "unique_categories": {
                "terms": {
                    "field": "categories.keyword",  # Assuming categories is a keyword field
                    "size": 100  # Adjust size as needed
                }
            }
        }
    }

    response = client.search(index=INDEX_NAME, body=aggregation_query)
    categories = [bucket["key"] for bucket in response["aggregations"]["unique_categories"]["buckets"]]

    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True)
