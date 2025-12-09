<script setup lang="ts">
</script>

<template>
  <section
    class="relative overflow-hidden rounded-xl border border-border bg-card/70 p-4 shadow-sm sm:p-6"
  >
    <header class="mb-4 flex items-center justify-between gap-2">
      <div class="flex flex-col gap-1">
        <h2 class="text-sm font-medium leading-none">Revenue & activity</h2>
        <p class="text-xs text-muted-foreground">
          Simple placeholder block for your chart component (Recharts, ECharts, ApexCharts, etc.).
        </p>
      </div>
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <span class="inline-flex h-2 w-2 rounded-full bg-emerald-500" /> Live
      </div>
    </header>

    <div
      class="flex h-[220px] items-center justify-center rounded-lg border border-dashed border-border/70 bg-muted/40 text-xs text-muted-foreground"
    >
      Drop your chart here
    </div>
  </section>
</template>