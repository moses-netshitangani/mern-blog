import React, { useEffect, useState } from 'react';
import QuillEditor from '../editor/QuillEditor';
import axios from 'axios';
import './create.css';

function CreatePage() {

    let content = "";
    let topic = "";
    let [files, setFiles] = useState([]);
    let [post_status, setStatus] = useState("Post successful!");
    let [popup, setPopup] = useState("popup_off");


    const onEditorChange = (value) => {
        content = value;
    }

    const onFilesChange = (files) => {
        setFiles(files);
    }

    const onTopicChange = () => {
        topic = document.getElementById('tpc').value;
        console.log(topic);
    }

    // reverting back to the home page
    const goBack = () => {
        if(post_status === "Post successful!") {
            window.location = "/";
        }
        else
        {
            // destroy pop up
            setPopup("popup_off");
        }
    }
    
    // submitting a blog post
    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: content,
            topic: topic
        }
        axios.post('http://localhost:3000/articles/add', variables)
            .then(res => {
                setStatus("Post successful!");
                setPopup("popup_on popup_success");
            })
            .catch(err => {
                console.log(err);
                setStatus('Post upload failed.');
                setPopup("popup_on popup_fail");
            })
        
    }


    // styling for the submit button
    let submit_btn_style = {
        width: '15em',
        height: '2.5em',
        marginTop: '1em',
        borderRadius: '15px',
        backgroundImage: 'linear-gradient(to right, orange, #c93655)',
        color: 'white',
        fontSize: '1em',
        border: '0px solid transparent',
        outline: 'none',
        cursor: 'pointer'
    }

    // styling for the input field cover
    let input_container = {
        display: 'block',
        margin: '2.5em auto auto auto',
        width: '16em',
        height: '3em',
        padding: '0.5em 0',
        display: 'flex'
    }

    // styling for the input field
    let input_style = {
        outline: 'none',
        width: '12em',
        height: '2.25em',
        fontSize: '1em',
        padding: '0 0.5em',
        border: '2px solid black',
        borderRadius: '15px',
        display: 'block',
        textAlign: 'center',
        textTransform: 'capitalize'
    }


    return (
        <div style={{margin: '10rem auto'}}>
            
            {/* Post Success/Fail pop up */}
            <div className={popup}>
                <h2>{post_status}</h2>
                <button onClick={goBack}>OK</button>
            </div>
            
            {/* Quill editor */}
            <div style={{ textAlign: 'center', margin: '0 0 3em 0' }}>
                <h1>CREATE A BLOG POST!</h1>
            </div>

            <QuillEditor
                placeholder={"Hi Lihle! Write something."
                +"\nTips:"
                +"\n-Select the 'Heading 1' option and write out your heading."
                +"\n-Make sure each post is accompanied by an image, or multiple."
                +"\nGeneral format:"
                +"\n-Heading *Enter* Image *Enter* Author name | Date (in italics), Skip line, Content."}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            {/* Topic input */}
            <form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem'}}>

                    {/* input field */}
                    <div style={input_container}>
                        <h2>Topic:</h2>
                        <input type='text' id='tpc' style={input_style} onChange={onTopicChange} required></input>
                    </div>

                    <input type='submit' value='Submit' style={submit_btn_style}></input>
                </div>
            </form>
        </div>
    )
}

export default CreatePage;