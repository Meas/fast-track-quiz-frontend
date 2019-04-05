<template>
  <v-form @submit.prevent="submit" class="px-2 py-2">
    <v-card-title primary-title>
      <h3 class="headline mb-0">
        {{title}}
      </h3>
    </v-card-title>
    <v-card-actions>
      <v-radio-group v-model="answerId" class="px-3">
        <v-radio :label="answer.text" :value="answer.id" v-for="answer in randomizedAnswers" :key="answer.id" />
      </v-radio-group>
    </v-card-actions>
    <v-card-text class="px-0">
      <v-btn type="submit" 
        :color="isLastQuestion ? 'success' : 'info'" 
        :disabled="!hasAnswered || submitted"
        :loading="submitted">{{submitText}}</v-btn>
    </v-card-text>
  </v-form>
</template>

<script>
export default {
  name: 'Question',
  props: {
    question: Object,
    onQuestionSubmit: Function,
    isLastQuestion: Boolean,
    questionNumber: Number,
    totalQuestions: Number
  },
  data() {
    return {
      answerId: 0,
      submitted: false
    }
  },
  computed: {
    title() {
      return `${this.question.text} (${this.questionNumber}/${this.totalQuestions})`
    },
    hasAnswered() {
      return this.answerId != 0;
    },
    submitText() {
      if(this.isLastQuestion)
        return 'Submit';
      return 'Next';
    },
    randomizedAnswers () {
      return this.question.answers.sort(() => {return 0.5 - Math.random()});
    }
  },
  methods: {
    submit() {
      const data = {
        questionId: this.question.id,
        answerId: this.answerId
      }
      this.submitted = true;
      this.onQuestionSubmit(data);
    }
  }
}
</script>