import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "./Filmler/Film";
import FilmListesi from "./Filmler/FilmListesi";
import { Switch, Route } from "react-router-dom";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log(response);
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    const control = saved.find((film) => film.id === Number(id));

    if (!control) {
      const kaydedilecekFilm = movieList.find((film) => film.id === Number(id));
      console.log("kaydedilecekFilm", kaydedilecekFilm);
      const yeniSavedState = [kaydedilecekFilm, ...saved];
      setSaved(yeniSavedState);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <KaydedilenlerListesi list={saved} />
        <div>
          <Switch>
            <Route path="/filmler/:id">
              <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
            </Route>
            <Route path="/">
              <FilmListesi movies={movieList} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
