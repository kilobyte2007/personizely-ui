export { default } from './DropdownMenu.vue'
export { default as DropdownRadioGroupMenu } from './DropdownRadioGroupMenu.vue'
export { default as DropdownCheckboxGroupMenu } from './DropdownCheckboxGroupMenu.vue'

export interface MenuItem {
  label: string
  icon?: string
  help?: string
}

export interface MenuRadioItem {
  label: string
  help?: string
  value: any
}

export interface MenuCheckboxItem {
  label: string
  help?: string
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
