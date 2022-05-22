import './App.css';
import { useState, useEffect } from 'react'
import Category from './components/Category';
import Heading from './components/Heading';
import Posters from './components/Posters';
import HiddenDiv from './components/HiddenDiv';
import SearchForm from './components/SearchForm';

function App() {

  //states:
  const [posters, setPosters] = useState({ "results": [] });
  const [showDisplay, setShowDisplay] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  const [comments, setComments] = useState([]);

  const [commentIDs, setCommentIDs] = useState([]);

  const [id, setId] = useState();
  const [posterPath, setPosterPath] = useState('');
  const [trailerPath, setTrailerPath] = useState('');
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runtime, setRuntime] = useState('');
  const [overview, setOverview] = useState('');


  //when clicking categories
  const onClickCategory = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setPosters(data);
  }


  //when clicking favorite movie
  const onClickFavorites = async () => {
    const res = await fetch('http://localhost:5000/favorites');
    const data = await res.json();


    let resultsObj = { "results": [] };
    for (var i = 0; i < data.length; ++i) {
      const res2 = await fetch(`https://api.themoviedb.org/3/movie/${data[i].id}?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US`);
      const data2 = await res2.json();
      resultsObj.results.push(data2);
    }


    setPosters(resultsObj);
    setShowDisplay(false);
  }


  //when user wishes to add or remove from favorites
  const onClickAddFavorites = async () => {


    if(!isFavorite){
      console.log("i want to add this to favorites with id: " + id);
      let newFavorite = {id: id};
      const res = await fetch('http://localhost:5000/favorites', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newFavorite)
      })
  
      const data = await res.json();

      alert("Added to your Favorites");
      
      onClickFavorites();
    }
    else {

      await fetch(`http://localhost:5000/favorites/${id}`, {
        method: 'DELETE'
      })
     
      alert('Removed from your Favorites');
      onClickFavorites();
      setIsFavorite(!isFavorite);
      
    }

    



  }


  //when user clicks on the poster (hidden div appears)
  const onClickPoster = async (id) => {


    const res9 = await fetch('http://localhost:5000/comments');
    const data9= await res9.json();
    let commentsFetched = [];
    let commentIdFetched = [];
    for (let i = 0; i < data9.length; ++i) {
      if (data9[i].movieId === id) {
        commentsFetched.push(data9[i].comment);
        commentIdFetched.push(data9[i].id);
      }
    }
    setComments(commentsFetched);
    setCommentIDs(commentIdFetched);





    setShowDisplay(!showDisplay);



    const resTrailerPath = await fetch("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US");
    const dataTrailerPath = await resTrailerPath.json();
    setTrailerPath("https://www.youtube.com/embed/" + dataTrailerPath.results[0].key);


    const res = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US");
    const data = await res.json();

    setTitle(data.title);
    setReleaseDate(data.release_date);
    setRuntime(data.runtime);
    setOverview(data.overview);
    setId(id);


    const resExisting = await fetch('http://localhost:5000/favorites');
    const dataExisting = await resExisting.json();
    
    for (let i = 0; i< dataExisting.length; ++i) {
      if (dataExisting[i].id === id) {
        setIsFavorite(true);
        return;
      }
    }
    setIsFavorite(false);


  }


  //close button event
  const onClickClose = (id) => {
    setShowDisplay(!showDisplay);

  }

  //fetch Movies:
  const fetchPopularMovies = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1');
    const data = await res.json();
    return data;
  }

  //search movie:
  const searchMovie = async (input) => {
    // console.log(input.text);
    const res = await fetch("https://api.themoviedb.org/3/search/movie?api_key=0c1cfc186512612b10c8d9f9fe03adb2&query=" + input.text);
    const data = await res.json();
    setPosters(data);
  }



  //initialize webpage with popular movies.
  useEffect(() => {
    const getMovies = async () => {
      const moviesFromServer = await fetchPopularMovies();
      setPosters(moviesFromServer);
    }
    getMovies();

  }, [])



  const onAddComment = async (input) => {



    const newComment = {movieId: id, comment: input.text};

    const res = await fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newComment)
    })

    setComments([...comments, input.text]);

  }

  const onDeleteComment = async (x) => {
    await fetch(`http://localhost:5000/comments/${x}`, {
      method: 'DELETE'
    })
        //fetch and display comments
        const res9 = await fetch('http://localhost:5000/comments');
        const data9= await res9.json();
        let commentsFetched = [];
        let commentIdFetched = [];
        for (let i = 0; i < data9.length; ++i) {
          if (data9[i].movieId === id) {
            commentsFetched.push(data9[i].comment);
            commentIdFetched.push(data9[i].id);
          }
        }
        setComments(commentsFetched);
        setCommentIDs(commentIdFetched);
  }


  return (
    <>
      {showDisplay && <HiddenDiv onDeleteComment={onDeleteComment}  isFavorite={isFavorite} id={id} trailerPath={trailerPath} title={title} releaseDate={releaseDate} runtime={runtime} overview={overview} onClickClose={onClickClose} onClickAddFav={onClickAddFavorites} onAddComment={onAddComment} comments={comments} commentIDs={commentIDs}/>}
      <Category categoryID='popular-btn' categoryName='See Popular' onClick={() => onClickCategory('https://api.themoviedb.org/3/movie/popular?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1')} />
      <Category categoryID='top-rated-btn' categoryName='See Top-Rated' onClick={() => onClickCategory('https://api.themoviedb.org/3/movie/top_rated?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1')} />
      <Category categoryID='favorites-btn' categoryName='See Your Favorites' onClick={() => onClickFavorites()} />
      <SearchForm onSearch={searchMovie} />
      <Heading headingID='heading' headingText='Popular Movies' />
      <Posters posters={posters} onClickPoster={onClickPoster} />
    </>
  );
}




export default App;

