import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, ApiKey } from '../../conf.json';
import $ from 'jquery';

var Blog = React.createClass({
    getInitialState: function(){
        return {
            contents: null,
        }
    },

    dataChanged: function(newValue) {
        $.ajax({
            type: "POST",
            url: ServerUrl + "/api/blog",
            dataType: 'json',
            headers: {
                "Authorization": ApiKey,
            },
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                message: newValue.message,
                date: this.props.date,
            }),
            success: function(data){
                this.setState({contents: data.message});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(xhr, status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <InlineEdit
              activeClassName="editing"
              text={this.state.contents || this.props.contents || "Enter blog for this day..."}
              paramName="message"
              change={this.dataChanged}
              style={{
                minWidth: 350,
                display: 'inline-block',
                margin: 3,
                padding: 5,
                fontSize: 15,
                border: '1px solid black',
              }}
            />
        )
    }
});

export default Blog;
