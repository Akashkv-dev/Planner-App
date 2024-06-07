import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from './routes/User';
import { Provider } from "react-redux";
import appStore from './Redux/appStore';


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<User/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
