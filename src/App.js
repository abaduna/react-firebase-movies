import logo from './logo.svg';
import './App.css';
import { Auth } from './componets/auth';
import {db,auth} from ".///config/firebase"
import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore";

function App() {
  const [movieList,setMovieList]=useState([])
  const [titleUpDate,SetTitleUpDate] =useState("")
  //New Movie States 

  const [newMovie,setNewMovie]=useState({
    title:"",
    releaseDate:0,
    receivedAnOscar:false,
    id:0
    // id:auth?.currentUser?.uid

  })

  const moviesCollectionRef = collection(db,"movies")
  useEffect(()=>{
  const getMovieList=async()=>{
      
      //SET THE MOVIE LIST
      try {
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, titleUpDate: "" }));
        setMovieList(filteredData)
      } catch (error) {
       console.error(`mensaje de error ${error}`); 
      }
      
  }

  getMovieList()
  },[])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMovie(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpload = async () => {
    try {
      // Add the new movie to the Firestore collection
      await addDoc(moviesCollectionRef, newMovie);

      // upDate the movie list
      setMovieList(prevList => [...prevList, newMovie]);

      // Clear the input fields
      setNewMovie({
        title: "",
        releaseDate: 0,
        receivedAnOscar: false
      });
    } catch (error) {
      console.error(`Error uploading movie: ${error}`);
    }
  };
  const deleteMovie= async(id)=>{
    const movieDoc = doc(db,"movies",id)
     await deleteDoc(movieDoc)

     
  }

  const handleTitleInputChange = (id, value) => {
    setMovieList((prevList) =>
      prevList.map((movie) => (movie.id === id ? { ...movie, titleUpDate: value } : movie))
    );
  };

  const upDate = async (id) => {
    const movieToUpdate = movieList.find((movie) => movie.id === id);
    const updatedTitle = Array.isArray(movieToUpdate.titleUpDate) ? [...movieToUpdate.titleUpDate] : movieToUpdate.titleUpDate;

    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });

    setMovieList((prevList) =>
      prevList.map((movie) =>
        movie.id === id ? { ...movie, title: updatedTitle, titleUpDate: "" } : movie
      )
    );
  };
  
  return (
    <div className="App">
      <Auth></Auth>
      <div>
      <input
          placeholder='Titulo de la pelicula'
          name="title"
          value={newMovie.title}
          onChange={handleInputChange}
        />
        <input
          placeholder='Año de la pelicula'
          name="releaseDate"
          value={newMovie.releaseDate}
          onChange={handleInputChange}
          type="number"
        />
        <input
          type='checkbox'
          name="receivedAnOscar"
          checked={newMovie.receivedAnOscar}
          onChange={handleInputChange}
        />
        <label>Recivio un oscar</label>
        <button onClick={handleUpload} >Subir</button>
      </div>
    <div>
      {movieList.map((movie)=>(
        <div key={movie.id} >
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
          <p>Fecha: {movie.releaseDate}</p>
          <span>{movie.receivedAnOscar? "gano un oscar":"no gano"}</span>
          <button onClick={()=> deleteMovie(movie.id)}>Eliminar</button>


          <input 
        placeholder="Nuevo titulo"
        value={movie.titleUpDate}
        onChange={(e) => handleTitleInputChange(movie.id, e.target.value)}
        
           />
        <button onClick={() => upDate(movie.id)}>Actualizar</button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
