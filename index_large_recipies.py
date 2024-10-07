import pandas as pd
import json
import requests

# OpenSearch settings
OPENSEARCH_URL = "http://localhost:9200/_bulk"
INDEX_NAME = "epirecipes"

# Function to convert recipes to bulk format
def generate_bulk_data(recipes):
    bulk_data = ""
    for _, recipe in recipes.iterrows():
        # Create index action for each recipe
        bulk_data += f'{{ "index": {{ "_index": "{INDEX_NAME}" }} }}\n'
        # Add recipe data
        bulk_data += json.dumps(recipe.to_dict()) + '\n'
    return bulk_data

# Function to read and index the dataset
def index_large_dataset(file_path):
    # Load dataset with pandas
    df = pd.read_csv(file_path)

    # Check for duplicates based on 'title' and keep the first occurrence
    df_cleaned = df.drop_duplicates(subset=['title'], keep='first')

    # If you want to aggregate certain columns while keeping the unique titles
    # Uncomment the following lines to aggregate ingredients, for example
    # df_cleaned = df.groupby('title', as_index=False).agg({
    #     'ingredients': lambda x: ', '.join(x.unique()),  # Join unique ingredients
    #     'directions': 'first',  # Take the first directions
    #     'prep_time': 'mean',  # Average prep time if numerical
    #     'calories': 'mean'  # Average calories if numerical
    # })

    print("Number of original recipes:", len(df))
    print("Number of unique recipes after dropping duplicates:", len(df_cleaned))

    # If the dataset is huge, you can chunk it:
    chunk_size = 1000  # Adjust this number based on your memory capacity
    for i in range(0, len(df_cleaned), chunk_size):
        # Slice the DataFrame to get a chunk of data
        chunk = df_cleaned.iloc[i:i + chunk_size]
        bulk_data = generate_bulk_data(chunk)

        # Send bulk data to OpenSearch
        response = requests.post(OPENSEARCH_URL, data=bulk_data, headers={'Content-Type': 'application/json'})

        # Check the response
        if response.status_code == 200:
            print(f"Indexed chunk {i // chunk_size + 1} successfully.")
        else:
            print(f"Error indexing chunk {i // chunk_size + 1}: {response.text}")

# Run the indexing function
index_large_dataset('Dataset/epi_r.csv')
