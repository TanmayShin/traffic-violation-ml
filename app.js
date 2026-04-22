/* ============================================
   TrafficGuard Web Dashboard - JavaScript
   Data, Charts, Navigation, and Interactions
   ============================================ */

// ============== DATA ===============
const ZONES_DATA = [
  { id: 'SR', name: 'Station Road', violations: 347, types: ['Signal Jump', 'Speeding'], risk: 'critical', conf: 94, score: 9.4, lat: 30, lon: 26 },
  { id: 'KC', name: 'Kranti Chowk', violations: 291, types: ['No Helmet', 'Overload'], risk: 'critical', conf: 88, score: 8.8, lat: 65, lon: 50 },
  { id: 'GK', name: 'Garkheda', violations: 198, types: ['Wrong-Way', 'Speeding'], risk: 'high', conf: 82, score: 7.6, lat: 44, lon: 70 },
  { id: 'CN', name: 'Cidco N-6', violations: 156, types: ['Parking', 'Signal Jump'], risk: 'high', conf: 79, score: 7.1, lat: 80, lon: 28 },
  { id: 'OP', name: 'Osmanpura', violations: 112, types: ['No Helmet', 'Overload'], risk: 'medium', conf: 71, score: 5.8, lat: 19, lon: 57 },
  { id: 'CT', name: 'Cantonment', violations: 87, types: ['Speeding', 'Overtake'], risk: 'medium', conf: 65, score: 4.9, lat: 56, lon: 22 },
  { id: 'WJ', name: 'Waluj MIDC', violations: 43, types: ['Vehicle Overload'], risk: 'low', conf: 58, score: 3.2, lat: 86, lon: 74 },
  { id: 'BB', name: 'Beed Bypass', violations: 36, types: ['Speeding'], risk: 'low', conf: 51, score: 2.7, lat: 10, lon: 80 },
];

const VIOLATION_TYPES = {
  'Signal Jump': 28,
  'No Helmet': 22,
  'Speeding': 20,
  'Wrong Way': 12,
  'Parking': 10,
  'Overloading': 8
};

const TREND_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  actual: [980, 1120, 1050, 1310, 1180, 890, 1284],
  predicted: [950, 1080, 1090, 1290, 1200, 920, 1250]
};

const PEAK_HOURS = [12, 18, 24, 36, 55, 70, 88, 110, 124, 105, 95, 88, 76, 82, 98, 115, 130, 145, 138, 120, 95, 60, 38, 22];

const FEATURES = [
  { name: 'Time of Day', importance: 0.28 },
  { name: 'Zone History', importance: 0.22 },
  { name: 'Weather', importance: 0.15 },
  { name: 'Traffic Volume', importance: 0.12 },
  { name: 'Day of Week', importance: 0.10 },
  { name: 'Camera Count', importance: 0.07 },
  { name: 'Event Flag', importance: 0.04 },
  { name: 'Holiday', importance: 0.02 }
];

const MODELS = [
  { name: 'Random Forest', accuracy: 91.4, f1: 0.914, precision: 0.912, recall: 0.916, status: 'active' },
  { name: 'XGBoost', accuracy: 89.2, f1: 0.892, precision: 0.890, recall: 0.894, status: 'standby' },
  { name: 'Decision Tree', accuracy: 87.5, f1: 0.875, precision: 0.873, recall: 0.877, status: 'standby' },
  { name: 'Logistic Regression', accuracy: 82.1, f1: 0.821, precision: 0.819, recall: 0.823, status: 'inactive' }
];

const CAMERAS = [
  { id: 'CAM-001', name: 'Station Rd Junction', zone: 'Station Road', status: 'online' },
  { id: 'CAM-002', name: 'Kranti Chowk North', zone: 'Kranti Chowk', status: 'online' },
  { id: 'CAM-003', name: 'Kranti Chowk South', zone: 'Kranti Chowk', status: 'online' },
  { id: 'CAM-004', name: 'Garkheda Entry', zone: 'Garkheda', status: 'online' },
  { id: 'CAM-005', name: 'Cidco N-6 Signal', zone: 'Cidco N-6', status: 'online' },
  { id: 'CAM-006', name: 'Osmanpura Main', zone: 'Osmanpura', status: 'offline' },
  { id: 'CAM-007', name: 'Cantonment Gate', zone: 'Cantonment', status: 'online' },
  { id: 'CAM-008', name: 'Waluj Entry', zone: 'Waluj MIDC', status: 'online' },
  { id: 'CAM-009', name: 'Beed Bypass Toll', zone: 'Beed Bypass', status: 'online' },
  { id: 'CAM-010', name: 'CIDCO N-7 Signal', zone: 'Cidco N-6', status: 'offline' },
  { id: 'CAM-011', name: 'Dr Ambedkar Chowk', zone: 'Station Road', status: 'online' },
  { id: 'CAM-012', name: 'Pundliknagar Circle', zone: 'Osmanpura', status: 'offline' },
  { id: 'CAM-013', name: 'Garkheda Flyover', zone: 'Garkheda', status: 'online' },
  { id: 'CAM-014', name: 'Cantonment South Gate', zone: 'Cantonment', status: 'online' },
  { id: 'CAM-015', name: 'Waluj Phase II', zone: 'Waluj MIDC', status: 'online' },
  { id: 'CAM-016', name: 'Roshangate Signal', zone: 'Station Road', status: 'online' },
  { id: 'CAM-017', name: 'Nutan Colony Rd', zone: 'Osmanpura', status: 'online' },
  { id: 'CAM-018', name: 'Aurangpura Junction', zone: 'Cantonment', status: 'online' },
  { id: 'CAM-019', name: 'Seven Hills Rd', zone: 'Cidco N-6', status: 'online' },
  { id: 'CAM-020', name: 'Begumpura Circle', zone: 'Osmanpura', status: 'online' },
  { id: 'CAM-021', name: 'Station Rd South', zone: 'Station Road', status: 'online' },
  { id: 'CAM-022', name: 'Garkheda High School', zone: 'Garkheda', status: 'online' },
  { id: 'CAM-023', name: 'Waluj Phase III', zone: 'Waluj MIDC', status: 'online' },
  { id: 'CAM-024', name: 'Beed Bypass Mid', zone: 'Beed Bypass', status: 'online' },
];

const HISTORICAL_30_DAYS = Array.from({ length: 30 }, (_, i) => 700 + Math.round(Math.sin(i / 3) * 150 + Math.random() * 80));

// ============== UTILITIES ===============
function getRiskColor(risk) {
  const colors = {
    critical: '#EF4444',
    high: '#F59E0B',
    medium: '#3B82F6',
    low: '#10B981'
  };
  return colors[risk] || '#6B7280';
}

function getRiskLabel(risk) {
  return risk.charAt(0).toUpperCase() + risk.slice(1);
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  document.getElementById('lastUpdate').textContent = time;
}

// ============== NAVIGATION ===============
function initNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');

      if (targetTab === 'overview') initOverview();
      if (targetTab === 'models') initModels();
      if (targetTab === 'zones') initZones();
      if (targetTab === 'predictions') initPredictions();
      if (targetTab === 'features') initFeatures();
      if (targetTab === 'diagnostics') initDiagnostics();
      if (targetTab === 'anomaly') initAnomalies();
      if (targetTab === 'alerts') initAlerts();
      if (targetTab === 'cameras') initCameras();
      if (targetTab === 'reports') initReports();
    });
  });
}

// ============== OVERVIEW TAB ===============
function initOverview() {
  renderTrendChart();
  renderPeakHoursChart();
  renderViolationTypesChart();
  renderModelComparisonChart();
  renderTopZones();
}

function renderTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;

  if (window.trendChartInstance) window.trendChartInstance.destroy();

  window.trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: TREND_DATA.labels,
      datasets: [
        {
          label: 'Actual Violations',
          data: TREND_DATA.actual,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#EF4444',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        },
        {
          label: 'Predicted Violations',
          data: TREND_DATA.predicted,
          borderColor: '#3B82F6',
          backgroundColor: 'transparent',
          borderWidth: 3,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#F1F5F9', font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          borderColor: '#475569',
          borderWidth: 1,
          titleColor: '#F1F5F9',
          bodyColor: '#F1F5F9'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

function renderPeakHoursChart() {
  const ctx = document.getElementById('peakHoursChart');
  if (!ctx) return;

  if (window.peakHoursChartInstance) window.peakHoursChartInstance.destroy();

  const hours = Array.from({ length: 24 }, (_, i) => i + ':00');

  window.peakHoursChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hours,
      datasets: [
        {
          label: 'Violations',
          data: PEAK_HOURS,
          backgroundColor: PEAK_HOURS.map((val, i) => {
            if (val > 120) return 'rgba(239, 68, 68, 0.8)';
            if (val > 90) return 'rgba(245, 158, 11, 0.8)';
            if (val > 50) return 'rgba(59, 130, 246, 0.8)';
            return 'rgba(16, 185, 129, 0.8)';
          }),
          borderRadius: 4,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

function renderViolationTypesChart() {
  const ctx = document.getElementById('violationTypesChart');
  if (!ctx) return;

  if (window.violationTypesChartInstance) window.violationTypesChartInstance.destroy();

  window.violationTypesChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(VIOLATION_TYPES),
      datasets: [
        {
          data: Object.values(VIOLATION_TYPES),
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)'
          ],
          borderColor: '#1E293B',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F1F5F9', font: { size: 12 } }
        }
      }
    }
  });
}

function renderModelComparisonChart() {
  const ctx = document.getElementById('modelComparisonChart');
  if (!ctx) return;

  if (window.modelComparisonChartInstance) window.modelComparisonChartInstance.destroy();

  window.modelComparisonChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MODELS.map(m => m.name),
      datasets: [
        {
          label: 'Accuracy (%)',
          data: MODELS.map(m => m.accuracy),
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

function renderTopZones() {
  const container = document.getElementById('topZonesContainer');
  if (!container) return;

  const sorted = [...ZONES_DATA].sort((a, b) => b.violations - a.violations);

  container.innerHTML = sorted.map((zone, idx) => `
    <div class="zone-item" style="border-left: 4px solid ${getRiskColor(zone.risk)}">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 700; color: #999; font-size: 1.2rem;">#${idx + 1}</span>
        <span style="background: ${getRiskColor(zone.risk)}; color: white; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
          ${getRiskLabel(zone.risk)}
        </span>
      </div>
      <div class="zone-name">${zone.name}</div>
      <div class="zone-stat">
        <span>🚨 Violations:</span>
        <span>${zone.violations}</span>
      </div>
      <div class="zone-stat">
        <span>🎯 Confidence:</span>
        <span>${zone.conf}%</span>
      </div>
      <div class="zone-stat">
        <span>📊 Risk Score:</span>
        <span>${zone.score.toFixed(1)}/10</span>
      </div>
    </div>
  `).join('');
}

// ============== MODELS TAB ===============
function initModels() {
  renderModelAccuracyChart();
  renderModelF1Chart();
}

function renderModelAccuracyChart() {
  const ctx = document.getElementById('modelAccuracyChart');
  if (!ctx) return;

  if (window.modelAccuracyChartInstance) window.modelAccuracyChartInstance.destroy();

  window.modelAccuracyChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MODELS.map(m => m.name),
      datasets: [
        {
          label: 'Accuracy',
          data: MODELS.map(m => m.accuracy),
          backgroundColor: MODELS.map((m, i) => i === 0 ? '#EF4444' : '#3B82F6'),
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

function renderModelF1Chart() {
  const ctx = document.getElementById('modelF1Chart');
  if (!ctx) return;

  if (window.modelF1ChartInstance) window.modelF1ChartInstance.destroy();

  window.modelF1ChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MODELS.map(m => m.name),
      datasets: [
        {
          label: 'F1-Score',
          data: MODELS.map(m => (m.f1 * 100)),
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

// ============== ZONES TAB ===============
function initZones() {
  renderZoneHeatmap();
  renderZonesList();
  renderRiskDistributionChart();
}

function renderZoneHeatmap() {
  const heatmap = document.getElementById('zoneHeatmap');
  if (!heatmap) return;

  heatmap.innerHTML = ZONES_DATA.map(zone => {
    const size = (zone.conf / 100) * 60 + 40;
    return `
      <div class="zone-bubble" style="
        width: ${size}px;
        height: ${size}px;
        left: ${zone.lon}%;
        top: ${zone.lat}%;
        background: linear-gradient(135deg, ${getRiskColor(zone.risk)}, rgba(255,255,255,0.1));
        box-shadow: 0 0 20px ${getRiskColor(zone.risk)};
      " title="${zone.name}">
        <div style="font-weight: 700; font-size: 1.1rem;">${zone.violations}</div>
        <div style="font-size: 0.7rem; opacity: 0.9;">${zone.name}</div>
      </div>
    `;
  }).join('');
}

function renderZonesList() {
  const container = document.getElementById('zonesList');
  if (!container) return;

  container.innerHTML = ZONES_DATA.sort((a, b) => b.violations - a.violations).map(zone => `
    <div class="zone-item" style="border-left: 4px solid ${getRiskColor(zone.risk)}">
      <div class="zone-name">${zone.name}</div>
      <div class="zone-stat">
        <span>Violations:</span>
        <span>${zone.violations}</span>
      </div>
      <div class="zone-stat">
        <span>Type:</span>
        <span>${zone.types.join(', ')}</span>
      </div>
      <div class="zone-stat">
        <span>Confidence:</span>
        <span>${zone.conf}%</span>
      </div>
    </div>
  `).join('');
}

function renderRiskDistributionChart() {
  const ctx = document.getElementById('riskDistributionChart');
  if (!ctx) return;

  if (window.riskDistributionChartInstance) window.riskDistributionChartInstance.destroy();

  const riskCounts = {
    critical: ZONES_DATA.filter(z => z.risk === 'critical').length,
    high: ZONES_DATA.filter(z => z.risk === 'high').length,
    medium: ZONES_DATA.filter(z => z.risk === 'medium').length,
    low: ZONES_DATA.filter(z => z.risk === 'low').length
  };

  window.riskDistributionChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [
        {
          data: Object.values(riskCounts),
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ],
          borderColor: '#1E293B',
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#F1F5F9' }
        }
      }
    }
  });
}

// ============== PREDICTIONS TAB ===============
function initPredictions() {
  populateZoneSelect();
  renderPredictionsTable();
}

function populateZoneSelect() {
  const select = document.getElementById('zoneSelect');
  if (!select) return;

  select.innerHTML = '<option value="">-- All Zones --</option>' +
    ZONES_DATA.map(zone => `<option value="${zone.id}">${zone.name}</option>`).join('');
}

function renderPredictionsTable() {
  const tbody = document.getElementById('predictionsBody');
  if (!tbody) return;

  tbody.innerHTML = ZONES_DATA.map(zone => `
    <tr>
      <td><strong>${zone.name}</strong></td>
      <td>${zone.types[0]}</td>
      <td>
        <div style="background: ${getRiskColor(zone.risk)}; width: ${zone.conf}%; height: 6px; border-radius: 3px; margin: 0.25rem 0;">
        </div>
        <span style="font-size: 0.8rem; color: #94A3B8;">${zone.conf}%</span>
      </td>
      <td style="color: #3B82F6; font-weight: 600;">${zone.score.toFixed(1)}/10</td>
      <td>
        <span style="background: ${getRiskColor(zone.risk)}; color: white; padding: 0.3rem 0.6rem; border-radius: 4px; font-size: 0.75rem;">
          ${getRiskLabel(zone.risk)}
        </span>
      </td>
      <td><span style="color: #F59E0B; font-size: 0.85rem;">Peak Hours</span></td>
      <td><button class="btn-secondary" onclick="alert('Deploying patrol to ${zone.name}')">Deploy</button></td>
    </tr>
  `).join('');
}

function refreshPredictions() {
  renderPredictionsTable();
}

// ============== FEATURES TAB ===============
function initFeatures() {
  renderFeatureImportanceChart();
  renderFeaturesList();
}

function renderFeatureImportanceChart() {
  const ctx = document.getElementById('featureImportanceChart');
  if (!ctx) return;

  if (window.featureImportanceChartInstance) window.featureImportanceChartInstance.destroy();

  window.featureImportanceChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: FEATURES.map(f => f.name),
      datasets: [
        {
          label: 'Importance',
          data: FEATURES.map(f => f.importance * 100),
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderRadius: 6,
          borderSkipped: false
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 30,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

function renderFeaturesList() {
  const container = document.getElementById('featuresList');
  if (!container) return;

  container.innerHTML = FEATURES.map((feature, idx) => `
    <div class="feature-item" style="border-left-color: ${['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'][idx % 5]}">
      <div class="feature-name">${idx + 1}. ${feature.name}</div>
      <div class="feature-bar">
        <div class="feature-fill" style="width: ${feature.importance * 100}%; background: ${['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6'][idx % 5]};"></div>
      </div>
      <div style="font-size: 0.8rem; color: #94A3B8; margin-top: 0.5rem;">Importance: ${(feature.importance * 100).toFixed(1)}%</div>
    </div>
  `).join('');
}

// ============== CAMERAS TAB ===============
function initCameras() {
  renderCamerasList();
}

function renderCamerasList() {
  const container = document.getElementById('camerasList');
  if (!container) return;

  container.innerHTML = CAMERAS.map(camera => `
    <div class="camera-card">
      <div class="camera-header">
        <div>
          <div class="camera-name">${camera.name}</div>
          <div class="camera-zone">${camera.zone}</div>
        </div>
        <span class="camera-status ${camera.status === 'online' ? 'status-online' : 'status-offline'}">
          ${camera.status === 'online' ? '🟢' : '🔴'} ${camera.status.toUpperCase()}
        </span>
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
        <button class="btn-secondary" style="flex: 1; font-size: 0.8rem;">View Feed</button>
        <button class="btn-secondary" style="flex: 1; font-size: 0.8rem;">Settings</button>
      </div>
    </div>
  `).join('');
}

// ============== REPORTS TAB ===============
function initReports() {
  renderHistoricalChart();
}

function renderHistoricalChart() {
  const ctx = document.getElementById('historicalChart');
  if (!ctx) return;

  if (window.historicalChartInstance) window.historicalChartInstance.destroy();

  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  window.historicalChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Violations (30 Days)',
          data: HISTORICAL_30_DAYS,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#EF4444'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

// ============== REPORTS TAB ===============
function initReports() {
  renderHistoricalChart();
}

function renderHistoricalChart() {
  const ctx = document.getElementById('historicalChart');
  if (!ctx) return;

  if (window.historicalChartInstance) window.historicalChartInstance.destroy();

  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  window.historicalChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Violations (30 Days)',
          data: HISTORICAL_30_DAYS,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#EF4444'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(71, 85, 105, 0.2)' },
          ticks: { color: '#94A3B8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94A3B8' }
        }
      }
    }
  });
}

// ============== DIAGNOSTICS TAB ===============
function initDiagnostics() {
  renderConfusionMatrixChart();
  renderROCCurveChart();
  renderPrecisionRecallChart();
  renderCVStabilityChart();
  renderMetricsTable();
}

function renderConfusionMatrixChart() {
  const ctx = document.getElementById('confusionMatrixChart');
  if (!ctx) return;

  if (window.confusionMatrixInstance) window.confusionMatrixInstance.destroy();

  // Sample confusion matrix data
  const cm = [[650, 85], [72, 693]];
  
  window.confusionMatrixInstance = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'True Negative',
          data: [{ x: 0, y: 0, r: 25 }],
          backgroundColor: 'rgba(16, 185, 129, 0.8)'
        },
        {
          label: 'False Positive',
          data: [{ x: 1, y: 0, r: 20 }],
          backgroundColor: 'rgba(245, 158, 11, 0.8)'
        },
        {
          label: 'False Negative',
          data: [{ x: 0, y: 1, r: 18 }],
          backgroundColor: 'rgba(245, 158, 11, 0.8)'
        },
        {
          label: 'True Positive',
          data: [{ x: 1, y: 1, r: 26 }],
          backgroundColor: 'rgba(59, 130, 246, 0.8)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        tooltip: { callbacks: { label: (ctx) => `Value: ${cm[ctx.raw.y][ctx.raw.x]}` } }
      },
      scales: {
        x: { min: -0.5, max: 1.5, ticks: { callback: (v) => ['Negative', 'Positive'][v] } },
        y: { min: -0.5, max: 1.5, ticks: { callback: (v) => ['Negative', 'Positive'][v] } }
      }
    }
  });
}

function renderROCCurveChart() {
  const ctx = document.getElementById('rocCurveChart');
  if (!ctx) return;

  if (window.rocCurveInstance) window.rocCurveInstance.destroy();

  const fpr = [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const tpr = [0, 0.82, 0.88, 0.91, 0.93, 0.95, 0.96, 0.965, 0.97, 0.972, 0.973, 0.974, 1.0];

  window.rocCurveInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: fpr,
      datasets: [
        {
          label: 'Random Forest (AUC = 0.957)',
          data: tpr,
          borderColor: '#EF4444',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#EF4444'
        },
        {
          label: 'Random Classifier',
          data: fpr,
          borderColor: '#94A3B8',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        x: { title: { display: true, text: 'False Positive Rate' } },
        y: { title: { display: true, text: 'True Positive Rate' } }
      }
    }
  });
}

function renderPrecisionRecallChart() {
  const ctx = document.getElementById('precisionRecallChart');
  if (!ctx) return;

  if (window.precisionRecallInstance) window.precisionRecallInstance.destroy();

  const recall = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
  const precision = [1.0, 0.98, 0.96, 0.94, 0.92, 0.88, 0.82, 0.75, 0.65, 0.50, 0.35];

  window.precisionRecallInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: recall,
      datasets: [
        {
          label: 'Precision-Recall Curve (AP = 0.891)',
          data: precision,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#3B82F6'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        x: { title: { display: true, text: 'Recall' } },
        y: { title: { display: true, text: 'Precision' }, min: 0, max: 1 }
      }
    }
  });
}

function renderCVStabilityChart() {
  const ctx = document.getElementById('cvStabilityChart');
  if (!ctx) return;

  if (window.cvStabilityInstance) window.cvStabilityInstance.destroy();

  const folds = ['Fold 1', 'Fold 2', 'Fold 3', 'Fold 4', 'Fold 5'];
  const rf = [0.915, 0.912, 0.918, 0.910, 0.914];
  const xgb = [0.892, 0.889, 0.895, 0.888, 0.891];
  const gb = [0.903, 0.900, 0.906, 0.899, 0.905];

  window.cvStabilityInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: folds,
      datasets: [
        {
          label: 'Random Forest',
          data: rf,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          pointRadius: 4
        },
        {
          label: 'XGBoost',
          data: xgb,
          borderColor: '#3B82F6',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 4
        },
        {
          label: 'Gradient Boosting',
          data: gb,
          borderColor: '#10B981',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        y: { min: 0.85, max: 0.95 }
      }
    }
  });
}

function renderMetricsTable() {
  const tbody = document.getElementById('metricsTableBody');
  if (!tbody) return;

  const metrics = [
    { model: 'Random Forest', acc: '91.4%', prec: '0.912', rec: '0.916', f1: '0.914', auc: '0.957', status: '🟢 Active' },
    { model: 'XGBoost', acc: '89.2%', prec: '0.890', rec: '0.894', f1: '0.892', auc: '0.943', status: '🟡 Standby' },
    { model: 'Gradient Boosting', acc: '90.3%', prec: '0.902', rec: '0.905', f1: '0.903', auc: '0.951', status: '🟡 Standby' },
    { model: 'Decision Tree', acc: '87.5%', prec: '0.873', rec: '0.877', f1: '0.875', auc: '0.912', status: '⚪ Inactive' }
  ];

  tbody.innerHTML = metrics.map(m => `
    <tr>
      <td><strong>${m.model}</strong></td>
      <td>${m.acc}</td>
      <td>${m.prec}</td>
      <td>${m.rec}</td>
      <td>${m.f1}</td>
      <td>${m.auc}</td>
      <td>${m.status}</td>
    </tr>
  `).join('');
}

// ============== ANOMALIES TAB ===============
function initAnomalies() {
  detectAnomalies();
  renderAnomalyTimelineChart();
}

function detectAnomalies() {
  const sensitivity = document.getElementById('sensitivitySelect').value;
  const container = document.getElementById('anomaliesContainer');
  if (!container) return;

  const anomalies = [
    { zone: 'Station Road', type: 'Spike', severity: 'critical', description: '45% increase in violations', time: '2 hours ago' },
    { zone: 'Kranti Chowk', type: 'Pattern Change', severity: 'warning', description: 'Unusual violation pattern detected', time: '1 hour ago' },
    { zone: 'Garkheda', type: 'Peak Shift', severity: 'info', description: 'Peak hours shifted earlier than usual', time: '30 minutes ago' },
    { zone: 'Cidco N-6', type: 'Outlier', severity: 'warning', description: 'High confidence predictions with low violations', time: '15 minutes ago' }
  ];

  const filtered = sensitivity === 'low' ? anomalies.slice(0, 2) : 
                    sensitivity === 'high' ? anomalies : 
                    anomalies.slice(0, 3);

  container.innerHTML = filtered.map(a => `
    <div class="anomaly-card ${a.severity}">
      <div class="anomaly-title">${a.zone}</div>
      <span class="anomaly-severity ${a.severity}">${a.type}</span>
      <div class="anomaly-detail">${a.description}</div>
      <div class="anomaly-detail" style="color: var(--text-muted);">${a.time}</div>
    </div>
  `).join('');
}

function renderAnomalyTimelineChart() {
  const ctx = document.getElementById('anomalyTimelineChart');
  if (!ctx) return;

  if (window.anomalyTimelineInstance) window.anomalyTimelineInstance.destroy();

  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const anomalyCounts = [2, 1, 3, 2, 4, 1, 2];

  window.anomalyTimelineInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Anomalies Detected',
          data: anomalyCounts,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: '#EF4444'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(71, 85, 105, 0.2)' }, ticks: { color: '#94A3B8' } },
        x: { grid: { display: false }, ticks: { color: '#94A3B8' } }
      }
    }
  });
}

// ============== ALERTS TAB ===============
function initAlerts() {
  renderAlertsContainer();
  renderAlertTimelineChart();
}

function renderAlertsContainer() {
  const container = document.getElementById('alertsContainer');
  if (!container) return;

  const alerts = [
    { title: 'Critical: High violation surge at Station Road', zone: 'Station Road', severity: 'critical', time: '15 min ago' },
    { title: 'Warning: Unusual pattern detected at Kranti Chowk', zone: 'Kranti Chowk', severity: 'warning', time: '45 min ago' },
    { title: 'Info: Camera CAM-006 offline for maintenance', zone: 'Osmanpura', severity: 'info', time: '2 hours ago' },
    { title: 'Critical: Model confidence dropping below threshold', zone: 'System', severity: 'critical', time: '3 hours ago' },
    { title: 'Warning: Feature data imbalance detected', zone: 'System', severity: 'warning', time: '4 hours ago' },
    { title: 'Info: Daily report ready for download', zone: 'System', severity: 'info', time: '6 hours ago' }
  ];

  container.innerHTML = alerts.map(a => `
    <div class="alert-card ${a.severity}">
      <div class="alert-content">
        <div class="alert-title">${a.title}</div>
        <div class="alert-time">${a.time}</div>
      </div>
      <div class="alert-icon">${a.severity === 'critical' ? '🔴' : a.severity === 'warning' ? '🟠' : '🔵'}</div>
    </div>
  `).join('');

  // Update stats
  const critical = alerts.filter(a => a.severity === 'critical').length;
  const warning = alerts.filter(a => a.severity === 'warning').length;
  const info = alerts.filter(a => a.severity === 'info').length;

  document.getElementById('criticalCount').textContent = critical;
  document.getElementById('warningCount').textContent = warning;
  document.getElementById('infoCount').textContent = info;
}

function renderAlertTimelineChart() {
  const ctx = document.getElementById('alertTimelineChart');
  if (!ctx) return;

  if (window.alertTimelineInstance) window.alertTimelineInstance.destroy();

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const critical = [2, 1, 3, 2, 4, 1, 2];
  const warning = [3, 4, 2, 5, 3, 2, 4];
  const info = [5, 3, 4, 3, 5, 4, 6];

  window.alertTimelineInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Critical',
          data: critical,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          stack: 'Stack 0'
        },
        {
          label: 'Warning',
          data: warning,
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          stack: 'Stack 0'
        },
        {
          label: 'Info',
          data: info,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          stack: 'Stack 0'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(71, 85, 105, 0.2)' }, ticks: { color: '#94A3B8' } },
        x: { grid: { display: false }, ticks: { color: '#94A3B8' } }
      }
    }
  });
}

function generateReport(type) {
  alert(`Generating ${type} report... This would export analysis data in the production version.`);
}

function exportData(format) {
  alert(`Exporting data as ${format.toUpperCase()}... Download initiated in production.`);
}

// ============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initOverview();
  
  // Update clock every second
  updateClock();
  setInterval(updateClock, 1000);
});
