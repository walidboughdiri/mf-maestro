import { startMediator } from "mf-maestro";
import MainPage from "./pages/MainPage";
import init from "./init";

startMediator("root", MainPage, init);
