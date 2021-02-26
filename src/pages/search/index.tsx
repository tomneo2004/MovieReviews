import React from "react";
import { useRouter } from "next/router";
import PageLayout from "../../layouts/pageLayout";
import SearchLayout from "../../layouts/search/searchLayout";
import { getRoute, RouteType } from "../../routes/routesGenerator";
import { GetServerSideProps } from "next";
import { ISearchMovieData } from "../../utils/api/model/apiModelTypes";
import axios from "axios";
import CommonNavigation from "../../components/concrete/CommonNavigation/CommonNavigation";
import dynamic from "next/dynamic";

const Pagination = dynamic(
  () => import("@material-ui/lab/Pagination/Pagination")
);

const SearchResults = dynamic(
  () => import("../../components/concrete/SearchResults/SearchResults")
);

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
        <React.Fragment>
          <SearchResults data={data.results} keywords={query} />
          <Pagination
            id="paging"
            count={data.total_pages}
            page={data.page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </React.Fragment>
      </SearchLayout>
    </PageLayout>
  );
};

export default SearchPage;
