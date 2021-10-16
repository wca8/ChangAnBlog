import styled from "styled-components";

export const BackTopWrapper = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  font-size: 30px;
  color: #8c8c8c;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color:rgba(252,85,49,.6);
    color: white;
  }
`;
