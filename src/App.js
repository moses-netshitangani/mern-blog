import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import {BlogArticles} from './components/blog-context';
import Navbar from './components/navbar.component';
import Description from './components/article-description.component';
import FullArticle from './components/full-article';
import About from './components/about.component';
import Footer from './components/footer.component';

import CreatePage from './components/BlogPage/CreatePage';

function App() {

  return(
    <Router>
      <div style={{minHeight: '50em'}}>
        <BlogArticles>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Description}></Route>
            {/* problem is above line and below line render same component. Need to change data within component */}
            <Route path="/topic" component={Description}></Route>
            <Route path="/articles/single" component={FullArticle}></Route>
            <Route path="/admin" component={CreatePage}></Route>
            <Route path="/about" component={About}></Route>
          </Switch>
        </BlogArticles>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
