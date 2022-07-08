import type { NextPage } from 'next';
import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { Paginated } from 'components/molecules/Paginated';
import { getUsersPayload } from 'services/UserService';
import { UsersList } from 'components/molecules/UsersList';
import { User as IUser } from 'services/UserService.d';

const UsersView: NextPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  return (
    <Container width="100%">
      <Paginated
        page="Users"
        elements={users}
        setElements={setUsers}
        request={(page: number) => getUsersPayload(5, page)}
      >
        <UsersList users={users} />
      </Paginated>
    </Container>
  );
};

export default UsersView;
