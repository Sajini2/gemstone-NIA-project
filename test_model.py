import pandas as pd
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
import warnings
warnings.filterwarnings('ignore')

model = XGBClassifier()
model.load_model('models/gem_classifier.json')

features = ['carat', 'cut', 'color', 'clarity', 'depth', 'table', 'x', 'y', 'z', 'price']

diamonds = pd.read_csv('data/diamonds_clean.csv')
cubic = pd.read_csv('data/gemstone_clean.csv')

diamonds['target'] = 1
cubic['target'] = 0

test_data = pd.concat([diamonds, cubic], ignore_index=True)
test_data = test_data.drop_duplicates(subset=features, keep=False)

X_test = test_data[features]
y_true = test_data['target']

predictions = model.predict(X_test)

acc = accuracy_score(y_true, predictions)
print(f"Overall Accuracy: {acc:.4f}\n")
print(classification_report(y_true, predictions, target_names=['Cubic Zirconia (0)', 'Diamond (1)']))
