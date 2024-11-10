from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

# Load the trained model (assuming you've saved it as model.pkl)
try:
    model = joblib.load("model.pkl")
except Exception as e:
    model = None
    print("Model loading failed:", e)

# Define input data schema
class FlightData(BaseModel):
    departure_time: int
    flight_number: int
    airline: str
    weather_condition: str

@app.post("/predict")
async def predict(data: FlightData):
    input_df = pd.DataFrame([data.dict()])
    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=model.feature_names_in_, fill_value=0)
    prediction = model.predict(input_df)[0]
    return {"prediction": int(prediction)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


