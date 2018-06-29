import React from 'react';
import BlogsAPI from '../api/blogsApi';
import BlogDetails from '../components/blogDetails';
import CreateBlog from '../components/createBlog';
import EditBlog from '../components/EditBlog';
import DeleteBlog from '../components/deleteBlog';
import Modal from 'react-modal';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { blogs: [], selectedBlogId: '', showBlogCreateDialog: false, showDeleteDialog :false };
        this.selectBlog = this.selectBlog.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showBlogCreateDialog = this.showBlogCreateDialog.bind(this);
        this.showBlogEditDialog = this.showBlogEditDialog.bind(this);
    }

    componentDidMount() {
        let self = this;
        BlogsAPI.getBlogs().then((response) => {
            self.setState({ blogs: response, selectedBlogId: response[0].id });
        });
    }

    selectBlog(event) {
        if (event.target.id) {
            this.setState({ selectedBlogId: event.target.id })
        }
    }
    closeModal(isReload) {
        if (isReload) {
            BlogsAPI.getBlogs().then((response) => {
                this.setState({ blogs: response, selectedBlogId: response[0].id });
            });
        }
        this.setState({ showBlogCreateDialog: false, showBlogEditDialog: false, showDeleteDialog: false });
    }

    showBlogCreateDialog() {
        this.setState({ showBlogCreateDialog: true });
    }

    showBlogEditDialog(blogId) {
        this.setState({ showBlogEditDialog: true, selectedBlogId: blogId });
    }

    showDeleteDialog(blogId) {
        this.setState({ showDeleteDialog: true, selectedBlogId: blogId });
    }
    render() {
        return (
            <div style={{ paddingTop: '20px', marginTop: '20px' }}>
                <button onClick={this.showBlogCreateDialog}>Create a blog</button>
                <h3>Total blogs: {this.state.blogs.length}</h3>
                <div style={{ maxHeight: '600px', overflowY: 'auto', display: 'flex', padding: '10px' }}>
                    <ul style={{ overflowY: 'auto', marginTop: '0px', width: '30%' }} id="list-container">

                        {this.state.blogs.map((blog, index) =>
                            <li id={blog.id} key={blog.id} style={{ borderBottom: '1px dashed lightgray', marginBottom: '20px', cursor: 'pointer', padding: '30px', width: '80%' }} onClick={this.selectBlog}>
                                {blog.title}
                                <div className="button-container" style={{padding: '10px', marign: '5px'}}>
                                    <button style={{marginRight: '5px'}} onClick={() => {
                                        this.showBlogEditDialog(blog.id)
                                    }}>Edit</button>
                                    <button onClick={() => { this.showDeleteDialog(blog.id) }}>Delete</button>
                                </div>
                            </li>
                        )}
                    </ul>
                    {this.state.selectedBlogId && <BlogDetails blogId={this.state.selectedBlogId} style={{ width: '70%' }} />}
                </div>
                <Modal
                    isOpen={this.state.showBlogCreateDialog || this.state.showBlogEditDialog || this.state.showDeleteDialog}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    style={{
                        content: { zIndex: '2' }, overlay: {
                            position: 'absolute'
                        }
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <button onClick={this.closeModal} style={{ fontSize: '16px', marginLeft: '10px' }} className="button">Close</button>
                    </div>
                    {this.state.showBlogCreateDialog && <CreateBlog closeCallBack={this.closeModal} />}
                    {this.state.showBlogEditDialog && <EditBlog blogId={this.state.selectedBlogId} closeCallBack={this.closeModal} />}
                    {this.state.showDeleteDialog && <DeleteBlog blogId={this.state.selectedBlogId} closeCallBack={this.closeModal} onDeleteCallBack={this.closeModal}/>}
                </Modal>
            </div>


        );
    }
}

export default App;