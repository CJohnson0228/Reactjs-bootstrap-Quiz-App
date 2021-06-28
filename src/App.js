import React, { useState, useEffect }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './sass/main.scss';
import axios from 'axios';
import { CatJson } from './config/categories';
import QuestionBox from './components/QuestionBox';
import Landing from './components/Landing';

function App() {
  const [ category, setCategory ] = useState('Select Category');
  const [ categoryID, setCategoryID ] = useState();
  const [ apiResponse, setApiResponse ] = useState();
  
 
  const categorySelect=(e)=>{
    for (var i = 0; i < CatJson.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (CatJson[i].id == e) {
        setCategoryID(e);
        setCategory(CatJson[i].name)
      }
    }
  }

  useEffect (() => {
    async function fetchData(){
      const data = await axios.get(`https://opentdb.com/api.php?amount=20&category=${categoryID}&type=multiple`);
      setApiResponse(data.data.results);
    }
    fetchData();
  }, [categoryID]);
  
  
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Landing categorySelect={categorySelect} category={category} categoryID={categoryID} CatJson={CatJson}/>
          </Route>
          <Route exact path="/Quiz">
            <QuestionBox questionData={apiResponse}/>
          </Route>
        </div>
      </Switch>
    </Router>
    
  );
}

export default App;