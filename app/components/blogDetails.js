import React from 'react';
import BlogsAPI from '../api/blogsApi'

class BlogDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { blog: [] };
    }

    componentDidMount() {
        let self = this;
        BlogsAPI.getBlog(this.props.blogId).then(function (blog) {
            self.setState({ blog });
        });
    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        BlogsAPI.getBlog(nextProps.blogId).then(function (blog) {
            self.setState({ blog });
        });
    }

    render() {
        return (
            <div style={{ height: '100px', borderRadius: '5px', padding: '20px', border: '2px solid gray' }} >
                <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.3)', padding: '5px', position: 'relative' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{this.state.blog.title}</span>
                    <span style={{ right: '10px', background: '#FFB733', border: '1px solid lightgray', padding: '2px', position: 'absolute', borderRadius: '5px' }}>{this.state.blog.timeStamp}</span>
                    <div style={{ fontSize: '16px' }}>
                        <span>{this.state.blog.text}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default BlogDetails;
