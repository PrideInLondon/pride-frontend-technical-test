import { useQuery } from '@apollo/client';
import {
  createStyles,
  StyledComponentProps,
  withStyles,
} from '@material-ui/core/styles';
import { GET_USERS } from '../../graphql/queries.js';
import User from './User';

const styles = () => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  userList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: '#F5F5F5',
    overflowY: 'scroll',
    justifyContent: 'center',
  },
  genericText: {
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
});

type Props = StyledComponentProps & {
  userRole: string
  searchName: string
}

const UserGrid = (props: Props) => {
  const { classes, userRole, searchName } = props;
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      role: userRole,
      searchName,
    },
    errorPolicy: 'all',
  });
  const renderLoad = loading && !error ? <p className={classes?.genericText}>Loading...</p> : null;

  const renderError = error && !loading ? (
    <p className={classes?.genericText}>
      Error!
      {error.message}
    </p>
  ) : null;

  const renderUsers = !error && !loading ? (
    <div className={classes?.userList}>
      {data.users.length === 0 ? (
        <p className={classes?.genericText}>No users found</p>
      ) : (
        data.users.map((user: User) => (
          <User
            userName={user.name}
            canCreate={false}
            key={`${user?.id}${user?.name}${user?.createdAt}`}
          />
        ))
      )}
    </div>
  )

    : null;
  return (
    <div className={classes?.root}>
      {renderLoad}
      {renderError}
      {renderUsers}
    </div>
  );
};

export default withStyles(styles)(UserGrid);
