import { Provider } from "react-redux";
import { DeclaredRouter } from './router'
import { store } from "./store";
import './App.css'

function App() {

  return (
    <>
      <Provider store={store}>
        <DeclaredRouter />
      </Provider>
    </>
  )
}

export default App
