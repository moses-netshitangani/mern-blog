import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';

export const BlogContext = createContext();

export const BlogArticles = (props) => {
    // topics
    let topic = "";
    const topic_list = ['News', 'Lifestyle', 'Fashion', 'Other',
                        'news', 'lifestyle', 'fashion', 'other'];

    // controllers
    let all_ctrl = false;
    let topics_ctrl = false;

    // fetch data after component mounts
    useEffect(() =>
    {
        setInterval(check, 1000);
    }, []);

    // fetch all articles for default display
    let all = () => {
        axios.get("http://localhost:3000/articles")
            .then(res => {
                if (res.data.length > 0) {
                    changeData(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    // fetch articles according to topics
    let topics = prop => {
        axios.get(`http://localhost:3000/articles/topic/${prop}`)
            .then(res => {
                if(res.data.length > 0){
                    changeData(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    // checks for changes in URL
    let check = () => {
        let url = window.location.href;
        for(var i = 0; i < topic_list.length; i++)
        {
            if(url.includes(topic_list[i]))
            {
                topic = topic_list[i];
                break;
            }
            topic = "";
        }

        // fetch data
        if((topic === "") && (all_ctrl === false))
        {
            all_ctrl = true;
            topics_ctrl = false;
            all();
        }
        else{
            if((topic !== "") && (topics_ctrl === false))
            {
                topics_ctrl = true;
                all_ctrl = false;
                topics(topic);
            }
        }
    }

    // data state
    let [data, changeData] = useState([]);

    return(
        <BlogContext.Provider value={data}>
            {props.children}
        </BlogContext.Provider>
    );
}