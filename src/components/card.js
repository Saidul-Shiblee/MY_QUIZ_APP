import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ title, noq, id }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      {noq > 0 ? (
        <Link
          to={`quiz/${id}`}
          state={{ title }}
          style={{ textDecoration: "none" }}
        >
          <Card
            sx={{
              padding: "10px",
              maxWidth: "400px",
              minWidth: "280px",
              height: "fit-content",
            }}
            elevation={3}
          >
            <CardMedia
              component="img"
              alt={title}
              sx={{ objectFit: "contain" }}
              image={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            />
            <CardContent>
              <Typography variant="h6" component="p">
                {title}
              </Typography>
            </CardContent>
            <CardActions>
              <Typography variant="Body1" component="p" sx={{ flexGrow: 1 }}>
                {noq} Questions
              </Typography>
              <Typography variant="Body1" component="p">
                Total Points{noq * 5}
              </Typography>
            </CardActions>
          </Card>
        </Link>
      ) : (
        <Card
          sx={{
            padding: "10px",
            maxWidth: "400px",
            minWidth: "280px",
            height: "fit-content",
          }}
          elevation={3}
        >
          <CardMedia
            component="img"
            alt={title}
            sx={{ objectFit: "contain" }}
            image={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          />
          <CardContent>
            <Typography variant="h6" component="p">
              {title}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography variant="Body1" component="p" sx={{ flexGrow: 1 }}>
              {noq} Questions
            </Typography>
            <Typography variant="Body1" component="p">
              Total Points{noq * 5}
            </Typography>
          </CardActions>
        </Card>
      )}
    </Grid>
  );
};

export default VideoCard;
