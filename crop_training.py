import joblib
import numpy as np
import pandas as pd

# Load the trained model and feature names
model = joblib.load('crop_yield_model.pkl')
model_features = joblib.load('model_features.pkl')

def prepare_input_data(new_data):
    df = pd.DataFrame([new_data])
    df_encoded = pd.get_dummies(df)
    
    # Ensure all expected columns are present
    for col in model_features:
        if col not in df_encoded.columns:
            df_encoded[col] = 0
    
    # Reorder columns to match the model
    df_encoded = df_encoded[model_features]
    return df_encoded.values

def predict_crop_yield(new_data):
    input_data = prepare_input_data(new_data)
    predicted_yield = model.predict(input_data)[0]
    
    good_yield_threshold = 200
    is_good_yield = "GOOD" if predicted_yield > good_yield_threshold else "NOT GOOD"
    
    return {
        "predicted_yield": predicted_yield,
        "yield_status": is_good_yield
    }

# Example usage
new_sample = {'Region': 'Terai', 'Season': 'Winter', 'Crop': 'Wheat', 'Area': 10}
result = predict_crop_yield(new_sample)
print(f"Predicted Crop Yield: {result['predicted_yield']} tons")
print(f"Crop Yield Status: The predicted yield is {result['yield_status']}.")
