import styled from "styled-components";


export const TabcontrolWrapper = styled.div`
    height: 40px;
    background-color: white;
    position: fixed;
    top: 45px;
    left: 0;
    width: 100%;
    z-index: 100;
    .active{
        color: red;
    }
   .tab-control{
       margin: 0 auto;
       width: 960px;
       display: flex;
        
       .item{
        padding-right: 30px;
        font-size: 14px;
        line-height: 40px;
        cursor: pointer;
       }
       a{
           color: black;
       }
   }
`