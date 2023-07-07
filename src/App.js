import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Chip,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StarOutlined, AccessTimeOutlined, PersonOutlined, FavoriteOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  card: {
    borderRadius: theme.spacing(2),
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.3)',
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardTitle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  cardBody: {
    color: theme.palette.text.secondary,
    flex: '1',
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  likeButton: {
    marginLeft: 'auto',
    color: theme.palette.secondary.main,
  },
  snackbar: {
    backgroundColor: theme.palette.success.main,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.gyanibooks.com/library/get_dummy_notes');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id) => {
    console.log(`Liked note with id: ${id}`);
    setSnackbarOpen(true);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, liked: true } : item
      )
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Data Display
      </Typography>

      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <Grid container spacing={4} justify="center">
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card elevation={3} className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h5" className={classes.cardTitle}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" className={classes.cardBody}>
                      {item.body}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={2}>
                      <Chip
                        icon={<StarOutlined />}
                        label={item.rating}
                        color="primary"
                        className={classes.chip}
                      />
                      <Chip
                        icon={<AccessTimeOutlined />}
                        label={item.duration}
                        color="secondary"
                        className={classes.chip}
                      />
                      <Chip
                        icon={<PersonOutlined />}
                        label={item.author}
                        className={classes.chip}
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      className={classes.likeButton}
                      onClick={() => handleLike(item.id)}
                    >
                      {item.liked ? (
                        <FavoriteOutlined color="secondary" />
                      ) : (
                        <FavoriteOutlined />
                      )}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DndProvider>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Note Liked!"
        className={classes.snackbar}
      />
    </Container>
  );
}

export default App;
