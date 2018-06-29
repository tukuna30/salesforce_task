import React from 'react';
import BlogsAPI from '../api/blogsApi'

class DeleteBlog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteBlog = this.deleteBlog.bind(this);
    }

    deleteBlog() {
        BlogsAPI.deleteBlog(this.props.blogId).then(() => {
            this.props.onDeleteCallBack(true);
        }, function () {
            this.props.closeCallBack();
        });
    }

    render() {
        return (
            <div style={{borderRadius: '5px', padding: '20px', border: '2px solid gray' }} >
                <div style={{ backgroundColor: 'rgb(255, 255, 255, 0.4)', padding: '5px', margin: '10px', position: 'relative' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Do you want to delete this blog?</div>
                   
                    <button style={{ fontSize: '16px', marginRight: '10px' }} onClick={this.deleteBlog}>
                        Yes
                    </button>
                    <button onClick={this.props.closeCallBack}>No</button>
                </div>
            </div>
        );
    }
}
export default DeleteBlog;