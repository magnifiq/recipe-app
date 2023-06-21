import React, {useState, useEffect} from 'react';
import Recipe from './components/Recipe';
import './App.css';

const App=()=>{
  const APP_ID="4e7dd4ea";
  const APP_KEY="75cb1722df15154b1987870afec6fac3	";

  const [recipes, setRecipes]=useState([]);
  const [search, setSearch]=useState('');
  const [query, setQuery]=useState('chicken');

  useEffect(()=>{
    getRecipes();
  },[query])

  const getRecipes=async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data=await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const getSearch =(event)=>{
    event.preventDefault();
    setQuery(search); 
    setSearch(''); 
  }
 
  const updateSearch=(event)=>{
    setSearch(event.target.value);
  }

  return(
    <div className='App'>
      <form className='search-form' onSubmit={getSearch}>
        <input className='search-bar' type="text" value={search} onChange={updateSearch}></input>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe=>(
          <Recipe key={Math.random()*1000} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>  
        ))}
      </div>
    </div>
  );
}

export default App;
