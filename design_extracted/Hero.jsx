/* About hero — Heads Up */
const IMG_DEERFIELD = 'https://images.squarespace-cdn.com/content/v1/6539ab5e8546184840057d16/d60216b9-e05c-4181-b15a-e615cf0a9b21/Screen+Shot+2023-11-11+at+3.30.24+PM.png';
const IMG_CLASSROOM = 'https://images.squarespace-cdn.com/content/v1/6539ab5e8546184840057d16/ad9d9b16-8310-4bf9-9405-d94fb0263b3e/IMG_2424.JPG';

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="kicker-row" style={{ flexWrap: 'wrap' }}>
          <Sticker tone="cobalt" tilt="tilt-l" icon="users">About Us</Sticker>
          <span className="hand" style={{ fontSize: 23, color: 'var(--cobalt-600)', whiteSpace: 'nowrap' }}>est. 2020 · Deerfield Academy</span>
        </div>
        <h1>Students helping students <DrawHL>look up.</DrawHL></h1>
        <p className="lead">Heads Up is a youth-for-youth movement for digital balance. We started in one dining hall and a single club — and we're still run entirely by the people Big Tech is trying hardest to keep scrolling.</p>
        <div className="hero-stickers">
          <Sticker tilt="tilt-r">Youth-for-youth</Sticker>
          <Sticker tone="sky" tilt="tilt-l2" icon="heart">No middleman</Sticker>
          <Sticker tilt="tilt-l" icon="users">By students, for students</Sticker>
        </div>

        <div className="collage play">
          <Polaroid src={IMG_DEERFIELD} tape alt="Deerfield Academy campus in snow"
            fallback="Deerfield Academy" caption="where it started" />
          <Polaroid src={IMG_CLASSROOM} tape alt="Students giving a Heads Up presentation"
            fallback="A club presentation" caption="our first club meeting" />
          <Polaroid tape alt="A phone-free club hangout"
            fallback="Drop a club photo" caption="add your chapter!" />
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;
