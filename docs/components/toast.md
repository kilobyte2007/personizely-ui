<script setup>
import Basic from '../.vitepress/components/examples/toast/Basic.vue'
import Destructive from '../.vitepress/components/examples/toast/Destructive.vue'
import Action from '../.vitepress/components/examples/toast/Action.vue'
import { Toaster } from '../../src/components/ui/toast'
</script>

<teleport to="#portal">
  <Toaster />
</teleport>

# Toast

Shows a toast message in the corner.
You need to have a `<Toaster />` component on your page.

## Examples

### Basic toast
<Example>
  <Basic />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Basic.vue

### Destructive toast
<Example>
  <Destructive />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Destructive.vue

### Toast with an action
<Example>
  <Action />
</Example>

**Code**

<<< @/.vitepress/components/examples/toast/Action.vue
