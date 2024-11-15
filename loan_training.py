# Import necessary libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load the dataset
df = pd.read_csv('data\LoanData_Train.csv')  # Replace with the path to your CSV

# Display basic info
print("Dataset loaded successfully!")
print(df.head())

# Drop rows with any missing values
initial_shape = df.shape
df = df.dropna()
final_shape = df.shape
print(f"Rows before dropping NaN: {initial_shape[0]}, Rows after dropping NaN: {final_shape[0]}")


# Calculate the 'Income_to_Loan_Ratio' (ApplicantIncome / LoanAmount)
df['Income_to_Loan_Ratio'] = df['ApplicantIncome'] / df['LoanAmount']

# Encode categorical variables
label_encoders = {}
categorical_columns = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
for column in categorical_columns:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# Separate features (X) and target (y)
X = df.drop('Loan_Status', axis=1)
y = df['Loan_Status']

print(df.columns)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Classifier
model = RandomForestClassifier(random_state=42)
import numpy as np

# Identify rows with NaN, infinity, or negative infinity in X_train and X_test
valid_train_indices = ~X_train.isin([np.inf, -np.inf]).any(axis=1) & X_train.notna().all(axis=1)
valid_test_indices = ~X_test.isin([np.inf, -np.inf]).any(axis=1) & X_test.notna().all(axis=1)

# Keep only the valid rows in X_train, X_test, y_train, and y_test
X_train = X_train[valid_train_indices]
y_train = y_train[valid_train_indices]
X_test = X_test[valid_test_indices]
y_test = y_test[valid_test_indices]

# Check if the lengths match
print(f"Training data length: {len(X_train)}, {len(y_train)}")
print(f"Testing data length: {len(X_test)}, {len(y_test)}")



model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# Save the model and label encoders
joblib.dump(model, 'loan_status_model.pkl')
joblib.dump(label_encoders, 'label_encoders.pkl')
print("Model and encoders saved!")

# Load the model to predict for a new farmer
def predict_loan_status(new_data):
    # Load saved model and encoders
    model = joblib.load('loan_status_model.pkl')
    label_encoders = joblib.load('label_encoders.pkl')

    # Encode new data
    for column in label_encoders.keys():
        if column in new_data:
            new_data[column] = label_encoders[column].transform([new_data[column]])[0]

    # Calculate the Income to Loan Ratio for new data
    new_data['Income_to_Loan_Ratio'] = new_data['ApplicantIncome'] / new_data['LoanAmount']

    # Predict loan status
    features = [new_data[col] for col in X.columns]
    prediction = model.predict([features])
    return label_encoders['Loan_Status'].inverse_transform(prediction)[0]

# Example: Predict for a new farmer
new_farmer = {
    'Gender': 'Male',
    'Married': 'Yes',
    'Dependents': '1',
    'Education': 'Graduate',
    'Self_Employed': 'No',
    'ApplicantIncome': 5000,
    'CoapplicantIncome': 2000,
    'LoanAmount': 150,
    'Loan_Amount_Term': 360,
    'Credit_History': 1,
    'Property_Area': 'Urban'
}

result = predict_loan_status(new_farmer)
print("Loan Status for the new farmer:", result)
