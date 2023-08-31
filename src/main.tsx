import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MusicPlayer } from "./components/MusicPlayer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MusicPlayer>
      <App />
  </MusicPlayer>
);
