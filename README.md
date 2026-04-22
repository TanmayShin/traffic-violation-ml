# TrafficGuard Web Dashboard

TrafficGuard is a browser-based traffic violation monitoring dashboard built with HTML, CSS, and JavaScript. It presents machine-learning style analytics for traffic violations, risk zones, cameras, alerts, and reporting in a single responsive interface.

## Project Overview

The dashboard focuses on showing where violations are concentrated, how models compare, and which areas need immediate attention. It is designed as a presentation-ready front end for a traffic safety or smart-city ML project.

Included in this project:

- A responsive dashboard UI in [index.html](index.html)
- Styling and layout in [styles.css](styles.css)
- Dashboard data, tab handling, and chart logic in [app.js](app.js)
- A notebook for the ML workflow in [traffic_violation_prediction.ipynb](traffic_violation_prediction.ipynb)
- A presentation deck in [ML_15 group.pptx (1).pptx](ML_15%20group.pptx%20(1).pptx)

## Main Features

- Overview metrics for total violations, high-risk zones, model accuracy, and active cameras
- 7-day trend charts comparing actual vs predicted violations
- Peak-hour analysis and violation type distribution charts
- Model comparison cards and performance tables
- Risk zone summaries with severity-based coloring
- Predictions, feature analysis, diagnostics, anomaly, alerts, cameras, and reports tabs
- 24-camera network view with online/offline status
- Historical analytics for 30-day trends and zone prioritization

## Machine Learning Summary

The project is positioned around traffic-violation prediction and risk analysis. The dashboard data currently highlights these model results:

- Random Forest: 91.4% accuracy
- XGBoost: 89.2% accuracy
- Decision Tree: 87.5% accuracy
- Logistic Regression: 82.1% accuracy

The UI also describes supporting ML concepts such as feature importance, cross-validation, confusion matrices, ROC analysis, precision-recall curves, and anomaly detection.

## Tech Stack

- HTML5
- CSS3
- JavaScript ES6+
- Chart.js 3.9.1
- Chart.js Data Labels plugin
- Python notebook workflow for ML exploration and model building

## Project Structure

```
TrafficGuard_Web_Dashboard/
├── app.js
├── index.html
├── styles.css
├── README.md
├── traffic_violation_prediction.ipynb
└── ML_15 group.pptx (1).pptx
```

## How To Run

You can open the dashboard locally in any of these ways:

### Option 1: Simple HTTP server

```bash
cd TrafficGuard_Web_Dashboard
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Option 2: Node.js static server

```bash
npx http-server .
```

### Option 3: Open directly

Open [index.html](index.html) in a modern browser.

## Data And Content Notes

The dashboard currently uses built-in sample data for:

- Violation counts by zone
- Camera statuses
- Model comparison metrics
- Trend and peak-hour charts
- Feature importance rankings

That makes the project easy to demo without requiring a backend service or live database connection.

## Suggested GitHub Description

If you want a short repository description on GitHub, use:

> TrafficGuard is a traffic violation prediction dashboard that visualizes risk zones, ML model performance, camera status, and reporting insights for smart-city traffic monitoring.

## Notes For Publishing

This folder was not initialized as a git repository in the workspace, so it cannot be pushed to GitHub until you create a local git repo, add the GitHub remote, and commit the files.

If you want, the next step is to initialize git here and push to your repo URL: https://github.com/TanmayShin/traffic-violation-ml
