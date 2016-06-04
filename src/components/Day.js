import React from 'react';
import { ServerUrl } from '../../conf.json';
import $ from 'jquery';
import InfiniteCalendar from 'react-infinite-calendar';
import { withRouter } from 'react-router'
import Blog from './Blog';
import rd3 from 'rd3';

const LineChart = rd3.LineChart;
var lineData = [
    {
        name: 'Keypresses',
        values: [ { x: 0, y: 20 }],
    }
];


var Day = React.createClass({

    getInitialState: function() {
        return {
            date: new Date().toISOString().slice(0, 10),
            blog: "",
            window_events: [],
            notes_events: [],
            keyfreq_events: [],
            keyData: lineData,
        }
    },

    loadDataFromServer: function(date){
        this.serverRequest = $.ajax({
            url: ServerUrl + "/api/events/" + date,
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({
                    blog: data.blog,
                    window_events: data.window_events,
                    notes_events: data.notes_events,
                    keyfreq_events: data.keyfreq_events,
                    keyData: lineData,
                    date: date
                });
                console.log(this.state);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        if(!this.props.params.date){
            this.props.router.push('/day/' + this.state.date);
        }
        this.loadDataFromServer(this.props.params.date);
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    navigateTo: function(moment) {
        var url = '/day/' + moment.format("YYYY-MM-DD");
        this.props.router.push(url);
        this.loadDataFromServer(moment.format("YYYY-MM-DD"));
    },

    render: function() {
        return (
            <div>
                <h2>{ this.state.date }</h2>
                <Blog contents={this.state.blog}/>

                <h3>Keypresses</h3>

                <LineChart
                    legend={true}
                    data={lineData}
                    width='100%'
                    height={140}
                    viewBoxObject={{
                      x: 0,
                      y: 0,
                      width: 800,
                      height: 140
                    }}
                    xAxisTickValues={[]}
                    yAxisTickValues={[]}
                    //domain={{x: [0,6], y: [-10,0]}}
                />
                <hr />
                <InfiniteCalendar
                    selectedDate={this.state.date}
                    onSelect={this.navigateTo}
                    />
            </div>
        )
    }
});


export default withRouter(Day);
