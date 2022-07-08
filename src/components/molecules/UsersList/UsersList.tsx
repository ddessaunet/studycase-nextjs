import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { User } from 'components/atoms/User';
import { getPostsByUserPayload } from 'services/UserService';
import { UsersListProps } from 'components/molecules/UsersList';
import { useRouter } from 'next/router';

export const UsersList = ({ users }: UsersListProps) => {
  const router = useRouter();
  const nav = (path: string) => {
    window.scrollTo(0, 0);
    router.push(path);
  };
  return (
    <Flex flexDirection="column">
      {users.map((user: any) => (
        <Flex key={user.id} m="10px">
          <User {...user} request={() => getPostsByUserPayload(user.id, 1, 0)}>
            <Flex flexDirection="column">
              <Flex flexDirection={['column', 'row']} gap="1">
                <Button onClick={() => nav(`/${user.id}`)}>
                  Show full profile
                </Button>
                <Button onClick={() => nav(`/${user.id}/posts`)}>
                  User posts
                </Button>
              </Flex>
            </Flex>
          </User>
        </Flex>
      ))}
    </Flex>
  );
};
