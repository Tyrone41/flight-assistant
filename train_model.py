import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Example dataset - replace with your actual dataset if you have one
data = pd.DataFrame({
    'departure_time': [800, 1300, 1500, 1100, 900, 1700, 1200],
    'flight_number': [101, 102, 103, 104, 105, 106, 107],
    'airline': ['Delta', 'American', 'Southwest', 'Delta', 'American', 'Southwest', 'Delta'],
    'weather_condition': ['Clear', 'Rain', 'Clear', 'Fog', 'Clear', 'Rain', 'Fog'],
    'delay': [0, 1, 0, 1, 0, 1, 1]
})

# Prepare features and labels
X = pd.get_dummies(data.drop(columns=['delay']))
y = data['delay']

# Train a simple RandomForest model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model to a file named model.pkl
joblib.dump(model, "model.pkl")
print("Model saved as model.pkl")
