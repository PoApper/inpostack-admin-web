import Layout from '../components/layout';
import BuildOverview from '../components/index/buildOverview';
import BuildRecnt from '../components/index/buildRecent';
import styled from 'styled-components';

export default function Home() {
  return (
    <Layout>
      <Title>인포스택 관리자 페이지 입니다.</Title>
      <BuildOverview />
      <BuildRecnt />
    </Layout>
  );
}

const Title = styled.h2`
  letter-spacing: -1px;
`;
