# 💎 Gemstone Price Prediction using Nature-Inspired Feature Selection

An Nature-Inspired Algorithms (NIA) mini-project for predicting gemstone prices. This repository utilizes metaheuristic optimization techniques—namely **Genetic Algorithms (GA)** and **Particle Swarm Optimization (PSO)**—for feature selection, combined with machine learning models (**Random Forest** and **XGBoost**) to optimize prediction accuracy and model efficiency.

---

## 👥 Team Members
- **Sajini** (Index: `[Index Number]`) — Random Forest & Genetic Algorithm (GA) Implementation
- **Buddhika** (Index: `[Index Number]`) — XGBoost & Particle Swarm Optimization (PSO) Implementation

**Module Lecturer:** `[Lecturer Name]`

---

## 🏗️ Architecture & Tech Stack

### Machine Learning Core
- **Algorithms:** Random Forest Regressor, XGBoost
- **Optimization (NIA):** Genetic Algorithm (GA), Particle Swarm Optimization (PSO)
- **Libraries:** Scikit-learn, XGBoost, DEAP (for GA), PySwarms (for PSO), Pandas, NumPy

### Backend (API)
- **Framework:** Flask, Flask-CORS
- **Role:** Serves the trained models and exposes a `/predict` REST endpoint for real-time inference.

### Frontend (Dashboard)
- **Framework:** React 19, Vite, Tailwind CSS 4.0, Recharts, Framer Motion
- **Role:** Provides an interactive UI to input gemstone characteristics and view predicted prices and predicted gemstone classes.

---

## 📂 Project Repository Structure

```text
gemstone-NIA-project/
├── backend/                  # Flask API for live model inference
│   └── app.py                # Main Flask application
├── dashboard-demo/           # React + Vite frontend for the UI dashboard
│   ├── src/                  # React components and pages
│   ├── package.json          # Node dependencies
│   └── vite.config.ts        # Vite configuration
├── data/                     # Raw and preprocessed dataset files (git-ignored)
│   └── raw/                  # Place raw CSV files here (diamonds.csv, cubic_zirconia.csv)
├── models/                   # Saved trained model artifacts (.pkl, .json, .joblib)
├── notebooks/                # Jupyter Notebooks for exploration and prototyping
│   ├── sajini/               # GA & RF experiments
│   ├── buddhika/             # PSO & XGBoost experiments
│   └── final_comparison.ipynb# Final comparative analysis
├── report/                   # Final project report drafts and references
├── results/                  # Generated evaluation metrics, plots, and saved models
├── src/                      # Reusable Python scripts and modules
│   ├── preprocess_diamonds.py        # Data cleaning for diamonds
│   ├── preprocess_gemstone.py        # Data cleaning for cubic zirconia
│   ├── baseline_rf_diamonds.py       # RF Baseline training
│   ├── baseline_xgb_gemstone.py      # XGBoost Baseline training
│   ├── ga_feature_selection.py       # GA implementation
│   ├── pso_feature_selection.py      # PSO implementation
│   ├── train_ga_models.py            # Train models with GA selected features
│   ├── train_pso_models.py           # Train models with PSO selected features
│   ├── final_evaluation.py           # Evaluation script
│   └── generate_report.py            # Automated report generation
├── config.py                 # Central configuration for directory paths and parameters
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

---

## 🌿 Branching Strategy & Tasks

This project is split into two main branches off `main` for parallel development:

### 1. `sajini-ga` (Sajini's Branch)
*   **Dataset:** Diamonds Dataset Preprocessing (`data/raw/diamonds.csv`)
*   **Baseline Model:** Random Forest
*   **Optimization:** Feature selection using **Genetic Algorithm (GA)**
*   **Goal:** Optimize feature subsets to improve the Random Forest regression performance and reduce dimensionality.

### 2. `buddhika-pso` (Buddhika's Branch)
*   **Dataset:** Gemstone Dataset Preprocessing (`data/raw/cubic_zirconia.csv`)
*   **Baseline Model:** XGBoost
*   **Optimization:** Feature selection using **Particle Swarm Optimization (PSO)**
*   **Goal:** Optimize feature subsets to improve the XGBoost regression performance and reduce dimensionality.

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone <repository_url>
cd gemstone-NIA-project
```

### 2. Check out your respective branch
*   **For Sajini:** `git checkout sajini-ga`
*   **For Buddhika:** `git checkout buddhika-pso`

### 3. Setup the Python Virtual Environment (Backend & ML)
It is highly recommended to use a virtual environment:
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows):
venv\Scripts\activate

# Activate (macOS/Linux):
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### 4. Place Data Files
Place your dataset inside the `data/raw/` folder:
- **Sajini:** `data/raw/diamonds.csv`
- **Buddhika:** `data/raw/cubic_zirconia.csv`
*(Note: The cleaned output files will be automatically generated by the preprocessing scripts).*

---

## 💻 Running the ML Pipeline

All scripts are located in the `src/` directory. You should run them from the root of the project.

**1. Preprocessing:**
```bash
python src/preprocess_diamonds.py
python src/preprocess_gemstone.py
```

**2. Train Baselines:**
```bash
python src/baseline_rf_diamonds.py
python src/baseline_xgb_gemstone.py
```

**3. Run Feature Selection (NIA):**
```bash
python src/ga_feature_selection.py
python src/pso_feature_selection.py
```

**4. Train Final Models & Evaluate:**
```bash
python src/train_ga_models.py
python src/train_pso_models.py
python src/final_evaluation.py
```

---

## 🌐 Running the Application (Dashboard & API)

To run the full stack locally, you need two terminals.

### Terminal 1: Start the Backend (Flask API)
Make sure your virtual environment is activated.
```bash
python backend/app.py
```
*The API will start at `http://127.0.0.1:5000` and expose the `/predict` endpoint.*

### Terminal 2: Start the Frontend (React Dashboard)
```bash
cd dashboard-demo
npm install
npm run dev
```
*The Vite development server will start the UI. Open `http://localhost:5173` in your browser.*

---

## 📊 Evaluation & Results
All generated plots, feature selection logs, and evaluation metrics (MSE, RMSE, R2 Score, MAE) are saved in the `results/` directory. Trained models are serialized and stored in the `models/` directory for consumption by the backend API.
