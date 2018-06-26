import React from 'react';
import BlogsAPI from '../api/blogsApi'

class EditBlog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {blog: {}, blogTitle: '', blogText: ''} ;
        this.updateBlog = this.updateBlog.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        let self = this;
        BlogsAPI.getBlog(this.props.blogId).then(function (blog) {
            self.setState({ blog, blogTitle: blog.title, blogText: blog.blogText});
        });
    }

    updateBlog() {
        let self = this;
        let payload = { title: this.state.blogTitle, text: this.state.blogText };
        BlogsAPI.updateBlog(this.props.blogId, payload).then(function (blog) {
            self.props.closeCallBack();
        }, function () {
            self.props.closeCallBack();
        });
    }

    handleInputChange(event) {
        this.setState({ blogTitle: event.target.value });
    }

    handleTextAreaChange(event) {
        this.setState({ blogText: event.target.value });
    }

    render() {
        return (
            <div style={{borderRadius: '5px', padding: '20px', border: '2px solid gray' }} >
                <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.4)', padding: '5px', margin: '10px', position: 'relative' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Please fill the details</div>
                    <label style={{display: 'block', padding: '10px'}}> Title:
                        <input style={{marginLeft: '5px'}} value={this.state.blogTitle} type='text' onChange={this.handleInputChange} />
                    </label>
                    <label style={{display: 'block', margin: '10px 0 20px 0'}}>
                        Content: 
                        <textarea style={{marginLeft: '5px'}} value={this.state.blogText} onChange={this.handleTextAreaChange} />
                    </label>
                    <button style={{ fontSize: '16px' }} onClick={this.updateBlog}>
                        Save Blog
                    </button>
                </div>
            </div>
        );
    }
}
export default EditBlog;