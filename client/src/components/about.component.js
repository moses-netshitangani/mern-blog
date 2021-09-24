import React from 'react';
import './about.css';

const About = () => {
    
    return(
        <div className="about-container">
            <h2 className="about-heading">
                About Me
            </h2>

            <div className='about-image'></div>

            <div className="about-content">
                <p>
                    Hi! I am <i>Lihle</i> and blogging is one of my many 
                    passions. My aim is to keep you informed about topical  
                    events relating to Fashion, Lifestyle and a little 
                    bit of Gossip too (I mean why not?).
                </p>
                <br />
                <p>
                    All content in this blog is written by myself
                    and I would very much appreciate your feedback, hence
                    I compel you to leave a comment and/or share the 
                    articles.
                </p> 
                <br />
                <p>
                    You can find my socials in the Contact section.
                    Thanks in advance and happy reading :).
                </p>
                </div>
        </div>
    );
}

export default About;