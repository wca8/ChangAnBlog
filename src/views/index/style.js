import styled from "styled-components";

export const IndexWrapper = styled.div`
  min-height: calc(100vh - 45px);
  padding-top: 40px;
  margin-bottom: 100px;
`;

export const IndexMainWrapper = styled.div`
  margin: 10px auto;
  width: 960px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 720px;
    .loadMoreArticle {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
    }
  }
  .right {
    width: 220px;
    min-height: 300px;
    max-height: 600px;
    background-color: white;
  }
`;
