import React from 'react'
import { useLocation } from 'react-router-dom';
import AddBlog from './AddBlog'
function UpdateBlog(){
const location =useLocation();
let blog = location.blog.blog
    return (
      <div>
        <AddBlog update="Update" instance={blog} />
      </div>
    );
}

export default UpdateBlog
