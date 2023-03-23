import React from 'react';
import Layout from "../components/Layout";
import styled from "styled-components";

const ContactMe = () => {
    return (
        <div>
            <Layout>
                <ContactContainer>
                    <Title># Contact Me</Title>

                    <IntroPhoto />

                    <FormContainer>
                        <FormText>
                            <FormTitle># 和我聯繫</FormTitle>
                            <Text>
                                工作邀約或是任何問題，歡迎和我聯繫。
                            </Text>
                        </FormText>

                        <form method="post" action="">
                            <label>
                                <h4>姓名</h4>
                                <input type="text" name="name" id="name" placeholder="姓名"/>
                            </label>
                            <label>
                                <h4>信箱</h4>
                                <input type="email" name="email" id="email" placeholder="信箱" />
                            </label>
                            <label>
                                <h4>主旨</h4>
                                <input type="text" name="subject" id="subject" placeholder="主旨"/>
                            </label>
                            <label>
                                <h4>訊息</h4>
                                <textarea name="message" id="message" rows="5" placeholder="訊息"/>
                            </label>
                            <button id="submit" type="submit">送出</button>
                            {/*<input type="reset" value="Clear" />*/}
                        </form>
                    </FormContainer>
                </ContactContainer>
            </Layout>
        </div>
    );
};

export default ContactMe;

const ContactContainer = styled.div`
    height: 100%;
`;

const Title = styled.h2`
    margin: 0;
    padding: 20px 35px;
    width: 100%;
    font-size: 32px;
    border-bottom: solid 2px ${props => props.theme.black};
    text-transform: uppercase;
`;

const IntroPhoto = styled.div`
    background-image: url("https://i.pinimg.com/originals/3d/df/22/3ddf2287a2cc870b29f95120122b5da3.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 0;
    padding-bottom: 41.25%;
`;

const FormContainer = styled.div`
    //background-color: ${props => props.theme.gray};
    display: flex;
    //margin: 50px 0;
    
    & > * {
        width: 50%;
    }

    form {
        padding: 50px;
        border-left: solid 2px ${props => props.theme.gray};
    }

    label {
        color: ${props => props.theme.gray};
        display: block;
        margin-bottom: 20px;
    }
  
    h4 {
        margin-bottom: 8px;
    }

    input {
        border: none;
        outline: solid 2px ${props => props.theme.gray};
        background-color: transparent;
        width: 100%;
        display: block;
        padding: 20px 10px;
        font-size: 16px;
        color: #F3F3F3;
    
        &:focus {
            outline: solid 2px ${props => props.theme.green};
        }
    }
    
    textarea {
        border: none;
        display: block;
        width: 100%;
        font-size: 16px;
        padding: 15px 10px;
        outline: solid 2px ${props => props.theme.gray};
        background-color: transparent;
    }
    
    button {
        width: 100%;
        display: block;
        margin-top: 50px;
        padding: 20px 0;
        font-size: 16px;
        border: none;
        outline: ${props => props.theme.green};
        background-color: ${props => props.theme.green};
    }
`

const FormText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: ${props => props.theme.gray};
`;

const FormTitle = styled.h2`
    font-size: 32px;
    padding: 20px 35px 0;
    max-width: 480px;
    width: 100%;
`;

const Text = styled.p`
    padding: 20px 35px;
    max-width: 480px;
    width: 100%;
`;