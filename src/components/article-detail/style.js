import styled from "styled-components";

export const ArticleDetailWrapper = styled.div`
  min-height: calc(100vh - 45px);
  width: 960px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 100px;
  
  .left {
    width: 740px;
    background-color: #fff;
    padding: 40px;
    box-sizing: border-box;
    figure{
      img{
        width: 100%;
      }
    }
    .title {
      font-size: 24px;
      font-weight: 550;
      text-align: center;
      padding-bottom: 20px;
    }
    .cover-pic {
      margin: 30px 0;
      display: flex;
      justify-content: center;
      img {
        width: 95%;
      }
    }
    .time {
      display: flex;
      font-size: 13px;
      color: #8c8c8c;
      justify-content: center;
    }
    .content {
      p {
        img {
          width: 100%;
        }
      }
    }
  }

  .current {
    position: fixed !important;
    top: 55px;
  }
  .likeCurrent {
    visibility: hidden;
  }
  .right {
    position: relative;
    width: 210px;
    min-height: 450px;
    max-height: 750px;
    background-color: #fff;
    right: calc((100% - 960px) / 2);
    box-sizing: border-box;
    padding: 20px;
    h4 {
      color: #595959;
      margin-bottom: 10px;
    }
    .author {
      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 550;
          font-size: 20px;
        }
        .sign {
          color: #8c8c8c;
        }
        img {
          width: 45px;
        }
      }
    }

    .article {
      margin-top: 20px;
    }
  }
`;
