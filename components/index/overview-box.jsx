import Link from "next/link";
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const OverviewBox = ({header, number, link}) => {
  return (
    <MainBox>
      <h3>{header}</h3>
      <p>{number}</p>
      <div
        style={{ gridArea: 'blank', width: '80px', margin: 0, padding: 0 }}/>
      <Link href={link} passHref>
        <div style={{
          gridArea: 'whole',
          margin: '-24px -25px -24px',
          padding: '55px 0 0',
          backgroundColor: '#265c71',
          color: '#fff',
          textAlign: 'center',
          cursor: 'pointer',
        }}>
          <Icon name="arrow right"/>
        </div>
      </Link>
    </MainBox>
  )
}

export default OverviewBox

const MainBox = styled.div`
  display: grid;
  grid-template-areas:
		"header blank whole"
		"number blank whole";
  overflow: hidden;

  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }

  h6 {
    grid-area: header;
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }

  p {
    grid-area: number;
    font-size: 35px;
    margin: auto;
    text-align: center;
  }

  h3 {
    text-align: right;
  }
`