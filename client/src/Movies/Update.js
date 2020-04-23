import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: []
  }

export default function Update(props) {

    const { push } = useHistory();
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res);
            setItem(res.data);

        })
    }, [id])

   

      const changeHandler = e => {
        
    
        setItem({
          ...item,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, item)
          .then(res => {

            console.log(res);
            props.getMovieList();
            push('/');

            })
          
          .catch(err => console.log(err));
      };


    return (
        <div className="movie-card">
          <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
            <h3>Title:</h3>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="title"
              value={item.title}
            />
        </label>
        <div className="baseline" />

        <label>
<h3>
                Director:

</h3>              <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="director"
              value={item.director}
            />
        </label>
        <div className="baseline" />

       <label>
           <h3>Metascore:</h3> 
            <input
              type="text"
              name="metascore"
              onChange={changeHandler}
              placeholder="metascore"
              value={item.metascore}
            />
       </label>
        <div className="baseline" />




        <button className="md-button form-button">Update</button>
      </form>

        </div>
    )
}