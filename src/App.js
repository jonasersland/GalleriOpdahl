import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import frontpage from "./pages/frontpage.page.jsx";
import about from "./pages/about.page.jsx";
import ArtistOverview from "./pages/artist-overview.page.jsx";
import ArtistIndividual from "./pages/artist-individual.page.jsx";
import ExhibitionOverview from "./pages/exhibition-overview.page.jsx";
import ExhibitionIndividual from "./pages/exhibition-individual.page.jsx";
import EventOverview from "./pages/event-overview.page.jsx";
import EventIndividual from "./pages/event-individual.page.jsx";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={frontpage} path="/Ny/" exact />
        <Route component={ArtistOverview} path="/Ny/artists/" />
        <Route component={ArtistIndividual} path="/Ny/artist/:slug" />
        <Route component={ExhibitionOverview} path="/Ny/exhibitions/" />
        <Route component={ExhibitionIndividual} path="/Ny/exhibition/:slug" />
        <Route component={EventOverview} path="/Ny/newspage/" />
        <Route component={EventIndividual} path="/Ny/news/:slug" />
        <Route component={about} path="/Ny/about/" />
      </div>
    </BrowserRouter>
  );
}
export default App;
