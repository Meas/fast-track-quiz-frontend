<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <transition name="list-complete" mode="out-in">
        <div :key="0" class="text-xs-center list-complete-item" v-if="sessionId.length == 0">
          <v-btn v-on:click="getQuestions" class="list-complete-item"  large>Start Quiz</v-btn>
        </div>
        <v-card :key="activeQuestion.id" class="list-complete-item" v-else-if="!quizFinished">
          <question :question="activeQuestion"
           :onQuestionSubmit="onQuestionSubmit"
           :isLastQuestion="isLastQuestion"
           :questionNumber="activeIndex+1"
           :totalQuestions="questions.length" />
        </v-card>
        <v-card :key="activeQuestion.id+1" class="list-complete-item" v-else>
          <quiz-results :results="results"
           :onRestart="restartQuiz"
           :totalQuestions="questions.length" />
        </v-card>
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import Question from './Question'
import QuizResults from './QuizResults'
import preventReloadMixin from '../mixins/preventReloadMixin'
import quizService from '../services/quizService'

export default {
  name: 'Quiz',
  data() {
    return this.initData();
  },
  components: {
    Question,
    QuizResults
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
    },
    quizFinished() {
      //return Object.entries(this.results).length === 0 && this.results.constructor === Object
      return Object.keys(this.results).length
    }
  },
  methods: {
    initData() {
      return {
        activeIndex: 0,
        questions: [],
        sessionId: '',
        answers: [],
        results: {}
      }
    },
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
      this.results = await quizService.submitAnswers(this, data);
      this.removeBeforeUnload();
    },
    restartQuiz() {
      //this.$data = this.initData();
      Object.assign(this.$data, this.initData());
      this.getQuestions();
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
