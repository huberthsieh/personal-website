import React from 'react';
import {Link} from "gatsby";
import Layout from "../components/Layout";

const Portfolio = () => {
    return (
        <div>
            <Layout>
                Portfolio Page
                <Link to='/'>Go home</Link>
            </Layout>
        </div>
    );
};

export default Portfolio;