<template>
  <PageLayout>
    <section class="p-16">
      <PersonForm v-model="form" ref="personForm" />
      <SimpleButton 
        class ="person-page__btn" 
        type="primary" 
        @click="() => editPersonHandler()"
      >
        Сохранить
      </SimpleButton>
      <SimpleButton 
        class ="person-page__btn" 
        type="danger" 
        @click="() => cancel()"
      >
        Отмена
      </SimpleButton>
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageLayout from '../parts/PageLayout.vue'
import PersonForm from '../forms/PersonForm.vue'
import { emptyPerson } from '@/services/person'
import SimpleButton from '../ui/SimpleButton.vue'

export default {
  name: 'EditPersonPage',
  components: {
    PageLayout,
    PersonForm,
    SimpleButton
  },
  data () {
    return {
      form: emptyPerson()
    }
  },
  computed: {
    ...mapGetters('persons', [
      'getPersonById'
    ]),
    ...mapGetters('settings', [
      'getMode'
    ]),
    id () {
      return this.$route.params.id
    },
    person () {
      return this.getPersonById(this.id)
    }
  },
  mounted () {
    if(this.getMode === 'user') { 
      this.$router.push({ name: this.$routes.HOME })
    } else {
      if (this.person) {
        this.form = {
          ...this.form,
          ...this.person
        }
      } else {
        this.$router.push({ path: '/' })
      }
    }
  },
  methods: {
    ...mapActions('persons', [
      'editPerson'
    ]),
    editPersonHandler () {
      const isEmptyH = this.$refs.personForm.checkEmptyForms();
      if (!isEmptyH) {
        return;
      }
      this.editPerson(this.form);
      this.$router.push({ name: "PERSON"});
    },
    cancel () {
      this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.person-page {
  &__btn {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
</style>
