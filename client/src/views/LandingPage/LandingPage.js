import React from 'react';
import Main from './Main';
import Nav from './Nav';
import Contact from './Contact';
import Footer from './Footer';

function LandingPage() {

    return (
        <div className="landing">
            <Nav />
            <Main />
            <Contact />
            <Footer />
        </div>
    );
}

export default LandingPage;