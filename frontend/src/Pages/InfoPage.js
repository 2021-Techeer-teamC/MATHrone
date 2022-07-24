
import Header from "../components/Header/index.js";
import NavBar from "../components/NavBar.js";
import Footer from "../components/Footer.js";

export default function InfoPage(props) {  
  return (
    <>
    <Header title="MATHrone" />
      <NavBar sections={props.sections} />
      <h1>Info Page</h1>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}

