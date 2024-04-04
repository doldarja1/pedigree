<template>
  <PageLayout>
    <section class="p-16">
      Родословная
<!--      <button @click="() => openHelpModal()">Open modal</button>-->
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals"
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout
  },
  computed: {
    ...mapGetters('persons', [
      'getCenter',
      'getAllPersons'
    ])
  },
  methods: {
    redirectToDefaultPersonPage () {
      const first = this.getAllPersons[0] || {}
      const id = this.getCenter || first.id
      if (id) {
        this.$router.push({ name: this.$routes.PERSON, params: { id } })
      }
    }
  },
  mounted () {
    this.redirectToDefaultPersonPage();
  }
}
</script>
