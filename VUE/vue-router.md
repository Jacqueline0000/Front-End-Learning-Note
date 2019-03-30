配置vue-router
1. 配置文件router.js
 > `注意是component不是components，不然页面不加载`
```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/list',
      component: () => import('./components/List.vue'), // 是component
      meta: {
        keepalive: true,
        title: '问题列表'
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./components/Detail.vue'),
      meta: {
        title: '问题详情'
      }
    },
    {
      path: '*',
      redirect: '/list',
      meta: {
        title: '问题列表'
      }
    }
  ]
})

```

2. App.vue里面使用`<router-view>`标签

3. 页面跳转使用`<router-link>`标签
    > `:to="{name:'detail',params:{queId:question.id}}"` 配置跳转路径
    ```vue
    <router-link v-for="(question,index) in questions"
              :key="index"
              :to="{name:'detail',params:{queId:question.id}}"
              tag="li">
    </router-link>
    ```
