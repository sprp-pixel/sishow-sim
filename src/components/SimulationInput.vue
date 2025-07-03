<template>
  <div>
    <h2>デッキ編成</h2>
    <div class="card-list">
      <CardInput v-for="(card, i) in deck" :key="i" v-model="deck[i]" />
    </div>

    <h2>曲設定</h2>
    <SongInput v-model="song" />

    <h2>結果</h2>
    <SimulationResult :logs="logs" />
  </div>
</template>

<script setup lang="ts">
import CardInput from "./CardInput.vue";
import SongInput from "./SongInput.vue";
import SimulationResult from "./SimulationResult.vue";
import { reactive, ref, watch } from "vue";
import { useSimulator } from "../composables/useSimulator";

const { simulateDeck } = useSimulator();

const deck = reactive(
  [{}, {}, {}, {}, {}, {}].map(() => ({
    name: "",
    skill: { effects: [] },
  }))
);

const song = ref({
  attribute: "スマイル",
  masteryLevel: 1,
  skillActivations: 30,
  feverSections: [],
});

const logs = ref([]);

watch(
  [deck, song],
  () => {
    logs.value = simulateDeck(song.value, deck);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
