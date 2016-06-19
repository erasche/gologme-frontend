import React from 'react';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';
import InfiniteCalendar from 'react-infinite-calendar';
import { withRouter } from 'react-router'
import moment from 'moment';
import Blog from './Blog';
import KeypressChart from './KeypressChart';

var Day = React.createClass({

    getInitialState: function() {
        return {
            date: new Date(),
            blog: null,
            window_events: [],
            notes_events: [],
            keyfreq_events: [],
            keyData: null,
        }
    },

    threeComponentDate(date){
        return date.toISOString().slice(0, 10);
    },

    loadDataFromServer: function(date){
        this.serverRequest = $.ajax({
            url: ServerUrl + "/api/events/" + this.threeComponentDate(date),
            dataType: 'json',
            cache: true,
            headers: {
                "Authorization": ApiKey,
            },
            success: function(data) {
                this.setState({
                    blog: data.blog,
                    window_events: data.window_events,
                    notes_events: data.notes_events,
                    keyfreq_events: data.keyfreq_events,
                    date: date
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        if(!this.props.params.date){
            this.props.router.push('/day/' + this.threeComponentDate(this.state.date));
        } else {
            this.props.params.date = moment(this.props.params.date, "YYYY-MM-DD").toDate();
        }
        this.loadDataFromServer(this.props.params.date);
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    navigateTo: function(date) {
        var url = '/day/' + date.format("YYYY-MM-DD");
        this.props.router.push(url);
        this.loadDataFromServer(date.toDate());
    },

    render: function() {
        return (
            <div>
                <h2>{ this.threeComponentDate(this.state.date) }</h2>
                <Blog contents={this.state.blog} date={this.threeComponentDate(this.state.date)}/>

                <h3>Keypresses</h3>
                <KeypressChart
                    date={this.state.date}
                    data={this.state.keyfreq_events}
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
