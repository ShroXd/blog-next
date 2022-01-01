import dayjs from 'dayjs'
import type { RouteRecordNormalized } from 'vue-router'

export const isValidBlogs = (r: RouteRecordNormalized) =>
  r.name && r.path.startsWith('/blogs') && r.meta.frontmatter.date

export const formatDate = (d: string | Date) =>
  dayjs(d).format('MMM D, YYYY')
