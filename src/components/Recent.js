import React from 'react';
import { ServerUrl } from '../../conf.json';
import $ from 'jquery';
import InfiniteCalendar from 'react-infinite-calendar';
import { withRouter } from 'react-router'
import Blog from './Blog';
import rd3 from 'rd3';

var Day = React.createClass({

    getInitialState: function() {
        return {
            blog: "",
            window_events: [],
            notes_events: [],
            keyfreq_events: [],
        }
    },

    loadDataFromServer: function(){
        this.serverRequest = $.ajax({
            url: ServerUrl + "/api/events/recent",
            dataType: 'json',
            cache: true,
            success: function(data) {
                this.setState({
                    blog: data.blog,
                    window_events: data.window_events,
                    notes_events: data.notes_events,
                    keyfreq_events: data.keyfreq_events,
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadDataFromServer();
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        var windowTitles = this.state.window_events.map(function(item, index){
            return (
                <li>{item.s}</li>
            );
        });

        return (
            <div>
                <h2>Recent Events</h2>
                <p>
                    <b>Blog:</b> {this.state.blog}
                </p>
                <h3>Windows</h3>
                <ul>
                    {windowTitles}
                </ul>
            </div>
        )
    }
});


export default withRouter(Day);
