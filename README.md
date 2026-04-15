# Traffic Violation Prediction ML Project

This project predicts whether a traffic stop results in a **Citation** (violation) using machine learning models trained on the dataset in this repository.

## Repository Contents

- `traffic_violation_prediction.ipynb`: Main end-to-end notebook (data loading, preprocessing, training, evaluation, visualization)
- `traffic_violations.csv`: Source dataset
- `model_comparison.png`: Accuracy comparison across models
- `feature_importance.png`: Top 10 important features from Random Forest
- `risk_zones.png`: Top 10 high-risk cities by citation count
- `Traffic_Violation_Prediction_Report Partial.docx`: Project report document
- `requirements.txt`: Python dependencies for local/GitHub execution
- `.github/workflows/run-notebook.yml`: GitHub Actions workflow to execute notebook on push/PR

## Objective

Build a binary classifier where:

- Target = `1` if `Violation.Type == Citation`
- Target = `0` otherwise

## Step-by-Step Notebook Explanation

### Cell 1: Install Dependencies

```python
%pip install pandas numpy matplotlib seaborn scikit-learn xgboost
```

What it does:

- Installs all required packages into the active notebook kernel.

Generated output:

- Package installation logs and versions.

### Cell 2: Import Libraries

Imports all libraries used in the pipeline:

- Data handling: `pandas`, `numpy`
- Visualization: `matplotlib`, `seaborn`
- ML/preprocessing: `scikit-learn`
- Boosting model: `xgboost`

Generated output:

- No visual output; successful execution means imports are available.

### Cell 3: Load and Explore Data

```python
df = pd.read_csv('traffic_violations.csv')
print(df.shape, df.columns.tolist())
df.head()
```

What it does:

- Reads the dataset.
- Prints shape and column names.
- Shows first 5 rows.

Generated output:

- Dataset shape: around **70k rows and 21 columns**.
- Printed column list (for schema check).
- Table preview of top records.

### Cell 4: Preprocessing and Target Engineering

Key operations:

- Drops less-useful columns: `Description`, `Charge`, `DL.State`, `Model` (if present).
- Fills missing `Year` with median.
- Fills missing categorical values with mode.
- Label-encodes categorical columns.
- Creates target column from original file:
	- `target = 1` when `Violation.Type` is `Citation`
- Creates train/test split with stratification.

Generated output:

- No chart/text output by design.
- Main result is prepared matrices: `X_train`, `X_test`, `y_train`, `y_test`.

### Cell 5: Train and Evaluate 4 Models

Models trained:

- Random Forest
- XGBoost
- Decision Tree
- Logistic Regression

For each model, notebook prints a full classification report.

Generated output (latest run summary):

- Random Forest accuracy: **60.5%**
- XGBoost accuracy: **61.6%** (best among tested models)
- Decision Tree accuracy: **57.8%**
- Logistic Regression accuracy: **60.1%**

Interpretation:

- XGBoost currently gives the strongest overall accuracy.
- All models are in a similar range, indicating room for feature engineering/tuning.

### Cell 6: Accuracy Comparison Plot

Creates a bar chart of model accuracies and saves:

- `model_comparison.png`

Generated output:

- A labeled bar chart showing model-wise accuracy percentages.

Interpretation:

- Quickly confirms relative ranking: XGBoost highest, Decision Tree lowest in current setup.

### Cell 7: Feature Importance (Random Forest)

Builds top-10 feature importance plot from Random Forest and saves:

- `feature_importance.png`

Generated output:

- Horizontal bar chart with top predictive features.

Interpretation (latest run):

- Strong drivers include `Make`, `Driver.City`, `Year`, and `Color`.
- These variables contribute most to the Random Forest decision process.

### Cell 8: High-Risk Zone Analysis

Groups data by city and counts citation cases, then saves:

- `risk_zones.png`

Generated output:

- Top 10 cities with highest citation counts.

Interpretation (latest run):

- `SILVER SPRING` has the highest citation count in this dataset slice.
- Next high-count cities include `GAITHERSBURG`, `GERMANTOWN`, and `ROCKVILLE`.

## How To Run Locally

1. Create and activate a Python virtual environment.
2. Install dependencies:

	 ```bash
	 pip install -r requirements.txt
	 ```

3. Open and run all cells in `traffic_violation_prediction.ipynb` from top to bottom.

## GitHub Auto-Run (Already Configured)

This repository includes a GitHub Actions workflow:

- File: `.github/workflows/run-notebook.yml`
- Trigger: push/pull request on `main`
- Behavior: installs dependencies and executes the notebook using `jupyter nbconvert --execute`

So every new push can be automatically validated on GitHub.

## Notes and Next Improvements

- Try hyperparameter tuning for XGBoost and Random Forest.
- Add ROC-AUC and PR-AUC metrics for imbalanced classification analysis.
- Add cross-validation for more stable performance estimates.
- Consider one-hot encoding for selected high-cardinality features and compare results.
