import * as url from 'url'
import path from 'path'
import { writeFileSync } from 'node:fs'
import pkg from '../package.json' with { type: 'json' }
import { createChecker } from 'vue-component-meta'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const checkerOptions = {
  forceUseTs: true,
  schema: { ignore: [] },
  printer: { newLine: 1 }
}

const tsconfigChecker = createChecker(path.join(__dirname, '../tsconfig.json'), checkerOptions)

const webTypes = {
  $schema: 'http://json.schemastore.org/web-types',
  framework: 'vue',
  name: pkg.name,
  version: pkg.version,
  'description-markup': 'none',
  'js-types-syntax': 'typescript',
  contributions: {
    html: {
      elements: []
    }
  }
}

const pascalToKebab = string => string.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase()

const generateTagForComponent = (file, prefix = 'Ui', camel = true) => {
  const name = file.split('/').pop().split('.')[0]
  const meta = tsconfigChecker.getComponentMeta(file)
  return {
    name: camel ? prefix + name : pascalToKebab(prefix + name),
    description: '',
    attributes: meta.props.map(prop => ({
      name: prop.name,
      description: prop.description,
      value: {
        kind: 'expression',
        type: prop.type || 'any',
        required: prop.required
      },
      default: prop.default
    })),
    js: {
      events: meta.events.map(event => ({
        name: event.name,
        description: event.description
      }))
    },
    slots: meta.slots.map(slot => ({
      name: slot.name,
      description: slot.description
    })),
    source: {
      module: file,
      symbol: 'default'
    }
  }
}

const components = [
  'ui/accordion/Accordion.vue',
  'ui/accordion/AccordionItem.vue',
  'ui/alert/Alert.vue',
  'ui/alert-dialog/AlertDialog.vue',
  'ui/alert-dialog/AlertDialogProvider.vue',
  'ui/autocomplete/Autocomplete.vue',
  'ui/avatar/Avatar.vue',
  'ui/badge/Badge.vue',
  'ui/button/Button.vue',
  'ui/calendar/Calendar.vue',
  'ui/card/Card.vue',
  'ui/checkbox/Checkbox.vue',
  'ui/checkbox-group/CheckboxGroup.vue',
  'ui/color-picker/Color.vue',
  'ui/color-picker/ColorPicker.vue',
  'ui/combobox/Combobox.vue',
  'ui/date-picker/DatePicker.vue',
  'ui/dialog/Dialog.vue',
  'ui/drawer/Drawer.vue',
  'ui/dropdown-menu/DropdownMenu.vue',
  'ui/dropdown-menu/DropdownCheckboxGroupMenu.vue',
  'ui/dropdown-menu/DropdownRadioGroupMenu.vue',
  'ui/file-upload-button/FileUploadButton.vue',
  'ui/form/Form.vue',
  'ui/form/FormField.vue',
  'ui/icon/Icon.vue',
  'ui/input/Input.vue',
  'ui/label/Label.vue',
  'ui/popover/Popover.vue',
  'ui/progress/Progress.vue',
  'ui/progress-circular/ProgressCircular.vue',
  'ui/radio-group/RadioGroup.vue',
  'ui/range-calendar/RangeCalendar.vue',
  'ui/select/Select.vue',
  'ui/slider/Slider.vue',
  'ui/switch/Switch.vue',
  'ui/tabs/Tabs.vue',
  'ui/tabs/TabsContent.vue',
  'ui/textarea/Textarea.vue',
  'ui/toast/Toaster.vue',
  'ui/toast/ToastAction.vue',
  'ui/toggle/Toggle.vue',
  'ui/toggle-group/ToggleGroup.vue',
  'ui/tooltip/Tooltip.vue',
  'ui/tooltip/TooltipProvider.vue'
]

components.forEach((component) => {
  webTypes.contributions.html.elements.push(generateTagForComponent(path.join(__dirname, `../src/components/${component}`), 'Ui', true))
  webTypes.contributions.html.elements.push(generateTagForComponent(path.join(__dirname, `../src/components/${component}`), 'Ui', false))
})

writeFileSync(path.join(__dirname, '../web-types.json'), JSON.stringify(webTypes, null, 2))
