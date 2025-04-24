import pandas as pd
from load_dataset import load_dataset

if __name__ == "__main__":
    # Load the dataset using the function from load_dataset.py
    dataset = load_dataset('dataset', debug=False)
    
    # Convert the dataset to a DataFrame for better visualization
    df = pd.DataFrame.from_dict(dataset)
    
    # Display the first few rows of the DataFrame
    print(df.head())