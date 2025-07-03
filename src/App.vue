<template>
  <div>
    <h1>スコアシミュレーター（デッキ対応・特殊効果対応）</h1>

    <SongInput v-model="song" />
    <div v-for="(card, i) in deck" :key="i">
      <h3>{{ i + 1 }}枚目のカード</h3>
      <CardInput v-model="deck[i]" />
    </div>
    <button @click="simulate">シミュレーション実行</button>

    <SimulationResult :logs="logs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SongInput from "./components/SongInput.vue";
import CardInput from "./components/CardInput.vue";
import SimulationResult from "./components/SimulationResult.vue";
import { useSimulator } from "./composables/useSimulator";

const song = ref({
  attribute: "スマイル",
  skillActivations: 12,
  feverSections: [3, 4, 5],
  masteryLevel: 20,
});

const emptyCard = () => ({
  character: "花帆",
  smile: 500,
  pure: 400,
  cool: 300,
  styleLevel: 1,
  skillLevel: 1,
  skill: {
    effects: [{ type: "ボルテージゲイン", value: 100 }],
  },
});

const deck = ref([
  emptyCard(),
  emptyCard(),
  emptyCard(),
  emptyCard(),
  emptyCard(),
  emptyCard(),
]);

const logs = ref([]);
const { simulateDeck } = useSimulator();

function simulate() {
  logs.value = simulateDeck(song.value, deck.value);
}
</script>
