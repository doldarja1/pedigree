<template>
  <PageLayout>
    <section class="p-16">
      <FeedbackForm v-model="feed"/>
      <SimpleButton
        class ="feedback-page__btn" 
        type="primary" 
        @click="() => sendMessage()"
      >
      Отправить
      </SimpleButton>
      <SimpleButton
        class ="feedback-page__btn" 
        type="info" 
        @click="() => cancel()"
      >
      Вернуться
      </SimpleButton>
    </section>
  </PageLayout>
</template>

<script>
import FeedbackForm from '../forms/FeedbackForm.vue'
import PageLayout from '../parts/PageLayout.vue'
import SimpleButton from '../ui/SimpleButton.vue'
import axios from 'axios'

export default {
  name: 'FeedbackPage',
  data () {
    return {
      feed: { }
    }
  },
  components: {
    PageLayout,
    SimpleButton,
    FeedbackForm
  },
  methods: {
    cancel () {
      this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    },
    sendMessage () {
      console.log(this.feed)
      axios.post('https://ourfeed', this.feed)
      .then(response => {
        console.log('Результат ', response)
      })
      .catch(error => {
        console.error('Ошибка ', error)
      })
    }
  }
}
</script>

<style scoped lang="less">
.feedback-page {
  &__btn {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
</style>
