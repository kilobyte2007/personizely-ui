export { default as DropdownMenu } from './DropdownMenu.vue'
export { default as DropdownRadioGroupMenu } from './DropdownRadioGroupMenu.vue'
export { default as DropdownCheckboxGroupMenu } from './DropdownCheckboxGroupMenu.vue'

export interface MenuItem {
  label: string
  icon?: string
  help?: string
  disabled?: boolean
}

export interface MenuRadioItem {
  label: string
  help?: string
  disabled?: boolean
  value: any
}

export interface MenuCheckboxItem {
  label: string
  help?: string
  disabled?: boolean
  value: any
}

export interface MenuItemWithChildren {
  label: string
  icon?: string
  children: MenuItem[]
}

export interface MenuGroupItem {
  items: (MenuItem | MenuItemWithChildren)[]
  label?: string
}
