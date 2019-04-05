<template>
  <v-layout row wrap>
    <v-flex xs12 text class="text-xs-center">
      <transition name="list-complete" mode="out-in">
      <v-btn v-on:click="getQuestions" class="list-complete-item" v-if="sessionId.length == 0" large>Start Quiz</v-btn>
        <v-card :key="activeIndex" class="list-complete-item" v-else>
          <question :question="activeQuestion"
           :onQuestionSubmit="onQuestionSubmit"
           :isLastQuestion="isLastQuestion" />
        </v-card>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import Question from './Question'
import preventReloadMixin from '../mixins/preventReloadMixin'
import quizService from '../services/quizService'

export default {
  name: 'Quiz',
  data() {
    return {
      activeIndex: 0,
      questions: [],
      sessionId: '',
      answers: []
    }
  },
  components: {
    Question
  },
  mixins: [preventReloadMixin],
  computed: {
    activeQuestion() {
      if(this.questions.length === 0)
        return null;
      return this.questions[this.activeIndex];
    },
    isLastQuestion() {
      return this.activeIndex+1 == this.questions.length;
    }
  },
  methods: {
    async getQuestions() {
      const response = await quizService.getQuestions(this);
      this.questions = response.questions;
      this.sessionId = response.id;
      this.bindBeforeUnload();
    },
    onQuestionSubmit(data) {
      this.answers.push(data);

      if(!this.isLastQuestion)
        return this.activeIndex++;
      
      this.submitAnswers();
    },
    async submitAnswers() {
      const data = {
        id: this.sessionId,
        answers: this.answers
      }
      const response = await quizService.submitAnswers(this, data);
      console.log(response);
    }
  }
}
</script>
<style scoped>
.list-complete-item {
  transition: all 0.25s;
  /* display: inline-block; */
  /* position: absolute; */
}
.list-complete-enter {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-complete-leave-active {
  /* position: absolute; */
}
</style>
