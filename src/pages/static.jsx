import { Box } from "@mui/system";
import Head from "next/head";

const Static = ({ date }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Head>
        <title>Static Rendering</title>
      </Head>
      <h1>This Page is static</h1>
      <p>The data for this page was created at: </p>
      <p>{date}</p>
      <p>
        The information for this page was built upon running the build for this
        project. This page will serve raw HTML to the client and will be{" "}
        <i>super</i> fast
      </p>
    </Box>
  );
};

export function getStaticProps() {
  const date = new Date();
  return {
    props: {
      date: date.toUTCString(),
    },
  };
}

export default Static;
