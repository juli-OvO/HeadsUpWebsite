/* App composition — Heads Up About page */
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <Mission />
        <FirstClub />
        <Chapters />
        <Testimonials />
        <WhatWeDo />
      </main>
      <Footer />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
