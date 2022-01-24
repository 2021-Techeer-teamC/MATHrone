
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

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

