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
import {
  IDiscoverMoviesData,
  IMovieGenreListData,
} from "../../utils/api/model/apiModelTypes";
interface IPageProps {
  genreId: string;
  genreTypes: IMovieGenreListData;
  data: IDiscoverMoviesData;
  error: any;
}

async function fetchDiscoverData(url: string) {
  try {
    const resp = await axios.get(url);
    const data: IDiscoverMoviesData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

async function fetchGenresListData(url: string) {
  try {
    const resp = await axios.get(url);
    const data: IMovieGenreListData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

const apiDiscoverRoute = `${process.env.NEXT_PUBLIC_WEBSITE_ROUTE}/api/discover/movies`;
const apiGenresRoute = `${process.env.NEXT_PUBLIC_WEBSITE_ROUTE}/api/genres/movies`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { genreId, page = 1 } = context.query as { [key: string]: string };
  if (!genreId) {
    return {
      props: {
        genreId: null,
        genreTypes: null,
        data: null,
        error: "genreId is missing",
      },
    };
  }

  try {
    const data = await fetchDiscoverData(
      `${apiDiscoverRoute}?genreId=${genreId}&page=${page}`
    );
    const genreList = await fetchGenresListData(apiGenresRoute);

    return {
      props: {
        genreId: genreId,
        genreTypes: genreList,
        data: data,
        error: null,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        genreId: null,
        genreTypes: null,
        data: null,
        error: e.message,
      },
    };
  }
};

const GenrePage = (pageProps: IPageProps) => {
  const { data, error, genreId, genreTypes } = pageProps;
  const router = useRouter();

  if (error) throw error;

  const genre = genreTypes.genres.find((g) => g.id.toString() === genreId);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    router.push(
      getRoute(RouteType.genre, { genreId: genreId, page: page.toString() })
    );
  };

  return (
    <PageLayout navigation={<CommonNavigation />}>
      <SearchLayout>
        <React.Fragment>
          <SearchResults data={data.results} keywords={genre.name} />
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

export default GenrePage;
