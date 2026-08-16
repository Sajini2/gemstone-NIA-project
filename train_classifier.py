import pandas as pd
import numpy as np
from xgboost import XGBClassifier
import pickle
import os

print("Loading datasets...")
diamonds = pd.read_csv('data/diamonds_clean.csv')
cubic = pd.read_csv('data/gemstone_clean.csv')

# Label them
diamonds['target'] = 1 # Diamond
cubic['target'] = 0    # Cubic Zirconia

# The features must match what the model expects: 'carat', 'cut', 'color', 'clarity', 'depth', 'table', 'x', 'y', 'z', 'price'
features = ['carat', 'cut', 'color', 'clarity', 'depth', 'table', 'x', 'y', 'z', 'price']

# Combine
combined = pd.concat([diamonds, cubic], ignore_index=True)

# Drop contradictory duplicates (same features but different labels)
# keep=False removes BOTH copies of the duplicate
combined = combined.drop_duplicates(subset=features, keep=False)

X = combined[features]
y = combined['target']

# Calculate scale_pos_weight for class imbalance
ratio = float(np.sum(y == 0)) / np.sum(y == 1) if np.sum(y == 1) > 0 else 1.0

print("Training XGBoost Classifier...")
model = XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1,
    random_state=42,
    use_label_encoder=False,
    eval_metric='logloss',
    scale_pos_weight=ratio
)

model.fit(X, y)

os.makedirs('models', exist_ok=True)
model_path = 'models/gem_classifier.json'
model.save_model(model_path)
    
print(f"Classifier saved successfully to {model_path}!")
