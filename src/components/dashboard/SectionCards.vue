<script setup lang="ts">
interface StatCard {
  id: number
  label: string
  value: string
  trend: string
  trendType: "up" | "down" | "flat"
}

const cards: StatCard[] = [
  { id: 1, label: "Active users (24h)", value: "1,284", trend: "+18.2%", trendType: "up" },
  { id: 2, label: "Open cases", value: "326", trend: "-4.7%", trendType: "down" },
  { id: 3, label: "Conversion rate", value: "7.3%", trend: "+1.1%", trendType: "up" },
  { id: 4, label: "Avg. session length", value: "11m 32s", trend: "+0.6%", trendType: "flat" },
]
</script>

<template>
  <section class="px-4 lg:px-6">
    <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="card in cards"
        :key="card.id"
        class="flex flex-col gap-2 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm shadow-sm"
      >
        <div class="text-xs text-muted-foreground">
          {{ card.label }}
        </div>
        <div class="flex items-baseline justify-between gap-2">
          <div class="text-lg font-semibold tracking-tight md:text-xl">
            {{ card.value }}
          </div>
          <div
            class="text-xs font-medium"
            :class="{
              'text-emerald-500': card.trendType === 'up',
              'text-red-500': card.trendType === 'down',
              'text-muted-foreground': card.trendType === 'flat',
            }"
          >
            {{ card.trend }}
          </div>
        </div>
      </article>
    </div>
  </section>
</template>