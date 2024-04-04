<template>
  <div v-if="currentRole === 'admin'" class="navigation-panel">
    <span class="navigation-panel__link__wrapper">
      <SimpleButton
        class="navigation-panel__link"
        :class="{ 'disabled': buttonDisabled }"
        :disabled="buttonDisabled"
        @click="() => saveId()"
      >
        Запомнить
      </SimpleButton>
    </span>

    <span class="navigation-panel__link__wrapper">
      <SimpleButton
        class="navigation-panel__link"
        type="danger"
        @click="() => deletePersonInButton()"
      >
        Удалить
      </SimpleButton>
    </span>

    <RouterLink
      class="navigation-panel__link__wrapper"
      :to="{ name: $routes.EDIT_PERSON, params: { id: $route.params.id } }"
    >
      <SimpleButton
        class="navigation-panel__link"
        type="warning"
      >
        Редактировать
      </SimpleButton>
    </RouterLink>
  </div>
</template>

<script>
import SimpleButton from "./SimpleButton.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    SimpleButton,
  },
  computed: {
    ...mapGetters('persons', [
      'getCenter',
      'getPersonById'
    ]),
    ...mapGetters('settings', [
      'getMode'
    ]),
    buttonDisabled () {
      return this.getCenter === this.id
    },
    isUserPage () {
      return this.$route.name === 'PERSON'
    },
    id () {
      return this.$route.params.id
    },
    currentRole () {
      return this.getMode
    }
  },
  methods: {
    ...mapActions('persons', [
      'deletePerson',
      'setCenter'
    ]),
    saveId () {
      this.setCenter(this.id);
    },
    deletePersonInButton () {
      this.$confirm('Действительно хотите удалить профиль? Это действие невозможно будет отменить', 'Удаление', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
      .then(() => this.deletePerson(this.id))
      .then(() => {
        this.$message({
          type: 'success',
          message: 'Удаление выполнено'
        })
        this.$router.push({ name: this.$routes.HOME });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.navigation-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;

  &__link {
    width: 100%;

    &__wrapper {
      flex: 1;
    }
  }
}

@media (max-width: 720px) {
  .navigation-panel {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
}
</style>
