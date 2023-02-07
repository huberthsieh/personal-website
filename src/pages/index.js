import * as React from "react"
import styled, { ThemeProvider } from "styled-components";
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout";
import "../sass/common/_reset.sass"

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
                                <IntroDescription>
                                    I'm Hubert Hsieh. <br/> A Front-end Developer living in Taichung.
                                </IntroDescription>

                                <Text>
                                    我是多年平面設計師經驗轉前端工程師，擅長客製化網站與RWD製作，喜歡追求美與有趣的事物，發現新奇的技術會想盡辦法學以實踐， 期許自己能成為美感與技術兼具，最好還能帶點有趣想法的工程師。
                                </Text>

                                <IntroLinks>
                                    <LinkItem>
                                        <StaticImage src="../images/github.png" alt="Github"/>
                                    </LinkItem>

                                    <LinkItem>
                                        <StaticImage src="../images/linkedin.png" alt="LinkedIn"/>
                                    </LinkItem>

                                    <LinkItem>
                                        <StaticImage src="../images/codepen.png" alt="Codepen"/>
                                    </LinkItem>
                                </IntroLinks>
                            </IntroInfo>

                            <IntroPhoto></IntroPhoto>
                        </IntroInner>
                    </Intro>

                    <Skill>
                        <SkillTitle># SKILL</SkillTitle>

                        <SkillInner>
                            <SkillItem>React / Next / Gatsby.js</SkillItem>
                            <SkillItem>Vue2 / Vue3.js</SkillItem>
                            <SkillItem>SpringBoot</SkillItem>
                            <SkillItem>Html / Pug</SkillItem>
                            <SkillItem>Css / Scss / Sass</SkillItem>
                            <SkillItem>Javascript / jQuery</SkillItem>
                        </SkillInner>
                    </Skill>

                    <Experience>
                        <ExperienceTitle># Experience</ExperienceTitle>

                        <ExperienceInner>
                            <ExperienceItem>海鑫科技 2020 年 8 月 ~ 至今</ExperienceItem>
                            <ExperienceItem>麗仁科技 2019 年 6 月 ~ 2020 年 6 月</ExperienceItem>
                            <ExperienceItem>威德數位 2018 年 8 月 ~ 2019 年 5 月</ExperienceItem>
                        </ExperienceInner>
                    </Experience>

                    <Education>
                        <EducationTitle># Education</EducationTitle>

                        <EducationInner>
                            <EducationItem>國立臺中科技大學 2007 - 2011</EducationItem>
                            <EducationItem>臺中市立臺中工業高級中等學校 2004 - 2007</EducationItem>
                        </EducationInner>
                    </Education>

                    <Project>
                        <ProjectTitle># Project</ProjectTitle>

                        <ProjectInner>
                            <ProjectItem>形象官網</ProjectItem>
                            <ProjectItem>形象官網</ProjectItem>
                        </ProjectInner>
                    </Project>
                </Layout>
            </main>
        </ThemeProvider>
    )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

const Section = styled.section`
`;

const Title = styled.h2`
    margin: 0;
    padding: 20px 35px;
    width: 100%;
    font-size: 32px;
    border-top: solid 2px ${props => props.theme.black};
    border-bottom: solid 2px ${props => props.theme.black};
    text-transform: uppercase;
`;

const Text = styled.p`
    padding: 20px 35px;
`;

const Intro = styled(Section)`
`;

const IntroInfo = styled.div`
    position: relative;
`;

const IntroTitle = styled(Title)`
`;

const IntroDescription = styled(Title)`
    border: none;
    padding-top: 50px;
`;

const IntroInner = styled.div`
    width: 100%;
    height: 450px;
    display: flex;
`;

const IntroPhoto = styled.div`
    //background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqRyIiwYCq4s-fZi1zdmyfSuIPUvg9EyZ_Q&usqp=CAU");
    background-image: url("https://i.pinimg.com/originals/f5/2e/8a/f52e8aae045edec105ba3ce139ac8db5.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 50%;
    border-left: solid 2px ${props => props.theme.black};
`;

const IntroLinks = styled.div`
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: solid 2px ${props => props.theme.black};
    display: flex;
`;

const LinkItem = styled.div`
    padding: 20px 0;
    border-right: solid 2px ${props => props.theme.black};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
  
    &:last-child {
        border: none
    }
  
    & > div {
        max-width: 50px;
    }
`;

const Skill = styled(Section)`
`;

const SkillTitle = styled(Title)`
`;

const SkillInner = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const SkillItem = styled.div`
    width: calc(100% / 3);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 35px;
    font-weight: 500;
    border-right: solid 2px ${props => props.theme.black};
    border-bottom: solid 2px ${props => props.theme.black};
  
    &:nth-child(3) {
        border-right: none;
    }

    &:nth-child(4) {
        border-bottom: none;
    }

    &:nth-child(5) {
        border-bottom: none;
    }
    
    &:nth-child(6) {
        border-right: none;
        border-bottom: none;
    }
`;

const Experience = styled(Section)`
`;

const ExperienceTitle = styled(Title)`
`;

const ExperienceInner = styled.div`
`;

const ExperienceItem = styled.div`
    padding: 20px 35px;
    border-bottom: solid 2px ${props => props.theme.black};
  
    &:last-child {
        border-bottom: none;
    }
`;

const Education = styled(Section)`
`;

const EducationInner = styled.div`
`;

const EducationItem = styled.div`
    padding: 20px 35px;
    border-bottom: solid 2px ${props => props.theme.black};
    
    &:last-child {
        border-bottom: none;
    }
`;

const EducationTitle = styled(Title)`
`;

const Project = styled(Section)`
`;

const ProjectTitle = styled(Title)`
`;

const ProjectInner = styled.div`
`;

const ProjectItem = styled.div`
    padding: 20px 35px;
    border-bottom: solid 2px ${props => props.theme.black};
    
    &:last-child {
        border-bottom: none;
    }
`;