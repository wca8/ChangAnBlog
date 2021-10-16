import styled from "styled-components";

export const ContactWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;
  h3{
    color: #d9d9d9;
  }
  .main {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      div {
        text-align: center;
        margin-bottom: 10px;
        color: #d9d9d9;    
      }
      img {
        width: 110px;
      }
    }
  }
`;
