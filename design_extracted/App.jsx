/* App composition — Heads Up About page */
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <Hero />
        <FirstClub />
        <Mission />
        <YouthBand />
      </main>
      <Footer />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
