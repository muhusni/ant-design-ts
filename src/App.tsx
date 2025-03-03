import "./index.css"
import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"

import { BrowserRouter as Router } from "react-router-dom"
function App() {

  return (

    <Router>
      <AuthProvider>
        {/* <AuthRedirect /> */}
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
