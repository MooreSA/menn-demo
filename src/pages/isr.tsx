import { Box } from "@mui/system";
import Head from "next/head";

const StaticProps = ({ data }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Head>
        <title>Incremental Static Rendering</title>
      </Head>
      <h1>
        This Page is <i>Almost</i> static
      </h1>
      <p>The data for this page was created at: </p>
      <p>{data}</p>
      <p>
        Incremental Static Rendering allows a page to be rendered after a set
        period of time - in this case, after the page has been requested. Once
        built the server will cache the page and serve it to the client.
      </p>
      <p>
        This allows a page that is dependant on external information which
        doesn't change very often (Think E-commerce/Blogs) to not be rebuilt and
        rebuilt for every single request. This is a great way to save on server
        resources. It also will not require the client to perform any API calls
        to get the data as that is done at build time.
      </p>
      <p>
        NextJS also supports on-demand ISR. We can set the page to be served
        static until we make an api call to a secret route. Again for an
        e-commerce or a blog we could set this page to never invalidate the
        cache until the data changes.
      </p>
    </Box>
  );
};

export async function getStaticProps() {
  const data = new Date().toUTCString();

  return {
    props: {
      data,
    },
    revalidate: 30,
  };
}

export default StaticProps;
