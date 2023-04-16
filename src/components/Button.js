import styled, {css} from "styled-components";


function Button({primary, width, name, onClick}) {
    return <Container primary={primary} onClick={onClick}
                      width={width}>{name || "Button"}</Container>
}

const Container = styled.button`
  ${
          props => props.primary ? css`
            background: #FE3796;
            color: white;
          ` : css`
            background: transparent;
            color: #FE3796;
          `
  }
  border: 1px solid #FE3796;
  border-radius: 100px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 10px;
  outline: none;
  padding: 10px 40px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: ${props => props.width || "auto"};
`

export default Button