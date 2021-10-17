import styled from "styled-components";

export const WriteArticleWrapper = styled.div`
  position: relative;
  top: -45px;
  min-height: calc(100vh - 45px);
  background-color: white;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  z-index: 101;
  .top-info {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    .submit-btn {
      justify-content: space-between;
    }
    div {
      flex: 1.2;
      white-space: nowrap;
      display: flex;
      /* justify-content: space-between; */
      align-items: center;
      .publish-article {
        margin-right: 10px;
      }
    }
    .title {
      flex: 9;
      padding-right: 60px;
      color: #8c8c8c;
      font-size: 20px;
      input {
        height: 32px;
      }
      .title-item {
        margin-right: 20px;
      }
    }
  }
  .desc {
    margin: 20px 0;
    display: flex;
    display: flex;
    justify-content: space-between;
    input {
      width: 35%;
      margin-right: 20px;
    }
    /* input:nth-child(1){
      width: ;
    } */
  }
  .UEditor {
    width: 100%;
    #edui1 {
      width: 100% !important;
    }
  }
`;
