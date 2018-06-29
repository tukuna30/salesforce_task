import React from 'react';
import BlogsAPI from '../api/blogsApi'

class BlogDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { blog: [] };
    }

    componentDidMount() {
        if (this.props.blogId) {
            BlogsAPI.getBlog(this.props.blogId).then((blog) => {
                this.setState({ blog });
            });
        }  
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.blogId !== nextProps.blogId) {
            BlogsAPI.getBlog(nextProps.blogId).then((blog) => {
                this.setState({ blog });
            });
        }
    }

    render() {
        return (
            <div style={{ height: '100px', borderRadius: '5px', padding: '20px', border: '2px solid gray', width: '70%' }} >
                <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.3)', padding: '5px', position: 'relative' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{this.state.blog.title}</span>
                    <span style={{ right: '10px', background: '#FFB733', border: '1px solid lightgray', padding: '2px', position: 'absolute', borderRadius: '5px' }}>{new Date(this.state.blog.timestamp).toDateString()}</span>
                    <div style={{ fontSize: '16px' }}>
                        <span>{this.state.blog.text}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default BlogDetails;
