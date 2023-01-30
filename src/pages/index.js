import * as React from "react"
import styled, { ThemeProvider } from "styled-components";
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout";
// import "../sass/style.sass"

const theme = {
    black: '#363636',
    white: '#F3F3F3',
    purple: '#CDB4FF',
    green: '#B4FFC9'
}

const IndexPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <main>
                <Layout>
                    <Intro>
                        <IntroTitle># ABOUT ME</IntroTitle>

                        <IntroInner>
                            <IntroInfo>
                                <h2 className="intro__title">
                                    I'm Hubert Hsieh. <br/> A Front-end Developer living in Taichung.
                                </h2>

                                <p className="intro__text">
                                    我是多年平面設計師經驗轉前端工程師，擅長客製化網站與RWD製作，喜歡追求美與有趣的事物，發現新奇的技術會想盡辦法學以實踐， 期許自己能成為美感與技術兼具，最好還能帶點有趣想法的工程師。
                                </p>

                                <div className="social">
                                    <StaticImage src="../images/github.png" alt="Github"/>
                                    <StaticImage src="../images/linkedin.png" alt="LinkedIn"/>
                                    <StaticImage src="../images/codepen.png" alt="Codepen"/>
                                </div>
                            </IntroInfo>

                            <IntroPhoto></IntroPhoto>
                        </IntroInner>
                    </Intro>

                    <Skill>
                        <div className="title"># SKILL</div>

                        <div className="inner flex">
                            <p>React / Next / Gatsby.js</p>
                            <p>Vue2 / Vue3.js</p>
                            <p>SpringBoot</p>
                            <p>Html / Pug / Css / Scss / Sass</p>
                            <p>Javascript / jQuery</p>
                        </div>
                    </Skill>

                    <Experience>
                        <div className="title"># Experience</div>

                        <div className="inner">
                            <p>海鑫科技 2020 年 8 月 ~ 至今</p>
                            <p>麗仁科技 2019 年 6 月 ~ 2020 年 6 月</p>
                            <p>威德數位 2018 年 8 月 ~ 2019 年 5 月</p>
                        </div>
                    </Experience>

                    <Education>
                        <div className="title"># Education</div>

                        <div className="inner">
                            <p>國立臺中科技大學 2007 - 2011</p>
                            <p>臺中市立臺中工業高級中等學校 2004 - 2007</p>
                        </div>
                    </Education>

                    <Project>
                        <div className="title"># Project</div>

                        <div className="inner">
                            <p>Project 01</p>
                            <p>Project 02</p>
                        </div>
                    </Project>
                </Layout>
            </main>
        </ThemeProvider>
    )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

const Intro = styled.section`
    border: solid 2px red;
`;

const IntroTitle = styled.h2`
    border: solid 2px black;
    padding: 20px 35px;
`;

const IntroInner = styled.div`
    border: solid 2px green;
    width: 100%;
    height: 450px;
    display: flex;
`;

const IntroInfo = styled.div`
    border: solid 2px blue;
`;

const IntroPhoto = styled.div`
    border: solid 3px green;
    //background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqRyIiwYCq4s-fZi1zdmyfSuIPUvg9EyZ_Q&usqp=CAU");
    background-image: url("https://i.pinimg.com/originals/f5/2e/8a/f52e8aae045edec105ba3ce139ac8db5.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 50%;
`;

const Skill = styled.section`
    border: solid 2px orange;
`

const Experience = styled.section`
    border: solid 2px cadetblue;
`;

const Education = styled.section`
    border: solid 2px blueviolet;
`;

const Project = styled.section`
    border: solid 2px darkslategrey;
`;