document.addEventListener("DOMContentLoaded", () => {
    // Notifications
    const notifications = document.getElementById("notifications");

    function showNotification(message) {
        notifications.textContent = message;
        notifications.style.display = "block";
        setTimeout(() => {
            notifications.style.display = "none";
        }, 3000);
    }

    // Boutons de contrôle
    const toggleLightButton = document.getElementById("toggleLight");
    const adjustTemperatureButton = document.getElementById("adjustTemperature");
    const refillWaterButton = document.getElementById("refillWater");
    const refillFoodButton = document.getElementById("refillFood");

    toggleLightButton.addEventListener("click", () => {
        const currentState = toggleLightButton.textContent.includes("OFF") ? "ON" : "OFF";
        toggleLightButton.textContent = `Lumière : ${currentState}`;
        showNotification(`Lumière réglée sur ${currentState}`);
    });

    adjustTemperatureButton.addEventListener("click", () => {
        document.getElementById("temperatureModal").style.display = "flex";
    });

    refillWaterButton.addEventListener("click", () => {
        showNotification("Eau rechargée avec succès !");
    });

    refillFoodButton.addEventListener("click", () => {
        showNotification("Nourriture rechargée avec succès !");
    });

    // Température : Confirmation
    const setTemperatureButton = document.getElementById("setTemperature");
    const temperatureInput = document.getElementById("temperatureInput");

    setTemperatureButton.addEventListener("click", () => {
        const newTemperature = temperatureInput.value;
        if (newTemperature) {
            showNotification(`Température réglée sur ${newTemperature}°C`);
            document.getElementById("temperatureModal").style.display = "none";
            temperatureInput.value = "";
        } else {
            showNotification("Veuillez entrer une température valide !");
        }
    });

    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("temperatureModal").style.display = "none";
    });

    // Jauges circulaires
    const waterLevelGauge = document.getElementById("waterLevelGauge").getContext("2d");
    const foodLevelGauge = document.getElementById("foodLevelGauge").getContext("2d");
    const temperatureGauge = document.getElementById("temperatureGauge").getContext("2d");

    function createGauge(ctx, value, label, color) {
        return new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: [label, "Restant"],
                datasets: [{
                    data: [value, 100 - value],
                    backgroundColor: [color, "#34495E"]
                }]
            },
            options: {
                responsive: true,
                cutout: "70%",
                plugins: {
                    tooltip: false,
                }
            }
        });
    }

    createGauge(waterLevelGauge, 60, "Eau", "#1ABC9C");
    createGauge(foodLevelGauge, 45, "Nourriture", "#F1C40F");
    createGauge(temperatureGauge, 75, "Température", "#E74C3C");

    // Graphiques
    const monthlyDataChartCtx = document.getElementById("monthlyDataChart").getContext("2d");
    const weeklyConsumptionChartCtx = document.getElementById("weeklyConsumptionChart").getContext("2d");

    new Chart(monthlyDataChartCtx, {
        type: "line",
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Jour ${i + 1}`),
            datasets: [
                {
                    label: "Consommation d'Eau (litres)",
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50 + 50)),
                    borderColor: "#1ABC9C",
                    fill: false,
                },
                {
                    label: "Nourriture consommée (kg)",
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30 + 20)),
                    borderColor: "#F1C40F",
                    fill: false,
                },
                {
                    label: "Température moyenne (°C)",
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15 + 25)),
                    borderColor: "#E74C3C",
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Jours"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Valeurs"
                    }
                }
            }
        }
    });

    new Chart(weeklyConsumptionChartCtx, {
        type: "bar",
        data: {
            labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
            datasets: [
                {
                    label: "Consommation d'Eau (litres)",
                    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50 + 50)),
                    backgroundColor: "#1ABC9C"
                },
                {
                    label: "Nourriture consommée (kg)",
                    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30 + 20)),
                    backgroundColor: "#F1C40F"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Jours"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Valeurs"
                    }
                }
            }
        }
    });
});
