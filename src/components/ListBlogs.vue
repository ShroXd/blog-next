<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isValidBlogs, formatDate } from '~/utilies'

const router = useRouter()
const routes = router
  .getRoutes()
  .filter(isValidBlogs)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))

console.log(routes)
</script>

<template>
  <ul>
    <div class="text-5xl font-bold mb-4">
      Blogs
    </div>
    <div class="text-base opacity-60">
      While the world sleeps, you dream
    </div>
    <Divider />
    <div
      v-for="route in routes"
      :key="route.path"
      class="mb-12"
    >
      <router-link
        class="text-lg"
        :to="route.path"
      >
        <span class="text-2xl inline-block mr-3 mb-3 cursor-pointer">
          {{ route.meta.frontmatter.title }} {{ route.meta.frontmatter.draft && ' 🚧' }}
        </span>
      </router-link>
      <div class="opacity-60 text-sm mb-1">
        {{ route.meta.frontmatter.summary }}
      </div>
      <div class="opacity-30 text-sm">
        {{ formatDate(route.meta.frontmatter.date) }}
      </div>
    </div>
  </ul>
</template>
