import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './article.css';

function FullArticle(){

    let [post, changePost] = useState({});
    let url = "";
    let id = "";

    useEffect(() => {
        // Some components scroll to the middle of the page
        window.scrollTo(0, 0);

        // Obtaining article id for display
        url = window.location.href;
        id = url.substring(url.lastIndexOf("/") + 1);

        // fetch specific article using id
        axios.get(`/articles/single/${id}`)
            .then(res => {
                if(res !== undefined){
                    changePost(res.data);
                }
            })
            .catch(err => console.log(err));
        
    }, []);

    let disqus_config = () => {
        this.page.url = url;
        this.page.identifier = id;
    };

    (function () {
        var d = document, s = d.createElement('script');
        s.src = 'https://vascomedia.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();


    return(
        <div className="article-outer-container">

            {/* <h1 className="heading">{post.title}</h1>

            <div className='author-date'>
                <p><i>{post.author === undefined ? '': `by ${post.author} /`}</i></p>
                <p><i>{post.date === undefined ? '': `${post.date}`}</i></p>
            </div>

            <div className="article-img">   
            </div>
            
            <div>
                <p className="full-content">{post.content}</p>
            </div> */}
            
            <div className="article-inner-container" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            
        </div>
    )
}

export default FullArticle;