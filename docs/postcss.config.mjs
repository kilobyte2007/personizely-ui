import { postcssIsolateStyles } from 'vitepress'
import tailwind from 'tailwindcss'

export default {
  plugins: [postcssIsolateStyles({
    prefix: ":not(:where(.vp-raw, .vp-raw *), :where([data-radix-popper-content-wrapper], [data-radix-popper-content-wrapper] *))",
    includeFiles: [/vp-doc\.css/, /base\.css/]
  }), tailwind()]
}
