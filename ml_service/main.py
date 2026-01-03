
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np # Import numpy for argmax

app = FastAPI(title="ML Decision API")

# ---- Load model once ----
with open("skill_predictor.pkl", "rb") as f:
    model = pickle.load(f)

# ---- Input schema ----
class SkillInput(BaseModel):
    avg_accuracy: float
    avg_time: float
    max_difficulty: int
    retry_rate: float
    quizzes_attempted: int

# ---- Output schema ----
class SkillOutput(BaseModel):
    skill_level: str
    next_difficulty: str
    revision_required: bool
    confidence_score: float

def label_to_skill(label: int) -> str:
    return {0: "Beginner", 1: "Intermediate", 2: "Advanced"}.get(label, "Unknown")

@app.post("/predict-skill", response_model=SkillOutput)
def predict_skill(data: SkillInput):
    # Convert avg_accuracy to percentage (0-100) before passing to model
    processed_avg_accuracy = data.avg_accuracy * 100

    X = pd.DataFrame([{
        "avg_accuracy": processed_avg_accuracy,
        "avg_time": data.avg_time,
        "max_difficulty": data.max_difficulty,
        "retry_rate": data.retry_rate,
        "quizzes_attempted": data.quizzes_attempted
    }])

    print(f"DEBUG: DataFrame columns for prediction (v2): {X.columns.tolist()}") # Added version identifier

    # Make prediction
    pred_label = model.predict(X)[0]
    skill_level = label_to_skill(pred_label)

    # -------- Decision Logic --------
    revision_required = data.avg_accuracy < 0.5 or data.retry_rate > 0.3

    if skill_level == "Beginner":
        next_difficulty = "Easy"
    elif skill_level == "Intermediate":
        next_difficulty = "Medium"
    else: # Advanced
        next_difficulty = "Hard"

    confidence_score = round(
        0.6 * data.avg_accuracy + 0.4 * (1 - data.retry_rate),
        2
    )
    # --------------------------------------------------------

    final_response = {
        "skill_level": skill_level,
        "next_difficulty": next_difficulty,
        "revision_required": revision_required,
        "confidence_score": confidence_score
    }
    print(f"DEBUG: Final API response dict (v2): {final_response}") # Added version identifier
    return final_response
