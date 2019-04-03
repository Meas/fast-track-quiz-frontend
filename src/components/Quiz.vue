<template>
    <div>
      <div>
        <v-btn v-on:click="next">Next</v-btn>
      </div>
      <transition name="list-complete" mode="out-in">
        <!-- <span v-for="(index, item) in items" v-bind:key="item" v-if="index == activeIndex" class="list-complete-item">
          {{ item }}
        </span> -->
        <div :key="activeIndex" class="list-complete-item">
          {{activeQuestion}}
        </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      activeIndex: 0
    }
  },
  computed: {
    activeQuestion() {
      return this.items[this.activeIndex];
    }
  },
  methods: {
    next() {
      this.activeIndex++;
    }
    /* randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    }, */
  }
}
</script>
<style>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  position: absolute;
}
.list-complete-enter
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
