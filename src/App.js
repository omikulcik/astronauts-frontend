import React, { useReducer, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import './styles/index.scss'
import client from "./apollo/client"
import { ApolloProvider } from "@apollo/react-hooks"
import Header from "./components/Header"
import AstronautsTable from "./components/AstronautsTable"
import astronautsReducer from "./reducers/astronautsReducer"
import { startPopulateAstronauts } from "./actions/astronautsActions";

const App = () => {
  const [astronauts, astronautsDispatch] = useReducer(astronautsReducer)

  useEffect(() => {
    startPopulateAstronauts(client, astronautsDispatch)
  }, [])

  return (
    <ApolloProvider client={client} id="main">
      <div className="container">
        <div className="content">
          <Header />
          {astronauts ? <AstronautsTable
            astronauts={astronauts}
            astronautsDispatch={astronautsDispatch} /> :
            <p>Loading</p>
          }
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App;
