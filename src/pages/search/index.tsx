import React from "react";
import { useRouter } from "next/router";
import PageLayout from "../../layouts/pageLayout";
import SearchLayout from "../../layouts/search/searchLayout";
import { getRoute, RouteType } from "../../routes/routesGenerator";
import { GetServerSideProps } from "next/types/index";
import { ISearchMovieData } from "../../utils/api/model/apiModelTypes";
import axios from "axios";
import CommonNavigation from "../../components/concrete/CommonNavigation/CommonNavigation";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import SearchResults from "../../components/concrete/SearchResults/SearchResults";
import Box from "@material-ui/core/Box/Box";
import Container from "@material-ui/core/Container/Container";

interface IPageProps {
  query: string;
  data: ISearchMovieData;
  error: any;
}

async function fetchData(url: string) {
  try {
    const resp = await axios.get(url);
    const data: ISearchMovieData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

const apiRoute = `${process.env.NEXT_PUBLIC_WEBSITE_ROUTE}/api/search/movies`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, page = 1 } = context.query as { [key: string]: string };
  try {
    const data = await fetchData(`${apiRoute}?query=${query}&page=${page}`);
    return {
      props: {
        query: query,
        data: data,
        error: null,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        query: query,
        data: null,
        error: e.message,
      },
    };
  }
};

const SearchPage = (pageProps: IPageProps) => {
  const { data, error, query } = pageProps;
  const router = useRouter();

  if (error) throw error;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    router.push(
      getRoute(RouteType.search, { query: query, page: page.toString() })
    );
  };

  return (
    <PageLayout navigation={<CommonNavigation />}>
      <SearchLayout>
          <Container maxWidth='xl'>
            <SearchResults data={data.results} keywords={query} width='100%' />
          </Container>
          <Box mt={2}>
            <Pagination
              id="paging"
              count={data.total_pages}
              page={data.page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Box>
      </SearchLayout>
    </PageLayout>
  );
};

export default SearchPage;
