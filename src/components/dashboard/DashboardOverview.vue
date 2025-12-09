<script setup lang="ts">
import { computed } from "vue"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions,
} from "chart.js"

// 注册 Chart.js 全局组件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 31 天虚拟营收数据（单位：USD，可以按需改）
const dailyValues = [
  3200, 2800, 3100, 4500, 2600, 3900, 4100,
  3700, 3400, 4300, 3900, 3600, 4200, 4600,
  3100, 3800, 2950, 4100, 4400, 4700, 3300,
  3500, 3650, 3900, 4200, 4500, 4800, 4300,
  4100, 3950, 4600,
]

// 标签：1~31 号
const dayLabels = Array.from({ length: 31 }, (_, idx) => `${idx + 1}`)

// Chart.js 数据
const chartData = {
  labels: dayLabels,
  datasets: [
    {
      label: "Daily Revenue",
      data: dailyValues,
      backgroundColor: "#0E1525",
      borderRadius: 6,
      borderSkipped: false,
      barPercentage: 0.6,
      categoryPercentage: 0.5,
    },
  ],
}

// Chart.js v4 Options
const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `$${ctx.parsed.y}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawOnChartArea: false,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#9CA3AF",
      },
    },
    y: {
      grid: {
        color: "rgba(148,163,184,0.25)",
        drawOnChartArea: true,
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#9CA3AF",
        callback: (value) => `$${value}`,
      },
    },
  },
}

// 计算当月最佳（哪一天金额最高）
const bestDay = computed(() => {
  const max = Math.max(...dailyValues)
  const idx = dailyValues.indexOf(max)
  return idx + 1
})

const bestDayValue = computed(() => Math.max(...dailyValues))

// 右侧 Recent Sales 数据（保持不变）
const sales = [
  { name: "Olivia Martin",   email: "olivia.martin@email.com",   amount: 1999 },
  { name: "Jackson Lee",     email: "jackson.lee@email.com",    amount: 39 },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: 299 },
  { name: "William Kim",     email: "will@email.com",           amount: 99 },
  { name: "Sofia Davis",     email: "sofia.davis@email.com",    amount: 39 },
]

function initials(name: string) {
  return name
      .split(" ")
      .map((n) => n[0])
      .join("")
}
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
    <!-- Overview：31 天营收柱状图 -->
    <Card class="col-span-2 rounded-2xl border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm">
      <CardHeader class="flex flex-row items-center justify-between">
        <CardTitle class="text-lg font-semibold">Overview</CardTitle>

        <!-- 右侧：月份最佳（这里是当月最佳日期） -->
        <div class="text-sm text-slate-500 flex items-center gap-1">
          <span>Best Day this Month:</span>
          <span class="font-medium text-slate-700">
            Day {{ bestDay }} · ${{ bestDayValue }}
          </span>
        </div>
      </CardHeader>

      <CardContent class="h-[380px]">
        <Bar :data="chartData" :options="chartOptions" />
      </CardContent>
    </Card>

    <!-- 右侧：Recent Sales 列表 -->
    <Card class="rounded-2xl border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm">
      <CardHeader class="pb-3">
        <CardTitle class="text-lg font-semibold">Recent Sales</CardTitle>
        <p class="text-sm text-slate-500">You made 265 sales this month.</p>
      </CardHeader>

      <CardContent>
        <div class="space-y-5">
          <div
              v-for="user in sales"
              :key="user.email"
              class="flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div
                  class="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium"
              >
                {{ initials(user.name) }}
              </div>

              <div>
                <p class="font-medium text-slate-800">{{ user.name }}</p>
                <p class="text-sm text-slate-500">{{ user.email }}</p>
              </div>
            </div>

            <p class="font-semibold text-slate-900">
              +${{ user.amount.toFixed(2) }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
