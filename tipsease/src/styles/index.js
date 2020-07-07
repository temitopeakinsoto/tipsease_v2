import styled from "styled-components"

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .header-worker-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
    border-bottom: 0.5px solid gray;
    padding: 2rem;
    form {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.5rem;
      input {
        font-size: 1.5 rem;
      }
    }
  }
  .body-worker-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    div {
      width: 50%;
    }

    .img-container {
      width: 20%;
    }
    img {
      width: 100%;
      border-radius: 100%;
    }
    .worker-details {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      h3 {
        margin: 1rem;
      }
    }
  }
  .tip-message {
    color: red;
    margin: 2rem;
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;