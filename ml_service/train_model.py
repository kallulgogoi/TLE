import pandas as pd
import numpy as np
import pickle
from sklearn.tree import DecisionTreeClassifier

# 1. Create Dummy Training Data
# Features: [avg_accuracy (0-100), avg_time (sec), max_difficulty (1-3), retry_rate (0-1), quizzes_attempted]
# Labels: 0 = Beginner, 1 = Intermediate, 2 = Advanced

data = [
    # Beginners: Low accuracy, low difficulty, high retry rate
    [30, 120, 1, 0.8, 5, 0],
    [45, 90, 1, 0.5, 3, 0],
    [20, 200, 1, 0.9, 2, 0],
    
    # Intermediates: Moderate accuracy, medium difficulty
    [65, 60, 2, 0.3, 15, 1],
    [70, 45, 2, 0.2, 20, 1],
    [55, 80, 2, 0.4, 10, 1],

    # Advanced: High accuracy, hard difficulty, fast time
    [90, 30, 3, 0.0, 50, 2],
    [85, 40, 3, 0.1, 40, 2],
    [95, 20, 3, 0.0, 60, 2]
]

# Convert to DataFrame
df = pd.DataFrame(data, columns=[
    "avg_accuracy", "avg_time", "max_difficulty", "retry_rate", "quizzes_attempted", "label"
])

X = df.drop("label", axis=1)
y = df["label"]

# 2. Train the Model
model = DecisionTreeClassifier()
model.fit(X, y)

# 3. Save the Model
with open("skill_predictor.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as 'skill_predictor.pkl'")