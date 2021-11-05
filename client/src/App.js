import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './page/homepage';
import AnalysisPage from './page/analysis';
import Nav from './component/navbar'
import NoMatchPage from './page/NoMatchPage'
import Footer from './component/footer'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/analysis/:account" exact component={AnalysisPage} />
          <Route path="*" component={NoMatchPage} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
