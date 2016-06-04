import React from 'react';
import InlineEdit from 'react-inline-edit';

var Blog = React.createClass({
    getInitialState: function(){
        return {
            contents: "Enter daily blog..."
        }
    },

    render: function () {
        return (
          <div>
            <InlineEdit
                style={{width: "100%"}}
                placeholder={this.props.contents || this.state.contents}
                />
          </div>
        )
    }
});

export default Blog;
