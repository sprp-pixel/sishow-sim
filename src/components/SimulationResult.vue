<template>
  <div>
    <h2>スキル発動ログ</h2>
    <table border="1">
      <thead>
        <tr>
          <th>発動</th><th>Fever</th><th>効果</th><th>VP</th><th>スコア</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.turn">
          <td>{{ log.turn }}</td>
          <td>{{ log.isFever ? "◯" : "-" }}</td>
          <td>
            <ul>
              <li v-for="e in log.effects">{{ e }}</li>
            </ul>
          </td>
          <td>{{ Math.round(log.voltagePoints) }}</td>
          <td>{{ log.totalScore }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({ logs: Array })
</script>
