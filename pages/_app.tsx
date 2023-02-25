import "../styles/globals.css";
import type {AppProps} from "next/app";
import {Layout} from "../components";
import {Provider} from "react-redux";
import {store} from "../redux/store";
import { Toaster } from "react-hot-toast";


function MyApp({Component, pageProps}: AppProps) {
  return(
  <Provider store={store}>
    <Layout>
      <Toaster/>
      <Component {...pageProps} />
    </Layout>
  </Provider>
  )
}

export default MyApp;
