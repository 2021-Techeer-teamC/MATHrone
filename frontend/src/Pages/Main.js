import * as React from "react";
import "../Assets/styles/components.css"

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";


const theme = createTheme();

export default function Main(props) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="MATHrone" sections={sections} />
          <main class="main">
            <Carousel
              autoPlay={true}
              interval={3000} // default = 3000
              infiniteLoop={true}
              swipeable={true} // default = true
              width={"500px"}
              showStatus={false}
              showThumbs={false}
            >
              <div>
                <img src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1597645587822-e99fa5d45d25" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1567306301408-9b74779a11af" />
              </div>
            </Carousel>
            <Routes>
              <Route path="/info" exact element={<InfoPage />} />
              <Route path="/books" exact element={<Books />} />
              <Route path="/rank" exact element={<Rank />} />
            </Routes>
          </main>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
  );
}
