let callAPI = (url, method, payload) => {
    let options = {
        cache: 'no-cache',
        referrer: 'no-referrer',
        redirect: 'follow',
        method: method || 'GET'
    };

    if (method === 'POST' && payload) {
        options.body = JSON.stringify(payload);
    }
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => {
            return error;
        });
}
let blogUrl = 'http://restedblog.herokuapp.com/shubham/api/';

class BlogsAPI {
    static getBlogs() {
        return callAPI(blogUrl);
    }

    static getBlog(blogId) {
        return callAPI(blogUrl + blogId);
    }
    static updateBlog(blogId) {
        return callAPI(blogUrl + blogId, 'POST');
    }
    static createBlog(blogData) {
        return callAPI(blogUrl, 'POST', blogData);
    }
    static deleteBlog(blogId) {
        return callAPI(blogUrl + blogId, 'DELETE');
    }
}

export default BlogsAPI;