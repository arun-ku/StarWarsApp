import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const planetImages = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
  '/images/9.png',
  '/images/10.png',
  '/images/11.png',
  '/images/12.png',
  '/images/13.png',
  '/images/14.png',
  '/images/15.png',
];

const styles = {
  card: {
    width: '22%',
    marginRight: '1%',
    display: 'inline-block',
    marginLeft: '2%',
    marginBottom: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  planetContainer: {
    height: 180,
    width: 180,
    position: 'relative',
  },
  planetImage: {
    borderRadius: '50%',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  }
};

@withStyles(styles)
class Planet extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.planet.name === nextProps.planet.name) {
      return false;
    }
    return true;
  }

  render() {
    const { planet, bigDogPopulation, classes } = this.props;
    let dim = 90;
    if (planet.population == 'unknown') {
      dim = 70;
    } else {
      dim = dim - (Math.floor((bigDogPopulation / parseInt(planet.population)) * 2))
    }

    if (dim < 40) {
      dim = 40;
    }
    const planetImageStyles = {
      width: `${dim}%`,
      height: `${dim}%`,
    };
    return (
      <Card className={classes.card}>
        <CardContent style={{ textAlign: '-webkit-center' }}>
          <div className={classes.planetContainer}>
            <img className={classes.planetImage} style={planetImageStyles} src={planetImages[Math.floor(Math.random() * 15)]} alt=""/>
          </div>
          <Divider/>
          <div>
            <div>
              <b>Name: </b> {planet.name}
            </div>
            <div>
              <b>Population: </b> {planet.population}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Planet;