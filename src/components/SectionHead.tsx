import type { ComponentChildren } from 'preact'

interface Props {
  eyebrow?: string
  title: ComponentChildren
  sub?: ComponentChildren
  action?: ComponentChildren
  center?: boolean
  id?: string
}

export function SectionHead({ eyebrow, title, sub, action, center, id }: Props) {
  return (
    <div class={`section-head reveal${center ? ' center' : ''}`}>
      <div>
        {eyebrow && <p class="eyebrow">{eyebrow}</p>}
        <h2 class="h2" id={id}>
          {title}
        </h2>
        {sub && <p class="section-sub">{sub}</p>}
      </div>
      {action && <div class="section-action">{action}</div>}
    </div>
  )
}
