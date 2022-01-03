import dayjs from 'dayjs'
import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router'

export const isValidBlogs = (r: RouteRecordNormalized) =>
  r.name && r.path.startsWith('/blogs') && r.meta.frontmatter.date

export const formatDate = (d: string | Date) =>
  dayjs(d).format('MMM D, YYYY')

export const isBlogPage = (r: RouteLocationNormalizedLoaded) =>
  r.path.split('/').slice(-2)[0] === 'blogs'
