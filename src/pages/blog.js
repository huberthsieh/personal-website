import React from 'react';
import {Link} from "gatsby";
import Layout from "../components/Layout";

const Blog = () => {
    return (
        <div>
            <Layout>
                Blog Page
                <Link to='/'>Go home</Link>
            </Layout>
        </div>
    );
};

export default Blog;