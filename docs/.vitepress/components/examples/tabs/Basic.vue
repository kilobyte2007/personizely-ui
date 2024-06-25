<template>
  <Tabs class="w-[400px]" default-value="account">
    <TabsContent value="account" title="Account">
      <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Account content
      </div>
    </TabsContent>
    <TabsContent
      v-for="{ title, value } in [{title: 'User', value: 'user'}, {title: 'Company', value: 'company'}]"
      :key="value"
      :value="value"
      :title="title"
    >
      <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        {{ title }} content
      </div>
    </TabsContent>
  </Tabs>
</template>
<script setup lang="ts">
import { Tabs, TabsContent } from '@/components/ui/tabs'
</script>
