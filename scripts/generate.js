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
      'vue-components': []
    }
  }
}

const pascalToKebab = string => string.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase()
const camelToKebab = string => string.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase()

const generateTagForComponent = (component, prefix = 'Ui', pascal = true) => {
  const name = component.split('/').pop().split('.')[0]
  const meta = tsconfigChecker.getComponentMeta(path.join(__dirname, `../src/components/ui/${component}.vue`))
  return {
    name: pascal ? prefix + name : pascalToKebab(prefix + name),
    description: '',
    props: meta.props.map(prop => ({
      name: camelToKebab(prop.name),
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
      module: `./src/components/ui/${component}.vue`,
      symbol: 'default'
    }
  }
}

const components = [
  'accordion/Accordion',
  'accordion/AccordionItem',
  'alert/Alert',
  'alert-dialog/AlertDialog',
  'alert-dialog/AlertDialogProvider',
  'autocomplete/Autocomplete',
  'avatar/Avatar',
  'badge/Badge',
  'button/Button',
  'calendar/Calendar',
  'card/Card',
  'checkbox/Checkbox',
  'checkbox-group/CheckboxGroup',
  'color-picker/Color',
  'color-picker/ColorPicker',
  'combobox/Combobox',
  'date-picker/DatePicker',
  'dialog/Dialog',
  'drawer/Drawer',
  'dropdown-menu/DropdownMenu',
  'dropdown-menu/DropdownCheckboxGroupMenu',
  'dropdown-menu/DropdownRadioGroupMenu',
  'file-upload-button/FileUploadButton',
  'form/Form',
  'form/FormField',
  'icon/Icon',
  'input/Input',
  'label/Label',
  'popover/Popover',
  'progress/Progress',
  'progress-circular/ProgressCircular',
  'radio-group/RadioGroup',
  'range-calendar/RangeCalendar',
  'select/Select',
  'slider/Slider',
  'switch/Switch',
  'tabs/Tabs',
  'tabs/TabsContent',
  'textarea/Textarea',
  'toast/Toaster',
  'toast/ToastAction',
  'toggle/Toggle',
  'toggle-group/ToggleGroup',
  'tooltip/Tooltip',
  'tooltip/TooltipProvider'
]

components.forEach((component) => {
  webTypes.contributions.html['vue-components'].push(generateTagForComponent(component, 'Ui', true))
  webTypes.contributions.html['vue-components'].push(generateTagForComponent(component, 'Ui', false))
})

writeFileSync(path.join(__dirname, '../web-types.json'), JSON.stringify(webTypes, null, 2))
