import { Route, Router } from "@solidjs/router";

import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import NotFound from "./pages/Experience";

const App = () => (
  <div class="App">
    <Router>
      <Route path="/" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/experience" component={Experience} />
      <Route path="/*" component={NotFound} />
    </Router>
  </div>
);

export default App;