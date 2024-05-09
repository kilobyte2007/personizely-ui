<template>
  <Tabs class="w-64" default-value="account" orientation="vertical">
    <TabsContent value="account" title="Account">
      <div class="bg-white dark:bg-gray-800 h-full rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Account content
      </div>
    </TabsContent>
    <TabsContent value="user" title="User">
      <div class="bg-white dark:bg-gray-800 h-full rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        User content
      </div>
    </TabsContent>
    <TabsContent value="other" title="Other">
      <div class="bg-white dark:bg-gray-800 h-full rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Other content
      </div>
    </TabsContent>
    <TabsContent value="settings" title="Settings">
      <div class="bg-white dark:bg-gray-800 h-full rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        Settings content
      </div>
    </TabsContent>
    <TabsContent value="more" title="More">
      <div class="bg-white dark:bg-gray-800 h-full rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
        More content
      </div>
    </TabsContent>
  </Tabs>
</template>
<script setup lang="ts">
import { Tabs, TabsContent } from '@/components/ui/tabs'
</script>
