<template>
  <div>
    <h2>カード情報</h2>
    <label>キャラ名: <input v-model="modelValue.character" /></label>
    <label
      >スマイル: <input type="number" v-model.number="modelValue.smile"
    /></label>
    <label
      >ピュア: <input type="number" v-model.number="modelValue.pure"
    /></label>
    <label
      >クール: <input type="number" v-model.number="modelValue.cool"
    /></label>
    <label
      >スタイルレベル:
      <input type="number" v-model.number="modelValue.styleLevel"
    /></label>
    <label
      >スキルレベル:
      <input type="number" v-model.number="modelValue.skillLevel"
    /></label>
    <label
      >スキル（JSON形式）:
      <textarea v-model="skillText" @blur="updateSkill" rows="5" cols="40" />
    </label>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
const props = defineProps(["modelValue"]);
const skillText = ref(JSON.stringify(props.modelValue.skill, null, 2));
function updateSkill() {
  try {
    props.modelValue.skill = JSON.parse(skillText.value);
  } catch (e) {
    alert("スキルのJSONが不正です");
  }
}
</script>
