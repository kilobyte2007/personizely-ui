<template>
  <Tabs v-model="tab" class="w-64">
    <TabsContent value="account" title="Account">
      <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Tab is {{ tab }}
      </div>
    </TabsContent>
    <TabsContent value="user" title="User">
      <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Tab is {{ tab }}
      </div>
    </TabsContent>
  </Tabs>
</template>
<script setup lang="ts">
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ref } from 'vue'

const tab = ref('account')
</script>
