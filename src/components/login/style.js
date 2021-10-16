import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: calc(100vh - 45px);
  background-color: #fff;
  z-index: 110;
  position: relative;
  top: -45px;

  .ant-tabs-nav::before{
     border-bottom: none!important;
  }
  .content {
    width: 400px;
    margin: 0 auto;
    position: relative;
    top: 120px;
   
    .tabs{
         display: flex;
         justify-content: space-between;


         .account{
           margin-bottom: 40px;
         }
         .password{
           margin-bottom: 40px;
         }
         .login-btn{
           width: 100%;
         }
    }
  }
`;
