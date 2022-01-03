<script setup lang="ts">
import { formatDate, isBlogPage } from '~/utilies'

defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
</script>

<template>
  <div class="prose m-auto">
    <div v-if="isBlogPage(route)" class="mb-12">
      <div class="text-5xl font-black mb-2">
        {{ frontmatter.title }}
      </div>
      <div class="text-base opacity-70">
        {{ formatDate( frontmatter.date ) }}
      </div>
    </div>

    <slot />

    <div v-if="isBlogPage(route)" class="text-base mt-16 icon-btn">
      <router-link :to="route.path.split('/').slice(0, -1).join('/') || '/'">
        cd ..
      </router-link>
    </div>
  </div>
</template>
