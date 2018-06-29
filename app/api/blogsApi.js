let callAPI = (url, method, payload) => {
    let options = {
        method: method || 'GET',
    };

    if (method === 'POST' && payload) {
        options.headers = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
        options.body = `title=${payload.title}&text=${payload.text}`;
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
        return callAPI(blogUrl).then((blogs) => {
            return blogs.sort((a, b) => {
                if (a.id > b.id) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        });
    }

    static getBlog(blogId) {
        return callAPI(blogUrl + blogId);
    }
    static updateBlog(blogId, payload) {
        return callAPI(blogUrl + blogId, 'POST', payload);
    }
    static createBlog(blogData) {
        return callAPI(blogUrl, 'POST', blogData);
    }
    static deleteBlog(blogId) {
        return callAPI(blogUrl + blogId, 'DELETE');
    }
}

export default BlogsAPI;