<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { d$auth } from '../../stores/auth'

import BaseInput from '../../components/BaseInput.vue'

const router = useRouter()
const auth = d$auth()

const initialInput = {
  username: '',
  password: ''
}

const input = ref({ ...initialInput })

const resetForm = () => Object.assign(input.value, initialInput)

const submitForm = async () => {
  try {
    await auth.login(input.value)

    auth.setUser()

    resetForm()

    router.replace({
      name: 'Authenticated',
      params: { id: auth.g$user.id }
    })
  } catch (error) {
    console.log(error)
    alert(error)
  }
}
</script>

<template>
  <div>
    <h1 class="heading">Silakan Melakukan Login 🔐</h1>
      <form
        class="form"
        v-if="!auth.getUsername"
        method="post"
        @submit.prevent="() => submitForm()"
        @reset="() => resetForm"
      >
      <BaseInput name="username" placeholder="input username" required />
      <BaseInput name="password" placeholder="input password" type="password" required />
      <button class="button" type="submit">Login</button>
    </form>
    </div>
</template>

<style scoped>
.heading {
  margin-bottom: 1rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  .button {
      padding: 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
      background-color: rgb(106, 80, 255);
      color: white;
      border: none;
      outline: none;
      margin-top: 1rem;
  }

  .button:hover {
      box-shadow: 0 0 5px rgb(81, 136, 255);
  }
}
</style>

