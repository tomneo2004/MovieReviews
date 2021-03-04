import React from "react";
import { useRouter } from "next/router";
import PageLayout from "../../layouts/pageLayout";
import SearchLayout from "../../layouts/search/searchLayout";
import { getRoute, RouteType } from "../../routes/routesGenerator";
import { GetServerSideProps } from "next/types/index";
import axios from "axios";
import CommonNavigation from "../../components/concrete/CommonNavigation/CommonNavigation";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import SearchResults from "../../components/concrete/SearchResults/SearchResults";

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