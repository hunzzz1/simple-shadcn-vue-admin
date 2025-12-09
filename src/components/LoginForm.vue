<script setup lang="ts">
import { reactive, ref } from "vue"
import type { HTMLAttributes } from "vue"
import { useRouter } from "vue-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { loginApp } from "@/api/auth"
import { useAuthStore } from "@/store/user.js"
import { useToast } from "vue-toastification"

const message = useToast()

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const router = useRouter()
const store = useAuthStore()

// Login form
const form = reactive({
  username: "",
  password: "",
})

async function sha256(message) {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
}

const loading = ref(false)

const handleLogin = async () => {
  if (!form.username || !form.password) {
    message.error("Please enter your username and password.")
    return
  }

  try {
    loading.value = true
    // 🔐 Browser-native SHA256
    // const encryptedPassword = await sha256(form.password)
    // console.log(encryptedPassword)
    const res = await loginApp({
      username: form.username,
      password: form.password, // encryptedPassword 可以替换成啥sha256加密
    })

    console.log("login response:", res)

    if (res.code === 0) {
      // If backend returns { data: { token: 'xxx' } }, adjust here accordingly
      store.setToken(res.data)
      message.success("Welcome back. Redirecting to dashboard...")
      router.push("/dashboard")
    } else {
      message.error(res.message || "Invalid username or password.")
    }
  } catch (e) {
    console.error(e)
    message.error("Login failed. Please try again later.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Sign in to OpenAdmin</CardTitle>
        <CardDescription>
          Enter your admin credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <!-- Prevent default submit, handle with handleLogin -->
        <form @submit.prevent="handleLogin">
          <FieldGroup>
            <Field>
              <FieldLabel for="username">
                Username
              </FieldLabel>
              <Input
                  id="username"
                  v-model="form.username"
                  type="text"
                  placeholder="Enter your username"
                  required
              />
            </Field>

            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  Password
                </FieldLabel>
                <a
                    href="#"
                    class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="••••••••"
                  required
              />
            </Field>

            <Field>
              <div class="flex flex-col gap-3">
                <Button
                    type="submit"
                    :disabled="loading"
                >
                  {{ loading ? "Signing in..." : "Sign in" }}
                </Button>

                <Button
                    variant="outline"
                    type="button"
                    disabled
                >
                  Sign in with Google
                </Button>

                <FieldDescription class="text-center">
                  Don&apos;t have an account?
                  <a href="#">
                    Ask your admin to invite you.
                  </a>
                </FieldDescription>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
