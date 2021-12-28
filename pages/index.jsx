import Layout from '../components/layout';
import OverviewBlock from '../components/index/overview-block';
import RecentBlock from '../components/index/recent-block';
import styled from 'styled-components';

export default function Home() {
  return (
    <Layout>
      <Title>인포스택 관리자 페이지 입니다.</Title>
      <OverviewBlock/>
      <RecentBlock/>
    </Layout>
  );
}

const Title = styled.h2`
  letter-spacing: -1px;
`;