import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

type HomePageProps = {
  routes: Array<{
    title: string;
    startPosition: {
      lat: number;
      lng: number;
    };
    endPosition: {
      lat: number;
      lng: number;
    };
  }>;
};

export default function Home({ routes }: HomePageProps) {
  return (
    <div>
      <Head>
        <title>Routes</title>
      </Head>
      <Typography component="h1" variant="h3" color="primary" gutterBottom>
        Rotas
      </Typography>
      <Grid container spacing={3}>
        {routes?.map((route) => (
          <Grid key={route.title} item xs={12} md={4}>
            <Card>
              <CardHeader
                title={
                  <Typography component="h3" variant="h4">
                    {route.title}
                  </Typography>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      component="span"
                      variant="h5"
                      color="primary"
                      gutterBottom
                    >
                      Início
                    </Typography>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography component="h4" variant="subtitle1">
                          Latitude
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          component="span"
                          color="textSecondary"
                          variant="caption"
                          gutterBottom
                        >
                          -15.93077
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h4" variant="subtitle1">
                          Longitude
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          component="span"
                          color="textSecondary"
                          variant="caption"
                          gutterBottom
                        >
                          53.38543
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      component="span"
                      variant="h5"
                      color="primary"
                      gutterBottom
                    >
                      Destino
                    </Typography>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography component="h4" variant="subtitle1">
                          Latitude
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          component="span"
                          color="textSecondary"
                          variant="caption"
                          gutterBottom
                        >
                          -15.93077
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h4" variant="subtitle1">
                          Longitude
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          component="span"
                          color="textSecondary"
                          variant="caption"
                          gutterBottom
                        >
                          53.38543
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routes`);
    const routes = await res.json();

    return {
      props: {
        routes,
      },
      revalidate: 1 * 60,
    };
  } catch (error) {
    console.log(error);
    return { props: { routes: [] }, revalidate: 1 * 60 };
  }
};
