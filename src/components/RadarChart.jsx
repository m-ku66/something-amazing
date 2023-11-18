import React from 'react'
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, RadialLinearScale, Filler } from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
);

const RadarChart = ({ selectedCharacter }) => {


    function classColors(className) {
        let colors = ["", ""];
        switch (className) {
            case 'Flame Sorcerer':
                colors[0] = "rgba(255,0,0,0.4)";
                colors[1] = "rgba(255,0,0,1)";
                break;

            case 'Decryption Unit':
                colors[0] = "rgba(0,0,0,0.4)";
                colors[1] = "rgba(0,0,0,1)";
                break;
        }
        return colors;
    }

    const data = {
        labels: ['HP', 'PATK', 'MATK', 'DEF', 'RES', 'SKILL', 'LUCK', 'AGI'],
        datasets: [{
            label: "Core Stats",
            data: [
                selectedCharacter.stats.HP,
                selectedCharacter.stats.PATK,
                selectedCharacter.stats.MATK,
                selectedCharacter.stats.DEF,
                selectedCharacter.stats.RES,
                selectedCharacter.stats.SKILL,
                selectedCharacter.stats.LUCK,
                selectedCharacter.stats.AGI],
            backgroundColor: classColors(selectedCharacter.class)[0],
            borderColor: classColors(selectedCharacter.class)[1],
        }]
    }

    const options = {
        scales: {
            r: {
                ticks: {
                    display: false
                }
            }
        },
        elements: {
            line: {
                borderWidth: 0
            }
        }
    }

    return (
        <div className='w-[300px] h-[300px] mb-[8%]'>
            <Radar
                data={data}
                options={options}
            ></Radar>
        </div>
    )
}

export default RadarChart