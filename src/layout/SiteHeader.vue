<script setup lang="ts">
import { Bell, Menu } from "lucide-vue-next"
</script>

<template>
  <header
    class="flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background/80 px-3 backdrop-blur md:h-16 md:px-6"
  >
    <div class="flex items-center gap-2">
      <button class="inline-flex items-center justify-center rounded-lg p-1.5 text-muted-foreground md:hidden">
        <Menu class="h-5 w-5" />
      </button>
      <div class="flex flex-col">
        <h1 class="text-sm font-medium md:text-base">Overview</h1>
        <p class="text-[11px] text-muted-foreground md:text-xs">Realtime insight into your system activity</p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="relative">
        <button
          class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <Bell class="h-4 w-4" />
        </button>
        <span
          class="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-destructive"
        >
          <span class="sr-only">Notifications</span>
        </span>
      </div>

      <div class="flex items-center gap-2 rounded-full border border-border px-2 py-1">
        <div class="h-6 w-6 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500" />
        <span class="hidden text-xs font-medium md:inline">Admin</span>
      </div>
    </div>
  </header>
</template>