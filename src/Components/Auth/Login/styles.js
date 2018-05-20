const styles = theme => ({
  headerText: {
    letterSpacing: 3,
    fontSize: '1.3rem',
    color: 'rgba(0,0,0,.6)',
    fontWeight: 500,
  },
  container: {
    height: 500,
    justifyContent: 'center',
  },
  mxAuto: {
    margin: '0 auto',
  },
  cardHeader: {
    padding: 10,
    backgroundColor: theme.palette.background.default,
  },
  submitBtn: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  linkText: {
    color: theme.palette.primary.main,
  },
  error: {
    color: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: '16px',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
  },
  inputErrors: {
    color: theme.palette.error['900'],
    fontSize: 12,
    position: 'relative',
    top: -8,
  }
});

export default styles;