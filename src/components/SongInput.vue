<template>
  <div>
    <h2>曲情報</h2>
    <label
      >属性:
      <select v-model="modelValue.attribute">
        <option>スマイル</option>
        <option>ピュア</option>
        <option>クール</option>
      </select>
    </label>
    <label
      >スキル発動回数:
      <input type="number" v-model.number="modelValue.skillActivations"
    /></label>
    <label
      >フィーバー開始回: <input type="number" v-model.number="feverStart"
    /></label>
    <label
      >フィーバー終了回:
      <input type="number" v-model.number="feverEnd" @change="updateFever"
    /></label>
    <label
      >マスタリーレベル:
      <input type="number" v-model.number="modelValue.masteryLevel"
    /></label>
    <label
      >合計アピール値（任意）:
      <input type="number" v-model.number="modelValue.manualAppeal"
    /></label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["modelValue"]);
const feverStart = ref(props.modelValue.feverSections[0] || 1);
const feverEnd = ref(props.modelValue.feverSections.at(-1) || 1);

const updateFever = () => {
  const start = feverStart.value;
  const end = feverEnd.value;
  const sections = [];
  for (let i = start; i <= end; i++) {
    sections.push(i);
  }
  props.modelValue.feverSections = sections;
};
</script>
