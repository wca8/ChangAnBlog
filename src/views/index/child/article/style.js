import styled from "styled-components";

export const ArticleWrapper = styled.div`
  .article-content {
    .item {
      color: black;
      display: flex;
      justify-content: space-between;
      background-color: white;
      padding: 25px;
      border-bottom: 1px solid rgb(238, 235, 235);
      /* &:hover .title{
         color : #FC5531;
      } */
      .category{
          display: flex;
          color: #bfbfbf;
          font-size: 12px;
          .time{
            margin-left: 10px;
          }
      }
      .other_info{
          display: flex;
          div{
              margin-right: 20px;
          }
      }
      .overflow{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .title {
        font-size: 16px;
        font-weight: 550;
        -webkit-line-clamp: 2;
      }
      .desc {
        color: #8c8c8c;
        font-size: 14px;
        -webkit-line-clamp: 3;
       
      }
      .pic {
          margin-left: 20px;
        img {
          width: 160px;
        }
      }
    }
  }
`;
