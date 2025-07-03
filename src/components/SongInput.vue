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
      >フィーバー回数 (カンマ区切り):
      <input v-model="feverInput" @blur="updateFever" />
    </label>
    <label
      >マスタリーレベル:
      <input type="number" v-model.number="modelValue.masteryLevel"
    /></label>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["modelValue"]);
const feverInput = ref(props.modelValue.feverSections.join(","));
const updateFever = () => {
  props.modelValue.feverSections = feverInput.value
    .split(",")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
};
</script>
