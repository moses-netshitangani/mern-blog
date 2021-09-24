import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {BlogContext} from './blog-context';
import './article-description.css';

function Description(){
    // acquiring data from BlogContext component
    const data = useContext(BlogContext);

    useEffect(() => {
        // Some components scroll to the middle of the page
        window.scrollTo(0, 0); 
    }, []);

    // style for the overall container
    const style_container = {
        margin: '7.75em 0 0 0'
    }

    return(
            <div className="outer-container" style={style_container}>
                
                {data.map((article, key) =>{
                    return (
                        <Link to={`/articles/single/${article._id}`} className="link" style={{textDecoration:'none'}} key={key} >
                            <div className="post-container">
                                {/* <p  className="category" >{article.category}</p>
                                <div className="content">
                                    <div className="brief">
                                        <h3>{article.title}</h3>
                                        <p>{article.content}</p>
                                    </div>
                                    <div id="article-img">
                                        article image
                                    </div>
                                </div> */}
                                <div className="article" dangerouslySetInnerHTML={{__html: article.content}}></div>
                            </div>
                        </Link>
                    )
                })}
                
                {/* for layout purposes */}
                <div className="fill-space"></div>
                <div className="fill-space"></div>
                <div className="fill-space"></div>
            </div>
    )
}

export default Description;