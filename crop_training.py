# Step 1: Import necessary libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import matplotlib.pyplot as plt
import joblib

# Step 2: Load the dataset
prod_data = pd.read_csv(r'C:\Users\khana\OneDrive\Desktop\SasyaPalak\data\nepal_agriculture.csv') # Make sure to replace 'data.csv' with your actual file path
print(prod_data.head())

# Step 3: Preprocess the data
prod_data.dropna(inplace=True)  # Remove missing values

# Encode categorical variables into numeric
label_encoder = LabelEncoder()
prod_data['Region'] = label_encoder.fit_transform(prod_data['Region'])
prod_data['Season'] = label_encoder.fit_transform(prod_data['Season'])
prod_data['Crop'] = label_encoder.fit_transform(prod_data['Crop'])

# Features (X) and Target (y)
X = prod_data[['Region', 'Season', 'Crop', 'Area (hectares)']]
y = prod_data['Production (tons)']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Training set size: {X_train.shape[0]} samples")
print(f"Testing set size: {X_test.shape[0]} samples")

# Step 4: Train the model (Linear Regression)
model = LinearRegression()
model.fit(X_train, y_train)

# Step 5: Predict crop yield on the test set
y_pred = model.predict(X_test)

# Step 6: Evaluate the model
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Absolute Error: {mae}")
print(f"R² Score: {r2}")

# Step 7: Visualize Actual vs Predicted Crop Yield
plt.scatter(y_test, y_pred)
plt.xlabel('Actual Crop Yield (tons)')
plt.ylabel('Predicted Crop Yield (tons)')
plt.title('Actual vs Predicted Crop Yield')
plt.show()

# Step 8: Check if the crop yield is "Good"
# Define what is "good" for crop yield (you can adjust this based on your dataset or domain knowledge)
good_yield_threshold = y.mean()  # Here, we assume "good" yield is above the average yield

# Predict the yield for a new sample (example: Region=1, Season=0, Crop=2, Area=500)
new_data = np.array([[1, 0, 2, 500]])  # Example: Region=1, Season=0, Crop=2, Area=500
predicted_yield = model.predict(new_data)

# Print the predicted yield
print(f"Predicted Crop Yield: {predicted_yield[0]} tons")

# Compare with the "good" yield threshold
if predicted_yield[0] > good_yield_threshold:
    print("The predicted crop yield is GOOD!")
else:
    print("The predicted crop yield is NOT good.")

model_filename = 'crop_yield_model.pkl'
joblib.dump(model, model_filename)