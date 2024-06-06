<template>
  <Form class="w-2/3" @submit="submit">
    <FormField
      v-slot="{ componentField }"
      name="name"
      required
      rules="required|min:2"
      label="Your name"
      description="Please provide the full name as in your passport."
    >
      <Input placeholder="e.g. Sergiu Cazac" v-bind="componentField" />
    </FormField>

    <FormField
      v-slot="{ componentField }"
      required
      rules="required"
      name="framework"
      label="Your favorite framework"
    >
      <Select placeholder="Choose a value" v-bind="componentField" :options="['Nuxt.js', 'Vue.js', 'Next.js', 'React']" />
    </FormField>

    <FormField
      v-slot="{ componentField }"
      required
      rules="required"
      name="accept"
    >
      <Checkbox label="I accept the terms of use." v-bind="componentField" />
    </FormField>

    <Button>Submit</Button>
  </Form>
</template>
<script setup lang="ts">
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { defineRule, useForm } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

const { handleSubmit } = useForm({
  initialValues: {
    name: 'Sergiu'
  }
})

const submit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>
