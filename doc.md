# Workshop React in Typescript

## Cos'è react:

- React è una libreria JavaScript open-source sviluppata da Facebook.
- È progettato per la creazione di interfacce utente (UI) per applicazioni web.
- React utilizza un approccio basato sui componenti per la creazione di UI complesse e riutilizzabili.
- Ogni componente React rappresenta una parte specifica dell'interfaccia utente.
- React utilizza un Virtual DOM per migliorare le prestazioni e la velocità di aggiornamento della UI.
- React è altamente modulare e può essere facilmente integrato con altre librerie e framework.
- React è utilizzato da molte grandi aziende per creare applicazioni web di successo.
- Il build dell'applicazione viene eseguito da babel
- In sintesi, React è una libreria JavaScript molto popolare per la creazione di interfacce utente complesse e riutilizzabili in applicazioni web. Grazie alla sua natura modulare, le prestazioni elevate e la vasta comunità di sviluppatori, React è diventato uno degli strumenti più utilizzati nella creazione di applicazioni web moderne.

## Cos'è JSX (o tsx)
- JSX è un'estensione di sintassi di JavaScript che permette di scrivere codice HTML-like all'interno di un file JavaScript.
- È utilizzato principalmente in combinazione con React per definire i componenti UI.
- Grazie a JSX, è possibile definire la struttura e il contenuto dell'interfaccia utente in modo molto più intuitivo e leggibile.
- JSX viene compilato in JavaScript puro e quindi può essere eseguito su qualsiasi browser.
- È possibile utilizzare espressioni JavaScript all'interno di JSX per manipolare dinamicamente il contenuto dell'interfaccia utente.
- JSX può semplificare notevolmente lo sviluppo di applicazioni web complesse, in quanto consente di scrivere codice più espressivo e facile da mantenere.

## Controparti
- **Angular** (più strutturato e con una curva di apprendimento più ripida) 
- **Vue** ( meno strutturato ma molto flessibile )

## Quando si usa
- Per creare delle applicazioni frontend, generalmente viene servito da un webserver come file statico (client).
- Esiste la possibilità di farlo servire anche da node, abilitando delle funzionalità aggiuntive per interagire con il server
- Tramite react native è possibile creare delle applicazioni cross platform (quindi la codebase rimarrebbe pressochè la stessa ma si potrebbero avere multiple applicazioni: web, android e ios) comunque sono due framework diversi.

## Setup applicazione (con vite)
1. `yarn create vite . -- --template react-ts`
2. `yarn`
3. `yarn dev --host`

Si potrebbe utilizzare anche un altro modo, cambierebbe il bundler (da vite a mix), molto meglio vite per velocità e intuitività.

`npx create-react-app my-app --template redux-typescript`

## Struttura

image.png

La cartella dove verrà inserita la codebase sarà "src", si consiglia di creare due cartelle aggiuntive: 
1. `modules` nella quale verranno inserite le cartelle domain-oriented.
2. `common` tutto il codice che non riguarda un dominio viene inserito qui.

## Componenti

In React, un componente è un'unità di codice riutilizzabile che rappresenta una parte dell'interfaccia utente dell'applicazione. 

### Functional components

Sono funzioni che ritornano un `ReactNode` e che accettano come parametro "props", un oggetto che contiene tutti i parametri passati dall'esterno al componente.

### Class components

Sono classi che estendono `Component` e che implementano il metodo `render()` il quale ritorna un `ReactNode`. 

Entrambi sono comparabili ma con l'andare del tempo si è preferito utilizzare sempre più i functional component che sono più immediati.

## Hooks

I react hooks si possono utilizzare solo dentro i componenti funzionali, i principali sono:

- `useState` serve per gestire lo stato del componente
- `useEffect` esegue delle funzioni nei vari casi di aggiornamento/creazione del componente.

## Chiamate api

Endpoint di test: `https://catfact.ninja/fact`

- Utilizzo con `async` o con `.then()`
- Creazione di un client

## Application state

Ci sono dei casi in cui serve condividere lo stato dell'applicazione, per esempio:

- utente loggato
- tema dell'applicazione

ecc..

Ci sono vari modi di gestire l'application state:

- `useContext()` hook di react molto semplice ( da utilizzare in contesti non troppo complicati )
- `redux` State management system basato sul pattern flux

## Use context

Creazione Provider:
```ts
const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}
```

Utilizzo di un valore di un context:

``` ts
function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
```

Aggiornamento di un valore del context:

```ts
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        Switch to light theme
      </Button>
    </ThemeContext.Provider>
  );
}
```

Questo non permette ai children di cambiare lo stato del context, per farlo: Redux

## Installazione Redux
- `yarn add @reduxjs/toolkit`
- `yarn add @types/redux @types/react-redux`


Parti principali 
- state
- actions
- reducers
- selectors


Ci sono degli helper che aiutano a gestire redux:

Store:

``` typescript
export default configureStore({
    reducer: {
        counter: counterReducer
    }
})
```

Actions e Reducers:
```ts
export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state: CounterState) => {
            state.value += 1
        },
        decrement: (state: CounterState) => {
            state.value -= 1
        },
        setAmount: ( state: CounterState, action: PayloadAction<number> ) => {
            state.value = action.payload
        }
    }
})
export const { increment, decrement, setAmount } = counterSlice.actions
export default counterSlice.reducer
```

Selectors (memoized):
```ts
const selectV = (state: ApplicationState )=> state.counter.value

export const selectValue = createSelector( [ selectV ], ( value ) => value  ) 

```

Per la gestione dei side effects: https://redux.js.org/tutorials/essentials/part-5-async-logic


## Router

Serve a creare single page application, renderizzando i vari componenti nel `RouterOutlet`

### Installazione

`yarn add react-router-dom localforage match-sorter sort-by`

