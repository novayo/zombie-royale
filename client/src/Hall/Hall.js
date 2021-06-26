import React from 'react';
import InitData from '../Data/InitData';
import queryString from 'query-string';
import { Link } from 'react-router-dom';


function Hall({ location }) {
    const { name, passward } = queryString.parse(location.search);

    const StartButton = () => {
        InitData(name, passward);

        return;

        // const Hall_To_Start = () => {
        //     if(GetData("update").state)
        // }
    }

    return (
        <div>
            <h1>### Hello {name} ###</h1>
            <Link onClick={StartButton} to={`/Start?name=${name}`}>
                <button type="submit">Start Gaming</button>
            </Link>
        </div>
    )
}

export default Hall
