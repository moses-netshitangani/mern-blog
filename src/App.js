import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {BlogArticles} from './components/blog-context';
import Navbar from './components/navbar.component';
import Description from './components/article-description.component';
import FullArticle from './components/full-article';
import About from './components/about.component';
import Footer from './components/footer.component';
import ProtectedRoute from './components/protected.route';
import CreatePage from './components/BlogPage/CreatePage';
import auth from './components/auth';

function App() {

  const [authComp, onAuthCompChange] = useState(auth);
  const [stateAuth, onAuthChange] = useState(auth.isAuthenticated());
  // localStorage.clear();

  // ensuring state persists
  let onChangeLogin = e => {
    localStorage.setItem("login", e);
    onAuthChange(e);
  }
  
  
  useEffect(() => {
    if (localStorage.getItem("login") === 'undefined' || localStorage.getItem("login") === null)
    {
      onAuthChange(auth.isAuthenticated());
    }
    else
    {
      onAuthChange(localStorage.getItem("login"));
      console.log(`using LS auth should be ${localStorage.getItem("login")} but is ${stateAuth}`);
    }
  });


  return(
    <Router>
      <div style={{minHeight: '50em'}}>
        <BlogArticles>
          <Navbar authComp={authComp} stateAuth={stateAuth} onAuthChange={onChangeLogin} />
          <Switch>
            <Route path="/" exact component={Description}></Route>
            <Route path="/topic" component={Description}></Route>
            <Route path="/articles/single" component={FullArticle}></Route>
            {/* <Route path="/admin" component={CreatePage}></Route> */}
            <ProtectedRoute path="/admin" exact component={CreatePage} stateAuth={stateAuth} />
            <Route path="/about" component={About}></Route>
          </Switch>
        </BlogArticles>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
