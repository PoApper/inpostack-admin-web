import Layout from '../components/layout';
import BuildOverview from '../components/index/buildOverview';
import BuildRecnt from '../components/index/buildRecent';

export default function Home() {
  return (
    <Layout>
      <h1>개요</h1>
       <BuildOverview/>
       <BuildRecnt/>
    </Layout>
  );
}
