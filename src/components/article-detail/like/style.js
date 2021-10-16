import styled from "styled-components";

export const LikeArticleWrapper = styled.div`
  position: fixed;
  left: calc(((100% - 960px) / 2) - 90px);
  width: 50px;
  height: 500px;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
  .content {
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px 0;
      background-color: #fafafa;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      &:hover {
        background-color: white;
        animation: rotate1 0.5s linear forwards;
      }

      @keyframes rotate1 {
        from {
          transform: rotate(0deg) scale(1.5);

        }
        to {
          transform: rotate(360deg) scale(1);
        }
      }
      i {
        font-size: 22px;
      }
      div {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
`;
