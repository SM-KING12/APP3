const temperatureElement = document.getElementById("temperature"); 
const humidityElement = document.getElementById("humidity");
const foodStockElement = document.getElementById("food-stock");
const alertsList = document.getElementById("alerts-list");
const notificationsContainer = document.getElementById("notifications-container");
const lightBulb = document.getElementById("light-bulb");

const temperatureChartCtx = document.getElementById("temperature-chart").getContext("2d");
const humidityChartCtx = document.getElementById("humidity-chart").getContext("2d");
const foodStockChartCtx = document.getElementById("food-stock-chart").getContext("2d");

let foodStock = 750;
let lightState = false;

// Initialisation des graphiques
const temperatureChart = createChart(temperatureChartCtx, "Température (°C)", "#f00");
const humidityChart = createChart(humidityChartCtx, "Humidité (%)", "#00f");
const foodStockChart = createChart(foodStockChartCtx, "Stock d'Aliments (kg)", "#0f0");

function createChart(ctx, label, color) {
    return new Chart(ctx, {
        type: "line",
        data: {
            labels: Array(10).fill(""),
            datasets: [{ label: label, data: Array(10).fill(0), borderColor: color, borderWidth: 2 }]
        },
        options: { animation: false, scales: { y: { beginAtZero: true } } }
    });
}

function updateDashboard() {
    const temperature = (20 + Math.random() * 10).toFixed(1);
    const humidity = (50 + Math.random() * 30).toFixed(0);

    temperatureElement.textContent = `${temperature}°C`;
    humidityElement.textContent = `${humidity}%`;
    foodStockElement.textContent = `${foodStock} kg`;

    const alerts = [];
    if (temperature > 28) alerts.push("Température élevée !");
    if (humidity < 55) alerts.push("Humidité basse !");
    if (foodStock < 200) alerts.push("Stock d'aliments critique !");
    alertsList.innerHTML = alerts.length
        ? alerts.map((alert) => `<li>${alert}</li>`).join("")
        : "<li>Aucune alerte.</li>";

    updateChart(temperatureChart, temperature);
    updateChart(humidityChart, humidity);
    updateChart(foodStockChart, foodStock);
}

function updateChart(chart, value) {
    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(value);
    chart.update();
}

// Commandes
document.getElementById("set-temperature").addEventListener("click", () => {
    const targetTemp = prompt("Entrez la température cible (°C) :", 25);
    if (targetTemp) {
        temperatureElement.textContent = `${targetTemp}°C`;
        showNotification(`Température réglée à ${targetTemp}°C.`);
    }
});

document.getElementById("distribute-food").addEventListener("click", () => {
    const distributeAmount = parseInt(prompt("Entrez la quantité d'aliments à distribuer (kg) :", 50), 10);
    if (distributeAmount > 0 && foodStock >= distributeAmount) {
        foodStock -= distributeAmount;
        updateDashboard();
        showNotification(`${distributeAmount} kg d'aliments distribués.`);
    } else {
        showNotification("Quantité invalide ou stock insuffisant.");
    }
});

document.getElementById("activate-pump").addEventListener("click", () => {
    showNotification("Pompe à eau activée !");
});

// Gestion des lumières
document.getElementById("light-on").addEventListener("click", () => {
    lightState = true;
    updateLightState();
    showNotification("Lumière allumée !");
});

document.getElementById("light-off").addEventListener("click", () => {
    lightState = false;
    updateLightState();
    showNotification("Lumière éteinte !");
});

function updateLightState() {
    lightBulb.src = lightState ? "ampoule allumee.webp" : "ampoule-eteinte.webp";
    lightBulb.classList.toggle("light-on", lightState);
}

// Génération de rapport
document.getElementById("generate-report").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Rapport des Statistiques Agricoles", 10, 20);

    // Page 1 - Vue d'ensemble
    doc.setFontSize(12);
    doc.text(`Température actuelle : ${temperatureElement.textContent}`, 10, 40);
    doc.text(`Humidité actuelle : ${humidityElement.textContent}`, 10, 50);
    doc.text(`Stock d'aliments : ${foodStock} kg`, 10, 60);
    doc.text("Graphiques des statistiques :", 10, 80);

    const temperatureCanvas = document.getElementById("temperature-chart");
    const temperatureImage = temperatureCanvas.toDataURL("image/png");
    doc.addImage(temperatureImage, "PNG", 10, 90, 180, 60);

    doc.addPage();

    // Page 2 - Humidité
    doc.text("Graphique de l'Humidité", 10, 20);
    const humidityCanvas = document.getElementById("humidity-chart");
    const humidityImage = humidityCanvas.toDataURL("image/png");
    doc.addImage(humidityImage, "PNG", 10, 30, 180, 60);

    doc.addPage();

    // Page 3 - Stock d'Aliments
    doc.text("Graphique du Stock d'Aliments", 10, 20);
    const foodStockCanvas = document.getElementById("food-stock-chart");
    const foodStockImage = foodStockCanvas.toDataURL("image/png");
    doc.addImage(foodStockImage, "PNG", 10, 30, 180, 60);

    doc.save("rapport_agricole.pdf");
    showNotification("Rapport généré avec succès.");
});

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notificationsContainer.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

setInterval(updateDashboard, 2000);
updateDashboard();
