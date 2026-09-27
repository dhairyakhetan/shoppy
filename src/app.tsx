import { BagBar } from './components/BagBar'
import { BagDrawer } from './components/BagDrawer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { count } from './lib/bag'
import { currentPath } from './lib/router'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProductPage } from './pages/Product'
import { Shop } from './pages/Shop'
import { matchRoute } from './routes'

function Page() {
  const route = matchRoute(currentPath.value)
  switch (route.page) {
    case 'home':
      return <Home />
    case 'shop':
      return <Shop collection={route.collection} />
    case 'product':
      return <ProductPage product={route.product} />
    default:
      return <NotFound />
  }
}

/** Which page is showing. Lets the browser check the HTML it was sent matches the address. */
export const pageKey = (path: string) => (matchRoute(path).page === 'not-found' ? 'not-found' : path)

export function App() {
  return (
    <div class={count.value > 0 ? 'app has-bag' : 'app'} data-page={pageKey(currentPath.value)}>
      <a class="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" key={currentPath.value}>
        <Page />
      </main>
      <Footer />
      <BagBar />
      <BagDrawer />
    </div>
  )
}
