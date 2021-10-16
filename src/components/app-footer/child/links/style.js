import styled from "styled-components";

export const LinksWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;
  h3 {
    color: #d9d9d9;
    text-align: center;
  }
  .official {
    display: flex;
    color: #d9d9d9;
    margin-bottom: 20px;
    justify-content: center;
    div {
        text-align: center;
        margin-right: 40px;
        cursor: pointer;
      img {
        width: 80px;
      }
    }
  }

  .friend_links{
    display: flex;
    justify-content: center;
    div{
      padding-right: 20px;
      font-size: 12px;
      a{
        color: #bfbfbf;
      }
    }
  }
`;
