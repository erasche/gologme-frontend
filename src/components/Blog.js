import React from 'react';
import InlineEdit from 'react-edit-inline';
import { ServerUrl, Username, ApiKey } from '../../conf.json';
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
            data: JSON.stringify({
                user: Username,
                api_key: ApiKey,
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
              text={this.state.contents || this.props.contents}
              paramName="message"
              change={this.dataChanged}
              style={{
                minWidth: 350,
                display: 'inline-block',
                margin: 3,
                padding: 5,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            />
        )
    }
});

export default Blog;
