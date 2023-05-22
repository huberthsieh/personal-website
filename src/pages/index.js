import * as React from "react"
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout";
import Portfolio from "./portfolio";

const IndexPage = () => {
    return (
        <main>
            <Portfolio />
        </main>
    )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

