# train_model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from joblib import dump

# Load the dataset
df = pd.read_csv("data_bodmas.csv")

# Encode categorical features
encoders = {}
for col in ['Donor_BloodType', 'Recipient_BloodType', 'Donor_Rh', 'Recipient_Rh', 'Organ_Type']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# Features and target
X = df.drop(columns=["Donor_ID", "Recipient_ID", "Is_Match"])
y = df["Is_Match"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoders
dump(model, "model.joblib")
dump(encoders, "encoders.joblib")

print("Model and encoders saved.")
