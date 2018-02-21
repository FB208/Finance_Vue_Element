import Vue from 'vue'
import Router from 'vue-router'
import EditTable from '@/components/EditTable'
import testpage from '@/components/testpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EditTable',
      component: EditTable
    },
	{
      path: '/testpage',
      name: 'testpage',
      component: testpage
    }
  ]
})
