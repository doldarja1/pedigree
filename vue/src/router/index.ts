import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/pages/Home.vue'
import PersonPage from '../components/pages/PersonPage.vue'
import EditPersonPage from '../components/pages/EditPersonPage.vue'
import CreatePersonPage from '../components/pages/CreatePersonPage.vue'
import SettingsPage from '../components/pages/SettingsPage.vue'
import PersonList from '../components/pages/PersonList.vue'
import FeedbackPage from '@/components/pages/FeedbackPage.vue'
import ServicePage from '@/components/pages/ServicePage.vue'
import { RouteNames } from './routes'
import store from '@/store/index'
import { formatPersonName } from '@/services/formatPersonName'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    meta: { title: 'Главная' },
    component: HomePage
  },
  {
    path: '/person/:id',
    name: RouteNames.PERSON,
    meta: { title: '' },
    component: PersonPage
  },
  {
    path: '/person/:id/edit',
    name: RouteNames.EDIT_PERSON,
    meta: { title: '' },
    component: EditPersonPage
  },
  {
    path: '/create',
    name: RouteNames.CREATE_PERSON,
    meta: { title: 'Создание' },
    component: CreatePersonPage
  },
  {
    path: '/settings',
    name: RouteNames.SETTINGS,
    meta: { title: 'Настройки' },
    component: SettingsPage
  },
  {
    path: '/list',
    name: RouteNames.PERSON_LIST,
    meta: { title: 'Список людей' },
    component: PersonList
  },
  {
    path: '/feedback',
    name: RouteNames.FEEDBACK,
    meta: { title: 'Отзыв' },
    component: FeedbackPage
  },
  {
    path: '/service',
    name: RouteNames.SERVICE,
    meta: { title: 'Сервис' },
    component: ServicePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

const DEFAULT_TITLE = 'Родословная';
router.afterEach((to, from) => {
    Vue.nextTick(() => {
      if(to.params.id && to.name == RouteNames.PERSON || to.name == RouteNames.EDIT_PERSON){
        const personId = to.params.id;
        const person = store.modules.persons.getters.getPersonById(store.modules.persons.state)(personId);
        const pageTitle = person ? formatPersonName(person, {short: false}) : to.meta?.title;
        document.title = pageTitle ? `${pageTitle} - ${DEFAULT_TITLE}` : DEFAULT_TITLE;
      }
      else{
        document.title = (to.meta?.title ? to.meta?.title + " - " + DEFAULT_TITLE : undefined) || DEFAULT_TITLE;
      }
    });
});

export default router
