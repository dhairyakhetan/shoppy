// A little shower of marigold petals when something is added to the bag.
const COLORS = ['#FF8A00', '#FFC53D', '#E91E78', '#0E9594', '#FF4F9A']

export function burst(from: Element) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const r = from.getBoundingClientRect()
  const layer = document.createElement('div')
  layer.className = 'burst'
  layer.setAttribute('aria-hidden', 'true')
  layer.style.left = `${r.left + r.width / 2}px`
  layer.style.top = `${r.top + r.height / 2}px`

  const n = 12
  for (let i = 0; i < n; i++) {
    const petal = document.createElement('i')
    const angle = (360 / n) * i + Math.random() * 20 - 10
    petal.style.setProperty('--a', `${angle}deg`)
    petal.style.setProperty('--d', `${34 + Math.random() * 30}px`)
    petal.style.setProperty('--c', COLORS[i % COLORS.length])
    petal.style.setProperty('--s', `${0.7 + Math.random() * 0.6}`)
    layer.append(petal)
  }
  document.body.append(layer)
  setTimeout(() => layer.remove(), 800)
}
