import { AuthProvider } from "./contexts/auth.context";
import ProductsProvider from "./contexts/products";
import { BrowserRouter as Router } from "react-router-dom";
import Layouts from "./pages/Layouts";

const App = () => (
    <Router>
      <AuthProvider>
        <ProductsProvider>
          <Layouts />
        </ProductsProvider>
      </AuthProvider>
    </Router>
); 

export default App;