<template>
  <div v-if="person" class="person-card">
    <div>
      <PhotoPreview size="large" :photo="photo"/>
    </div>
    <div>
      <div class="person-card__fullname">
        <h1 id="info-section">{{ fullName }}</h1>
        <div class="person-card__status-indicator" :class="genderClass"></div>
      </div>
      <span class="person-card__dates">{{ birthDate }}</span>
      <span v-if="dieDate" class="person-card__dates"> - {{ dieDate }}</span>

      <h2 id="parents-section">Родители</h2>
      <div class="person-card__information-text">
        <div v-if="parents && parents.length > 0">
          <PopOver v-for="parent in parents" :key="parent.id">
            <RelateButton :person="parent" relate="parent" />
            <template slot="popover">
              <PersonPreviewCard :person="parent" />
            </template>
          </PopOver>
        </div>
        <div v-else>Информации нет</div>
      </div>

      <h2 id="childs-section">Дети</h2>
      <div class="person-card__information-text">
        <div v-if="person.children && person.children.length > 0">
          <span v-for="child in children" :key="child.id">
            <PopOver>
              <RelateButton :person="child" relate="child"/>
              <template slot="popover">
                <PersonPreviewCard :person="child"/>
              </template>
            </PopOver>
          </span>
        </div>
        <div v-else>Детей нет</div>
      </div>

      <h2 id="activity-section">Род деятельности</h2>
      <div class="person-card__information-text">
        {{ activity }}
      </div>

      <h2 id="biography-section">Биография</h2>
      <div class="person-card__information-text">
        {{ biography }}
      </div>

      <h2 id="education-section">Образование</h2>
      <div v-if="person.educations && person.educations.length" class="custom-grid">
        <EducationItem
          v-for="(education, index) in person.educations"
          :key="index"
          :education="education"
        />
      </div>
      <div v-else class="person-card__information-text">
        Информации нет
      </div>

      <h2 id="weddings-section">Брачные союзы</h2>
      <div v-if="person.weddings && person.weddings.length" class="custom-grid">
        <WeddingItem
          v-for="(wedding, index) in person.weddings"
          :key="index"
          :wedding="wedding"
        />
      </div>
      <div v-else class="person-card__information-text">
        Информации нет
      </div>

      <h2 id="military-section">Военная служба</h2>
      <div v-if="person.militaries && person.militaries.length" class="custom-grid">
        <MilitaryItem
          v-for="(military, index) in person.militaries"
          :key="index"
          :military="military"
        />
      </div>
      <div v-else class="person-card__information-text">
        Информации нет
      </div>
    </div>
  </div>
</template>

<script>
import WeddingItem from '../parts/WeddingItem.vue'
import EducationItem from '../parts/EducationItem.vue'
import MilitaryItem from '../parts/MilitaryItem.vue'
import PhotoPreview from '../ui/PhotoPreview.vue'
import RelateButton from '@/components/ui/RelateButton.vue'
import PopOver from '../ui/PopOver.vue'
import PersonPreviewCard from './PersonPreviewCard.vue'
import { formatPersonName } from '@/services/formatPersonName'
import { mapGetters } from 'vuex'
import { maskDatetime, defaultImage } from '@/utils/mask'

export default {
  name: 'PersonCard',
  components: {
    EducationItem,
    WeddingItem,
    MilitaryItem,
    PhotoPreview,
    RelateButton,
    PopOver,
    PersonPreviewCard
  },
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('persons', [
      'getPersonsByIds',
      'filteredPersons',
      'getAvailablePersons'
    ]),
    ...mapGetters('settings', [
      'getAccess'
    ]),
    activity () {
      if (this.needHide) {
        return 'Информация скрыта'
      }
      return this.person.activity || 'Информации нет'
    },
    biography () {
      if (this.needHide) {
        return 'Информация скрыта'
      }
      return this.person.biography || 'Информации нет'
    },
    birthDate () {
      if (!this.person.birthDate) {
        return null
      }
      if (!this.needHide) {
        return this.person.birthDate
      }
      return maskDatetime(this.person.birthDate)
    },
    children () {
      if (!this.person.children) {
        return []
      }
      return this.getPersonsByIds(this.person.children.map(i => i.child)).filter((person) => {
        return !person.removed
      });
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
    fullName () {
      return formatPersonName(this.person, { short: false, access: this.needHide })
    },
    needHide () {
      return this.person.access && this.getAccess
    },
    photo () {
      if (!this.needHide) {
        return this.person.photo
      }
      return defaultImage
    },
    parents () {
      return this.getAvailablePersons.filter((person) => {
        return person.children && person.children.includes(this.person.id)
      })
    },
    genderClass () {
      const gender = this.person.gender || ''
      return `person-card__status-indicator__${ gender.toLowerCase() }`
    }
  }
}
</script>

<style scoped lang="less">
.person-card {
  display: flex;
  gap: 15px;

  &__dates {
    font-size: 12px;
    color: grey;
    padding-bottom: 20px;
  }

  &__information-text {
    font-weight: 500;
    font-size: 10px;
    padding-bottom: 20px;
    color: black;
  }

  &__fullname {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  &__status-indicator {
    width: 15px;
    height: 15px;
    border-radius: 50%;

    &__female {
      background-color: #ACFFE6;
    }

    &__male {
      background-color: #ACFFB4;
    }
  }
}

@media (max-width: 720px) {
  .person-card {
    display: flex;
    width: 100%;
    gap: 15px;
    flex-direction: column;
    align-items: center;
  }
}
</style>
