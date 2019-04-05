<template>
  <div class="px-2 py-2">
    <v-card-title primary-title>
      <h3 class="headline mb-0">
        {{title}}
      </h3>
    </v-card-title>
    <v-card-actions>
      <div class="px-4">
        <div>{{betterThan}}</div>
        <div>{{betterOrEqualThan}}</div>
      </div>
    </v-card-actions>
    <v-card-text class="px-0">
      <v-btn color="success" @click="onRestart()">Restart test</v-btn>
    </v-card-text>
  </div>
</template>

<script>
export default {
  name: 'QuizResults',
  props: {
    totalQuestions: Number,
    results: Object,
    onRestart: Function
  },
  computed: {
    title() {
        return `You scored answered ${this.results.points} / ${this.totalQuestions} correctly!`
    },
    betterThan() {
        return `You scored better than ${this.getPercentage(this.results.betterThan)}% of people who did this test`
    },
    betterOrEqualThan() {
        return `You scored better or equal than ${this.getPercentage(this.results.betterOrEqualThan)}% of people who did this test`
    }
  },
  methods: {
    getPercentage(value) {
        return (value*100).toPrecision(4)
    }
  }
}
</script>