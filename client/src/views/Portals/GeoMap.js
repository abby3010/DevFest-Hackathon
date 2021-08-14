import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';

const GeoMap = ({ disease }) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const countries = [];

    useEffect(() => {
        for (let i = 0; i < disease[1].length; i++) {
            data.push(disease[1][i]["Cases"]);
            countries.push(disease[1][i]["Country"]);
        }
        console.log(data);
        console.log(countries);
    }, [disease, countries, data])

    const dataBar = {
        labels: countries,
        datasets: [
            {
                label: disease[0],
                backgroundColor: '#000',
                borderWidth: 0,
                data: data
            },
        ]
    };

    return (
        <div className="chart-bearer">
            <Bar
                data={dataBar}
                width={50}
                height={30}
            />
        </div>
    )
}

export default GeoMap
