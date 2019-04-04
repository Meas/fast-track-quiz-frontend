<template>
  <v-form @submit.prevent="submit">
    <v-card-title primary-title>
      <h3 class="headline mb-0">
        {{question.text}}
      </h3>
    </v-card-title>
    <v-card-actions>
      <v-radio-group v-model="answerId" class="px-3">
        <v-radio :label="answer.text" :value="answer.id" v-for="answer in question.answers" :key="answer.id" />
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
    isLastQuestion: Boolean
  },
  data() {
    return {
      answerId: 0,
      submitted: false
    }
  },
  computed: {
    hasAnswered() {
      return this.answerId != 0;
    },
    submitText() {
      if(this.isLastQuestion)
        return 'Submit';
      return 'Next';
    },
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