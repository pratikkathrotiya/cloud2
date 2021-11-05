import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function CreateChart({ data }) {
    if (data) {
        //Rearrange data for chart
        const positive = []
        const neutral = []
        const negative = []


        Object.values(data[0]).forEach(x => {
            positive.push(x.positive);
            neutral.push(x.neutral)
            negative.push(x.negative)
        })


        const chartData = {
            labels: Object.keys(data[0]).reverse(),
            datasets: [{
                label: 'Positive',
                data: positive.reverse(),
                backgroundColor: '#ff6386'
            }, {
                label: 'Neutral',
                data: neutral.reverse(),
                backgroundColor: '#4bc0c0'
            }, {
                label: 'Negative',
                data: negative.reverse(),
                backgroundColor: '#ffce56'
            }]
        }
        const barOptions = {
            responsive: true,
            title: {
                display: true,
                text: "Monthly Tweets Sentiment",
                fontSize: 20
            },
            legend: {
                position: 'right'
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Tweets'
                    }
                }]
            }
        }
        return (
            <Bar
                data={chartData}
                options={barOptions}
            />
        )
    } else {
        return (null)
    }

}