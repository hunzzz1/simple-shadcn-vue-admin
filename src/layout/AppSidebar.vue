<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

import SearchForm from '@/components/SearchForm.vue'
import VersionSwitcher from '@/components/VersionSwitcher.vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

// ✅ 路由访问控制占位：以后接 userStore / token
function hasRouteAccess(meta) {
  return true
}

// props 透传给 <Sidebar>
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})

const router = useRouter()
const route = useRoute()

// ========== 从路由生成菜单结构 ==========
const navGroups = computed(() => {
  const allRoutes = router.getRoutes()
  const groupsMap = new Map()

  allRoutes.forEach((r) => {
    if (!r.path || r.name === 'not-found') return

    const meta = r.meta || {}

    // 必须有标题才认为是菜单
    if (!meta.title) return

    // hidden = true 的不显示
    if (meta.hidden) return

    // 访问控制
    if (!hasRouteAccess(meta)) return

    // 不处理带动态参数的路由
    if (r.path.includes(':')) return

    const groupName = meta.group || 'Main'

    if (!groupsMap.has(groupName)) {
      groupsMap.set(groupName, [])
    }

    const items = groupsMap.get(groupName)
    items.push({
      title: meta.title,
      to: r.path.startsWith('/') ? r.path : `/${r.path}`,
      icon: meta.icon || null,     // ✅ 直接挂组件
    })
  })

  const currentPath = route.path

  return Array.from(groupsMap.entries()).map(([groupTitle, items]) => {
    const enhancedItems = items.map((item) => ({
      ...item,
      isActive: item.to === currentPath,
    }))

    return {
      title: groupTitle,
      items: enhancedItems,
    }
  })
})

// 版本号演示数据
const versions = ['1.0.1', '1.1.0-alpha', '2.0.0-beta1']
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader class="space-y-3">
      <!-- Logo -->
      <RouterLink
          to="/dashboard"
          class="flex items-center gap-2 px-2 py-1 font-semibold text-lg text-sidebar-foreground hover:text-sidebar-accent-foreground transition"
      >
        <span>OpenAdmin</span>
      </RouterLink>

      <VersionSwitcher
          :versions="versions"
          :default-version="versions[0]"
      />
    </SidebarHeader>

    <SidebarContent class="gap-0">
      <template v-for="group in navGroups" :key="group.title">
        <!-- 单个子项：不显示 group title，只显示菜单 -->
        <SidebarGroup v-if="group.items.length === 1">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem :key="group.items[0].to">
                <SidebarMenuButton as-child :is-active="group.items[0].isActive">
                  <RouterLink :to="group.items[0].to">
                    <component
                        v-if="group.items[0].icon"
                        :is="group.items[0].icon"
                        class="mr-2 h-4 w-4"
                    />
                    <span>{{ group.items[0].title }}</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <!-- 多个子项：可折叠菜单 + 分组名 -->
        <Collapsible
            v-else
            :title="group.title"
            default-open
            class="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
                as-child
                class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                {{ group.title }}
                <ChevronRight
                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem
                      v-for="childItem in group.items"
                      :key="childItem.to"
                  >
                    <SidebarMenuButton
                        as-child
                        :is-active="childItem.isActive"
                    >
                      <RouterLink :to="childItem.to">
                        <component
                            v-if="childItem.icon"
                            :is="childItem.icon"
                            class="mr-2 h-4 w-4"
                        />
                        <span>{{ childItem.title }}</span>
                      </RouterLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </template>
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
