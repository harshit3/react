import React from 'react';
import { BarChart, PieChart } from 'react-d3-components';
import './charts.scss';

export default class Charts extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            followers: '',
            gists: '',
            received_events: ''
        }
    }

    async componentDidMount(){
        let followers = await fetch('https://api.github.com/users/mojombo/followers');
        followers = await followers.json();
        let gists = await fetch('https://api.github.com/users/mojombo/gists');
        gists = await gists.json();
        let received_events = await fetch('https://api.github.com/users/mojombo/received_events')
        received_events = await received_events.json();
        this.setState({
            followers: followers.length,
            gists: gists.length,
            received_events: received_events.length
        })
    }

    getRandomValues = () => {
        let { followers, gists, received_events } = this.state;
        followers = Math.ceil(Math.random()*followers)
        gists = Math.ceil(Math.random()*gists)
        received_events = Math.ceil(Math.random()*received_events)
        return { followers, gists, received_events }
    }

    getBarChartData = () => {
        const { followers, gists, received_events } = this.getRandomValues();
        return {
            values: [{x: 'Followers', y: followers}, {x: 'Gists', y: gists}, {x: 'Received Events', y: received_events}]
        };
    }

    getPieChartData = () => {
        const { followers, gists, received_events } = this.getRandomValues();
        return {
            values: [{x: 'Followers', y: followers}, {x: 'Gists', y: gists}, {x: 'Received Events', y: received_events}]
        };
    }

    render(){
        return(
            <div className="charts-grid">
                <div className="chart-container">
                    <PieChart 
                        data={this.getPieChartData()}
                        height={300}
                        width={400}
                        margin={{top: 10, bottom: 10, left: 110, right: 100}}
                    />
                </div>
                <div className="chart-container">
                    <BarChart
                        data={this.getBarChartData()}
                        height={300}
                        width={400}
                        margin={{top: 10, bottom: 50, left: 50, right: 10}}
                    />
                </div>
            </div>
        )
    }
}