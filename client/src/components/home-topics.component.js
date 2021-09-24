import React from 'react';
import {Link} from 'react-router-dom';

function Topics(){

    // styling for outer container
    const style_parent = {
        // height: '100%',
        // width: '100%',
        margin: '5.75% 3.5%',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
        borderBottom: '1.5px solid black',
        backgroundColor: 'white',
        position: 'relative',
        top: '0'
    }

    // styling for headings
    const style_child = {
        fontWeight: '500',
        color: 'black',
        flex: '1',
        marginBottom: '17.5%'
    }

    // styling for main container div
    const style_outer = {
        width: '100%',
        height: '8.5%',
        backgroundColor: 'purple',
        position: 'fixed',
        top: '10%',
        borderTopLeftRadius: '1em',
        borderTopRightRadius: '1em'
    }

    return(
        <div style={style_outer}>
            <div style={style_parent}>
                <Link to='/topic/News' style={{textDecoration: 'none'}}>
                    <h3 style={style_child}>News</h3>
                </Link>
                <Link to='/topic/Lifestyle' style={{textDecoration: 'none'}}>
                    <h3 style={style_child}>Lifestyle</h3>
                </Link>
                <Link to='/topic/Fashion' style={{textDecoration: 'none'}}>
                    <h3 style={style_child}>Fashion</h3>   
                </Link>
            </div>
        </div>
    )
}

export default Topics;
