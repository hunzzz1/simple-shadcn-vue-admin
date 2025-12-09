<script>
export const iframeHeight = '800px'
export const description = 'A simple sidebar with navigation grouped by section.'
</script>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink, useRouter, RouterView } from 'vue-router'
import { Search, SunMedium, Settings } from 'lucide-vue-next'
import AppSidebar from '@/layout/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {Button} from "@/components/ui/button/index.js";

const route = useRoute()
const router = useRouter()

// 根据当前路由的 meta 生成面包屑
const breadcrumbs = computed(() => {
  const meta = route.meta || {}
  const group = meta.group || '概览'
  const title = meta.title || '当前页面'

  const groupCount = getGroupCount(group)

  return [
    {
      label: group,
      to: groupCount > 1 ? '/dashboard' : null, // ❗ 单菜单 group 不允许跳转
      isLink: groupCount > 1, // ❗ 是否可点击
    },
    {
      label: title,
      to: route.path,
      isLink: false,
    },
  ]
})

// 找出某个 group 下有几个路由
function getGroupCount(groupName) {
  const allRoutes = router.getRoutes()
  return allRoutes.filter((r) => {
    const meta = r.meta || {}
    if (meta.hidden) return false
    return meta.group === groupName
  }).length
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            <!-- 第一个面包屑：group -->
            <BreadcrumbItem class="hidden md:block">
              <template v-if="breadcrumbs[0].isLink">
                <BreadcrumbLink as-child>
                  <RouterLink :to="breadcrumbs[0].to">
                    {{ breadcrumbs[0].label }}
                  </RouterLink>
                </BreadcrumbLink>
              </template>

              <template v-else>
                <!-- 单菜单，不可点击 -->
                <BreadcrumbPage>{{ breadcrumbs[0].label }}</BreadcrumbPage>
              </template>
            </BreadcrumbItem>

            <BreadcrumbSeparator v-if="breadcrumbs[0].isLink" class="hidden md:block" />

            <!-- 第二个面包屑：当前页面 -->
            <BreadcrumbItem>
              <BreadcrumbPage>
                {{ breadcrumbs[1].label }}
              </BreadcrumbPage>
            </BreadcrumbItem>

          </BreadcrumbList>
        </Breadcrumb>

        <!-- 右侧：搜索 + 图标 + 头像 -->
        <div class="ml-auto flex items-center gap-4">
          <!-- 搜索框 -->
          <button
              type="button"
              class="group flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5
               text-sm text-slate-500 shadow-sm transition
               hover:border-slate-300 hover:bg-white"
          >
            <div class="flex items-center gap-2">
              <Search class="h-4 w-4 text-slate-400" />
              <span class="text-[13px] leading-none">Search</span>
            </div>
            <span
                class="ml-2 inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5
                 text-[11px] font-medium text-slate-400"
            >
          ⌘ K
        </span>
          </button>

          <!-- 主题切换图标（先当普通按钮用） -->
          <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-700
               hover:bg-slate-100 transition"
          >
            <SunMedium class="h-4 w-4" />
          </button>

          <!-- 设置图标 -->
          <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-700
               hover:bg-slate-100 transition"
          >
            <Settings class="h-4 w-4" />
          </button>

          <!-- 用户头像（首字母） -->
          <button
              type="button"
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100
               text-xs font-semibold text-slate-800"
          >
            SN
          </button>
        </div>
      </header>

      <div class="flex flex-1 flex-col gap-4 p-4">
        <RouterView/>

      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
