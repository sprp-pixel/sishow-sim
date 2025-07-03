<template>
  <div class="card-input">
    <h3>カード情報</h3>

    <label
      >プリセット:
      <select @change="applyPreset($event.target.value)">
        <option value="">-- 選択 --</option>
        <option v-for="(preset, name) in cardMasters" :key="name" :value="name">
          {{ name }}
        </option>
      </select>
    </label>

    <label
      >名前:
      <input v-model="modelValue.name" />
    </label>

    <div
      class="skill-summary"
      :title="skillJson"
      @click="editing = true"
      v-if="!editing"
    >
      スキル効果（クリックで編集）
    </div>
    <textarea
      v-else
      v-model="skillJson"
      rows="8"
      cols="30"
      @blur="editing = false"
      placeholder='[
  { "type": "スコアアップ", "value": 100 },
  { "type": "スコアブースト", "value": 200 }
]'
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { cardMasters } from "../data/cardMasters";

const props = defineProps(["modelValue"]);
const skillJson = ref(JSON.stringify(props.modelValue.skill.effects, null, 2));
const editing = ref(false);

watch(skillJson, (val) => {
  try {
    props.modelValue.skill.effects = JSON.parse(val);
  } catch {}
});

watch(
  () => props.modelValue.skill.effects,
  (val) => {
    skillJson.value = JSON.stringify(val, null, 2);
  },
  { deep: true }
);

const applyPreset = (key: string) => {
  if (!key || !cardMasters[key]) return;
  props.modelValue.name = key;
  props.modelValue.skill.effects = JSON.parse(
    JSON.stringify(cardMasters[key].effects)
  );
};
</script>

<style scoped>
.card-input {
  flex: 1 1 14%;
  min-width: 180px;
  box-sizing: border-box;
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
}
label {
  display: block;
  font-size: 0.9rem;
  margin: 0.3rem 0;
}
input,
select,
textarea {
  width: 100%;
  font-size: 0.9rem;
  box-sizing: border-box;
}
.skill-summary {
  font-size: 0.85rem;
  color: #333;
  background: #eef;
  padding: 0.3rem;
  margin-top: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
