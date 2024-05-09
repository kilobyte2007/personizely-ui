<template>
  <Tabs class="w-64" default-value="account">
    <TabsContent value="account" title="Account">
      <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Account content
      </div>
    </TabsContent>
    <TabsContent value="user" title="User">
      <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        User content
      </div>
    </TabsContent>
  </Tabs>
</template>
<script setup lang="ts">
import { Tabs, TabsContent } from '@/components/ui/tabs'
</script>
