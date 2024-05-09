<template>
  <TooltipProvider :delay-duration="100">
    <Tabs class="w-64" default-value="account">
      <TabsContent value="account" tooltip="Account" icon="calendar">
        <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
          Account content
        </div>
      </TabsContent>
      <TabsContent value="user" tooltip="User" icon="user">
        <div class="bg-white dark:bg-gray-800 rounded border text-sm border-dashed p-10 text-center flex items-center justify-center">
          User content
        </div>
      </TabsContent>
    </Tabs>
  </TooltipProvider>
</template>
<script setup lang="ts">
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
</script>
