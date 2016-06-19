import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';
import rd3 from 'rd3';

const LineChart = rd3.LineChart;
var lineData = [
    {
        name: 'Keypresses',
        values: [ { x: 0, y: 20 }],
    }
];

var KeypressChart = React.createClass({
    getInitialState: function(){
        return {
            date: null,
            min: 0,
            max: 10,
            ymax: 30,
        }
    },

    threeComponentDate(date){
        return date.toISOString().slice(0, 10);
    },

    loadDataFromServer: function(date){
        this.serverRequest = $.ajax({
            url: ServerUrl + "/api/events/kb/" + this.threeComponentDate(date),
            dataType: 'json',
            cache: true,
            headers: {
                "Authorization": ApiKey,
            },
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        //this.loadDataFromServer(this.props.params.date);
    },

    render: function () {
        return (
            <LineChart
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
                domain={{x: [this.state.min,this.state.max], y: [0,this.state.ymax]}}
            />
        )
    }
});

export default KeypressChart;
