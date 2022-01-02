<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const { t } = useI18n()
</script>

<template>
  <nav class="text-xl mt-2 mb-16 mx-2 flex items-center justify-end">
    <router-link class="icon-btn flex items-center mr-auto" to="/" :title="t('button.home')">
      <carbon-mountain />
    </router-link>

    <router-link class="icon-btn mx-2 mr-10" to="/blogs" :title="t('button.home')">
      <span class="lg:(hidden) flex items-center">
        <carbon-blog />
      </span>
      <span class="<lg:(hidden)">
        {{ t('menu.blog') }}
      </span>
    </router-link>

    <a class="icon-btn mx-2 mr-9 flex items-center" rel="noreferrer" href="https://github.com/ShroXd" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>

    <button class="flex items-center icon-btn ml-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>
  </nav>
</template>
