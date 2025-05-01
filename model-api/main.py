from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("model.joblib")  


class MatchInput(BaseModel):
    age: int
    blood_type: str
    organ: str
    hla_type: str
    urgency: int
    gender: str
    city: str


def preprocess(data: MatchInput):
    return np.array([ 
        data.age,
        1 if data.gender == "Male" else 0,
        0 if data.blood_type == "A+" else 1,  
        int(data.urgency),
    ]).reshape(1, -1)

@app.post("/predict")
def predict_match(input_data: MatchInput):
    X = preprocess(input_data)
    prediction = model.predict(X)
    return {"match_result": int(prediction[0])}
