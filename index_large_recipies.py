import json
import requests

# OpenSearch settings
OPENSEARCH_URL = "http://localhost:9200/_bulk"
INDEX_NAME = "epirecipes"

# Function to convert recipes to bulk format
def generate_bulk_data(recipes):
    bulk_data = ""
    for recipe in recipes:
        # Create index action for each recipe
        bulk_data += f'{{ "index": {{ "_index": "{INDEX_NAME}" }} }}\n'
        # Add recipe data
        bulk_data += json.dumps(recipe) + '\n'
    return bulk_data

# Function to read and index the large JSON file
def index_large_json(file_path):
    with open(file_path, 'r') as file:
        # Load the entire JSON content
        recipes = json.load(file)  # Directly load the list of recipes

        # If the dataset is huge, you can chunk it:
        chunk_size = 1000  # You can adjust this number based on your memory capacity
        for i in range(0, len(recipes), chunk_size):
            # Slice the list to get a chunk of recipes
            chunk = recipes[i:i + chunk_size]
            bulk_data = generate_bulk_data(chunk)

            # Send bulk data to OpenSearch
            response = requests.post(OPENSEARCH_URL, data=bulk_data, headers={'Content-Type': 'application/json'})

            # Check the response
            if response.status_code == 200:
                # Parse the response to check for individual errors
                response_json = response.json()
                if 'errors' in response_json and response_json['errors']:
                    print(f"Errors occurred in chunk {i // chunk_size + 1}: {response_json}")
                else:
                    print(f"Indexed chunk {i // chunk_size + 1} successfully.")
            else:
                print(f"Error indexing chunk {i // chunk_size + 1}: {response.text}")

# Run the indexing function
index_large_json('Dataset/full_format_recipes.json')
