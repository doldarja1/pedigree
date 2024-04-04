<template>
  <div class="person-preview-card">
    <PhotoPreview v-if="photo" class="person-preview-card__photo" size="middle" :photo="photo" />
    <div class="person-preview-card__information">
      <h2 class="person-preview-card__name">{{ secondName }}</h2>
      <h2 class="person-preview-card__name">{{ firstName }}</h2>
      <h2 class="person-preview-card__name">{{ patronymicName}}</h2>

      <span class="person-preview-card__date">{{ birthDate }}</span>
      <span v-if="dieDate" class="person-preview-card__date"> - {{ dieDate }}</span>

      <div class="person-preview-card__person-id">id: {{ person.id }}</div>
    </div>
    <div class="person-preview-card__status-indicator" :class="genderClass"></div>
  </div>
</template>

<script>
import PhotoPreview from '../ui/PhotoPreview.vue'
import { mapGetters } from 'vuex'
import { maskFio, maskDatetime, defaultImage} from '@/utils/mask'

export default {
  name: 'PersonPreviewCard',
  components: {
    PhotoPreview
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('settings', ['getAccess']),
    birthDate () {
      if (!this.person.birthDate) {
        return null
      }
      if (!this.needHide) {
        return this.person.birthDate
      }
      return maskDatetime(this.person.birthDate)
    },
    dieDate () {
      if (!this.person.dieDate) {
        return null
      }
      if (!this.needHide) {
        return this.person.dieDate
      }
      return maskDatetime(this.person.dieDate)
    },
    firstName () {
      if (!this.needHide) {
        return this.person.firstName 
      }
      return maskFio(this.person.firstName)
    },
    genderClass () {
      if (this.person.gender) {
        return `person-preview-card__status-indicator__${this.person.gender.toLowerCase()}`
      }
      return ''
    },
    patronymicName () {
      if (!this.needHide) {
        return this.person.patronymicName
      }
      return maskFio(this.person.patronymicName)
    },
    photo (){
      if (!this.needHide) {
        return this.person.photo
      }
      return defaultImage
    },
    needHide () {
      return this.person.access && this.getAccess
    },
    secondName () {
      if (!this.needHide) {
        return this.person.secondName 
      }
      return maskFio(this.person.secondName)
    }
  }
}
</script>

<style scoped lang="less">
.person-preview-card {
  border-radius: 24px;
  background-color: #f5f5f5;
  box-shadow: 1.5px 7px 5px 1.5px rgba(0, 0, 0, 0.1), -1.5px 7px 5px -1.5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: relative;
  margin: 20px;
  width: 425px;
  height: 215px;
  padding-left: 25px;

  &__information {
    margin-right: 55px;
  }

  &__photo {
    margin-top: 5px;
    margin-right: 20px;
  }

  &__name {
    font-family: 'Inter', sans-serif;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #000000;
  }

  &__date {
    font-family: 'Inter', sans-serif;
    color: #757575;
    font-weight: 700;
    white-space: nowrap;
  }

  &__person-id {
    font-family: 'Inter', sans-serif;
    margin-top: 34px;
    margin-bottom: 20px;
    font-weight: 700;
    color: #757575;
  }

  &__status-indicator {
    width: 25px;
    height: 25px;
    border-radius: 24px;
    position: absolute;
    top: 25px;
    right: 25px;

    &__female {
      background-color: #ACFFE6;
    }

    &__male {
      background-color: #ACFFB4;
    }
  }
}
</style>
