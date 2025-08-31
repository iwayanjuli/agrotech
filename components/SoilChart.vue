<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Grafik Kelembapan Tanah</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js"
import { useNuxtApp } from "#app"
import { onMounted, ref } from "vue"

Chart.register(...registerables)

const { $db, $dbRef, $onValue } = useNuxtApp()
const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  const soilRef = $dbRef($db, "sensor/soil")

  $onValue(soilRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      const entries = Object.entries(data).sort(([a], [b]) => a - b)

      const labels = entries.map(([time]) =>
        new Date(Number(time)).toLocaleTimeString()
      )
      const values = entries.map(([, value]) => value)

      if (chartInstance) {
        chartInstance.data.labels = labels
        chartInstance.data.datasets[0].data = values
        chartInstance.update()
      } else {
        chartInstance = new Chart(chartCanvas.value, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Kelembapan (%)",
                data: values,
                borderColor: "blue",
                fill: false,
                tension: 0.3
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true, max: 100 }
            }
          }
        })
      }
    }
  })
})
</script>
