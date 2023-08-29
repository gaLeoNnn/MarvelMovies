import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  const onGetId = id => {
    setSelectedId(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList onGetId={onGetId} />
          <CharInfo selectedId={selectedId} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
}

export default App;
