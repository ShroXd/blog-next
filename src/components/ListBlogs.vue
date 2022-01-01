<script setup lang="ts">
import { useRouter } from 'vue-router'
import { isValidBlogs, formatDate } from '~/utilies'

const router = useRouter()
const routes = router
  .getRoutes()
  .filter(isValidBlogs)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
</script>

<template>
  <ul>
    <div
      v-for="route in routes"
      :key="route.path"
    >
      <router-link
        class="text-lg"
        :to="route.path"
      >
        <span class="text-3xl inline-block mr-3 mb-4">
          {{ route.meta.frontmatter.title }}
        </span>
      </router-link>
      <div class="opacity-80 text-m mb-2">
        {{ route.meta.frontmatter.summary }}
      </div>
      <div class="opacity-50 text-sm">
        {{ formatDate(route.meta.frontmatter.date) }}
      </div>
      <hr class="!w-65ch">
    </div>
  </ul>
</template>
