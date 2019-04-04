<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Quiz App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fill-height>
      <v-content>
        <quiz />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Quiz from './components/Quiz'

export default {
  name: 'App',
  components: {
    Quiz
  },
  data () {
    return {
      //
    }
  }
}
</script>
