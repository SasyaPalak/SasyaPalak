# Import necessary libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Load the dataset
prod_data = pd.read_csv(r'/Users/renishkhadka/Documents/SasyaPalak/data/nepal_agriculture.csv')  # Replace with the path to your CSV

# Display basic info
print("Dataset loaded successfully!")
print(prod_data.head())

# Drop rows with any missing values
initial_shape = prod_data.shape
prod_data = prod_data.dropna()
final_shape = prod_data.shape
print(f"Rows before dropping NaN: {initial_shape[0]}, Rows after dropping NaN: {final_shape[0]}")

# Encode categorical variables
label_encoder = LabelEncoder()
prod_data['Region'] = label_encoder.fit_transform(prod_data['Region'])
prod_data['Season'] = label_encoder.fit_transform(prod_data['Season'])
prod_data['Crop'] = label_encoder.fit_transform(prod_data['Crop'])

# Calculate the features (X) and target (y)
X = prod_data[['Region', 'Season', 'Crop', 'Area (hectares)']]
y = prod_data['Production (tons)']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Absolute Error: {mae}")
print(f"RÂ² Score: {r2}")

# Save the model
joblib.dump(model, 'crop_yield_model.pkl')
print("Model saved!")

# Load the model and make a prediction for a new sample
def predict_crop_yield(new_data, model_path='crop_yield_model.pkl'):
    """
    Predict the crop yield for new data based on the trained model.

    Parameters:
    - new_data (dict): A dictionary with 'Region', 'Season', 'Crop', and 'Area' as keys.
    - model_path (str): Path to the saved model file.

    Returns:
    - float: Predicted crop yield.
    - str: Evaluation of whether the yield is "good".
    """
    # Load the saved model
    model = joblib.load(model_path)

    # Prepare the input data
    new_sample = np.array([[new_data['Region'], new_data['Season'], new_data['Crop'], new_data['Area']]])

    # Predict crop yield
    predicted_yield = model.predict(new_sample)[0]

    # Define the "good" crop yield threshold (average of the training dataset's yields)
    good_yield_threshold = y.mean()

    # Check if the yield is "good"
    is_good_yield = "GOOD" if predicted_yield > good_yield_threshold else "NOT GOOD"

    return predicted_yield, is_good_yield

# Example usage for a new sample
