import styled from "styled-components";

export const RelevantArticleWrapper = styled.div`
  .item {
    margin-bottom: 15px;
    .like{
      display: flex;
      color: #8c8c8c;
      font-size: 12px;
      div{
        margin-right: 20px;
      }
    }
    a{
      color: #262626;
    }
    .overflow {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .title {
      -webkit-line-clamp: 2;
      font-size: 13px;
    }
  }
`;
