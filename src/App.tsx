import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Fact, CatClient } from './modules/cat/client'
import { CatComponent } from './modules/cat/component'
import { CatClassComponent } from './modules/cat/class-component'
import { ErrorBoundary } from './common/error-component'
import store from './store'
import { Provider } from 'react-redux'
import { CountComponent } from './modules/counter/component'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  }
])

function App() {
  const [fact, setFact] = useState<Fact | null | Error>(null)

  useEffect(() => {
    handleFact()
  }, [])

  const handleFact = () => {
    (new CatClient()).getFact()
      .then(res => setFact(res))
      .catch(err => setFact(err))
  }

  if (fact instanceof Error) {
    return <div> Error: {fact.message} </div>
  }

  if (fact == null) {
    return <div> Loading... </div>
  }

  return (
    <div className="App">
      <Provider store={store}>
        <ErrorBoundary fallback={<p>There was an error</p>}>
          <RouterProvider router={router} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <CatComponent fact={"ciao"}></CatComponent>

            <CatClassComponent></CatClassComponent>

            <CountComponent></CountComponent>

          </div>
        </ErrorBoundary>
      </Provider>

    </div>
  )
}

export default App
