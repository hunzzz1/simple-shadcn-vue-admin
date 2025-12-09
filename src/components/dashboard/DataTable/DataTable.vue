<script setup lang="ts">
interface Row {
  id: number
  title: string
  type: string
  status: string
  progress: number
  owner: string
}

const props = defineProps<{
  rows: Row[]
}>()

const statusColor: Record<string, string> = {
  Live: "text-emerald-500 bg-emerald-500/10",
  "In progress": "text-amber-500 bg-amber-500/10",
  Reviewing: "text-sky-500 bg-sky-500/10",
  Paused: "text-muted-foreground bg-muted/60",
}
</script>

<template>
  <section class="rounded-xl border border-border bg-card/70 p-3 shadow-sm md:p-4">
    <header class="mb-3 flex items-center justify-between gap-2">
      <h2 class="text-sm font-medium leading-none">Monitoring pipelines</h2>
      <p class="text-xs text-muted-foreground">
        Basic table wired to props, feel free to replace with your own data-table component.
      </p>
    </header>

    <div class="overflow-x-auto">
      <table class="min-w-full border-separate border-spacing-y-1 text-left text-xs md:text-sm">
        <thead>
          <tr class="text-muted-foreground">
            <th class="px-3 py-2 font-medium">Name</th>
            <th class="px-3 py-2 font-medium">Type</th>
            <th class="px-3 py-2 font-medium">Status</th>
            <th class="px-3 py-2 font-medium">Progress</th>
            <th class="px-3 py-2 font-medium">Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in props.rows"
            :key="row.id"
            class="rounded-lg bg-muted/40 align-middle text-xs md:text-sm"
          >
            <td class="px-3 py-2 text-foreground">
              {{ row.title }}
            </td>
            <td class="px-3 py-2 text-muted-foreground">
              {{ row.type }}
            </td>
            <td class="px-3 py-2">
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium"
                :class="statusColor[row.status] || 'text-muted-foreground bg-muted/60'"
              >
                {{ row.status }}
              </span>
            </td>
            <td class="px-3 py-2">
              <div class="flex items-center gap-2">
                <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full bg-emerald-500"
                    :style="{ width: `${row.progress}%` }"
                  />
                </div>
                <span class="w-10 text-right text-[11px] text-muted-foreground">
                  {{ row.progress }}%
                </span>
              </div>
            </td>
            <td class="px-3 py-2 text-muted-foreground">
              {{ row.owner }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>