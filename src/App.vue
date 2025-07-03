<template>
  <div>
    <h1>スコアシミュレーター（MVP）</h1>

    <SongInput v-model="song" />
    <CardInput v-model="card" />
    <button @click="simulate">シミュレーション実行</button>

    <SimulationResult :logs="logs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SongInput from './components/SongInput.vue'
import CardInput from './components/CardInput.vue'
import SimulationResult from './components/SimulationResult.vue'
import { useSimulator } from './composables/useSimulator'

const song = ref({
  attribute: 'スマイル',
  skillActivations: 5,
  feverSections: [2, 3],
  masteryLevel: 20,
})

const card = ref({
  character: '花帆',
  smile: 500,
  pure: 400,
  cool: 300,
  styleLevel: 1,
  skillLevel: 1,
  skill: {
    effects: [
      { type: 'ボルテージゲイン', value: 100 }
    ]
  }
})

const logs = ref([])
const { simulateSong } = useSimulator()

function simulate() {
  logs.value = simulateSong(song.value, card.value)
}
</script>
