<template>
  <div class="container">
    <h1 class="title">
      Budidaya Labu Siam Berteknologi IoT dan Panel Surya <br />
      Pada Lahan NonProduktif Untuk Meningkatkan Pendapatan <br />
      Kelompok PKK di Desa Belantih
    </h1>

    <div class="content">
      <!-- Chart di sebelah kiri -->
      <div class="chart-box">
        <SoilChart />
      </div>

      <!-- Tombol kontrol di sebelah kanan -->
      <div class="control-box">
        <button class="btn btn-on" @click="setRelay('ON')"> SIRAM</button>
        <button class="btn btn-off" @click="setRelay('OFF')"> MATIKAN</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SoilChart from '~/components/SoilChart.vue'
import { ref as dbRef, set } from "firebase/database"

// ambil db dari Nuxt plugin
const { $db } = useNuxtApp()

// fungsi kontrol relay
const setRelay = async (state) => {
  try {
    const relayRef = dbRef($db, "relay/state")
    await set(relayRef, state)
    console.log("Relay set to:", state)
  } catch (err) {
    console.error("Error setting relay:", err)
  }
}
</script>

<style>
/* Container utama */
.container {
  min-height: 100vh;
  padding: 20px;
  background: #f4f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Judul */
.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #2c3e50;
  line-height: 1.4;
}

/* Layout konten (chart kiri, tombol kanan) */
.content {
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
}

/* Chart area */
.chart-box {
  flex: 0 0 60%;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
}

/* Control area */
.control-box {
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

/* Button styling */
.btn {
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-on {
  background: #27ae60;
  color: white;
}

.btn-on:hover {
  background: #1e8449;
}

.btn-off {
  background: #e74c3c;
  color: white;
}

.btn-off:hover {
  background: #c0392b;
}
</style>
