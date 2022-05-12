import React from 'react'
import axios from "axios";
import data from '../../data/voices.json'

const TextToSpeech = () => {
    const url = 'https://name-pronunciation-service-be.el.r.appspot.com/voices'
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get(url).then((response) => {
            console.log(response.data)
            setData(response.data);
        });
    }, []);


    return (
        <div>
            <select>
                {
                    data && data.map(item => {
                        return (<option>{item.name}</option>)
                    })
                }
            </select>
        </div>
    )
}

export default TextToSpeech