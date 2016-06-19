import React from 'react';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';
import InfiniteCalendar from 'react-infinite-calendar';
import { withRouter } from 'react-router'
import Blog from './Blog';
import rd3 from 'rd3';
import moment from 'moment';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var Day = React.createClass({

    getInitialState: function() {
        return {
            window_events: [],
            updated: new Date(),
        }
    },

    loadDataFromServer: function(){
        this.serverRequest = $.ajax({
            url: ServerUrl + "/api/events/recent",
            dataType: 'json',
            cache: true,
            headers: {
                "Authorization": ApiKey,
            },
            success: function(data) {
                this.setState({
                    window_events: data,
                    updated: new Date(),
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadDataFromServer();
        setInterval(this.loadDataFromServer, 5000);
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        var windowTitles = this.state.window_events.reverse().map(function(item, index){
            var q = moment.unix(item.t).format();
            return (
                <TableRow key={index}>
                    <TableRowColumn>{q}</TableRowColumn>
                    <TableRowColumn>{item.s}</TableRowColumn>
                </TableRow>
            );
        });

        return (
            <div>
                <h2>Recent Windows</h2>
                <p>Data as of {this.state.updated.toTimeString()}</p>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}>

                        <TableRow>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                            <TableHeaderColumn>Window Title</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        showRowHover={true}
                        stripedRows={true}
                        displayRowCheckbox={false}>
                        {windowTitles}
                    </TableBody>
                </Table>
            </div>
        )
    }
});


export default withRouter(Day);
