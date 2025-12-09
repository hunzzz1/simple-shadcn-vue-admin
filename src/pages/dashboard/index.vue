<script setup>
import { Tabs, TabsList, TabsContent,TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-vue-next";
import DashboardOverview from "@/components/dashboard/DashboardOverview.vue";
const stats = [
  {
    label: "Total Revenue",
    value: "$45,231.89",
    hint: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    value: "+2350",
    hint: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    value: "+12,234",
    hint: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    value: "+573",
    hint: "+201 since last hour",
    icon: Activity,
  },
];

</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <header class="flex mb-4">
      <Tabs default-value="account">
        <TabsList>
          <TabsTrigger value="account">
            Overview
          </TabsTrigger>
          <TabsTrigger value="password">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
    <div
        class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <Card
          v-for="item in stats"
          :key="item.label"
          class="rounded-2xl border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm"
      >
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle class="text-sm font-medium text-slate-500">
              {{ item.label }}
            </CardTitle>
          </div>
          <component
              :is="item.icon"
              class="h-5 w-5 text-slate-400"
          />
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-semibold tracking-tight text-slate-900">
            {{ item.value }}
          </div>
          <p class="mt-1 text-xs text-slate-400">
            {{ item.hint }}
          </p>
        </CardContent>
      </Card>
    </div>
    <br>
    <DashboardOverview/>
  </div>
</template>